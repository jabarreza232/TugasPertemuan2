import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

export default function FavoritesScreen() {
    const router = useRouter();
    
    // Data dummy untuk favorit
    const [favorites, setFavorites] = useState([
        {
            id: '1',
            title: 'Raja Ampat',
            location: 'Papua Barat',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
            rating: 4.9,
        },
        {
            id: '2',
            title: 'Danau Toba',
            location: 'Sumatera Utara',
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
            rating: 4.7,
        }
    ]);

    const removeFavorite = (id: string) => {
        setFavorites(favorites.filter(item => item.id !== id));
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Favorit Saya</ThemedText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {favorites.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="heart-dislike-outline" size={64} color="#D1D5DB" />
                        <ThemedText style={styles.emptyTitle}>Belum ada favorit</ThemedText>
                        <ThemedText style={styles.emptyDesc}>Temukan destinasi impian Anda dan simpan di sini.</ThemedText>
                        <TouchableOpacity style={styles.exploreBtn} onPress={() => router.back()}>
                            <ThemedText style={styles.exploreBtnText}>Eksplor Sekarang</ThemedText>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.listContainer}>
                        {favorites.map((item) => (
                            <View key={item.id} style={styles.favoriteCard}>
                                <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                                <View style={styles.favoriteInfo}>
                                    <ThemedText style={styles.favoriteTitle} numberOfLines={1}>{item.title}</ThemedText>
                                    <View style={styles.locationRow}>
                                        <Ionicons name="location-outline" size={14} color="#6B7280" />
                                        <ThemedText style={styles.favoriteLocation} numberOfLines={1}>{item.location}</ThemedText>
                                    </View>
                                    <View style={styles.ratingRow}>
                                        <Ionicons name="star" size={14} color="#D97706" />
                                        <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    style={styles.removeBtn} 
                                    onPress={() => removeFavorite(item.id)}
                                >
                                    <Ionicons name="heart" size={24} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
    },
    backBtn: {
        width: 40, height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
    content: { padding: 20, flexGrow: 1 },
    
    listContainer: { gap: 16 },
    favoriteCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
    },
    favoriteImage: { width: 80, height: 80, borderRadius: 12 },
    favoriteInfo: { flex: 1, marginLeft: 16, justifyContent: 'center' },
    favoriteTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4 },
    locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
    favoriteLocation: { fontSize: 13, color: '#6B7280' },
    ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    ratingText: { fontSize: 13, fontWeight: '700', color: '#B45309' },
    removeBtn: { padding: 8 },

    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80 },
    emptyTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 16, marginBottom: 8 },
    emptyDesc: { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingHorizontal: 40, marginBottom: 24, lineHeight: 22 },
    exploreBtn: { backgroundColor: '#111827', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 100 },
    exploreBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
});