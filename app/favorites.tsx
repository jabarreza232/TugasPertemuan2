import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
// IMPORT ASYNC STORAGE & REFRESH CONTROL 🔥
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefreshControl } from 'react-native';

// Samakan interface agar sesuai dengan struktur data HomeScreen
interface ListItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    category: string;
    location: string;
    image: string;
    price: string;
    rating: number;
    hours: string;
}

export default function FavoritesScreen() {
    const router = useRouter();
    
    const [favorites, setFavorites] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // FUNGSI UTAMA UNTUK AMBIL DATA DARI ASYNC STORAGE & API 🔥
    const loadFavoritesData = async () => {
        try {
            // 1. Ambil daftar ID yang difavoritkan dari AsyncStorage
            const storedFavorites = await AsyncStorage.getItem('@favoriteIds');
            const favoriteIds: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (favoriteIds.length === 0) {
                setFavorites([]);
                return;
            }

            // 2. Ambil data destinasi lengkap dari API Mock
            const MOCK_API_URL = 'https://6a1439936c7db8aac0541617.mockapi.io/api/wisata';
            const res = await fetch(MOCK_API_URL);
            const allItems: ListItem[] = await res.json();

            // 3. Filter data dari API: Hanya ambil yang ID-nya ada di list favorit
            const filteredFavorites = allItems.filter(item => favoriteIds.includes(item.id));
            setFavorites(filteredFavorites);

        } catch (error) {
            console.error("Gagal memuat data favorit:", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Load data setiap kali halaman dibuka
    useEffect(() => {
        loadFavoritesData();
    }, []);

    // Fungsi Pull-to-Refresh
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadFavoritesData();
    }, []);

    // FUNGSI HAPUS FAVORIT & UPDATE DI ASYNC STORAGE 🔥
    const removeFavorite = async (id: string) => {
        try {
            // 1. Ambil data ID dari storage saat ini
            const storedFavorites = await AsyncStorage.getItem('@favoriteIds');
            let favoriteIds: string[] = storedFavorites ? JSON.parse(storedFavorites) : [];
            
            // 2. Saring/hapus ID yang dipilih
            favoriteIds = favoriteIds.filter(favId => favId !== id);
            
            // 3. Simpan kembali daftar ID yang baru ke AsyncStorage
            await AsyncStorage.setItem('@favoriteIds', JSON.stringify(favoriteIds));
            
            // 4. Update UI State lokal agar item langsung hilang dari layar
            setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== id));
        } catch (error) {
            console.error("Gagal menghapus favorit dari storage:", error);
        }
    };

    const handleItemPress = (item: ListItem) => {
        router.push({
            pathname: '/detail',
            params: { ...item, rating: item.rating?.toString() || '' },
        });
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0a7ea4" />
            </View>
        );
    }

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

            <ScrollView 
                contentContainerStyle={styles.content} 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0a7ea4"]} />
                }
            >
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
                            <TouchableOpacity 
                                key={item.id} 
                                activeOpacity={0.8} 
                                onPress={() => handleItemPress(item)}
                            >
                                <View style={styles.favoriteCard}>
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
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
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