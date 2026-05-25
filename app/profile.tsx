import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

export default function ProfileScreen() {
    const router = useRouter();

    const menuItems = [
        { icon: 'person-outline', label: 'Edit Profil', color: '#111827' },
        { icon: 'notifications-outline', label: 'Notifikasi', color: '#111827' },
        { icon: 'lock-closed-outline', label: 'Keamanan & Privasi', color: '#111827' },
        { icon: 'globe-outline', label: 'Bahasa', color: '#111827' },
        { icon: 'help-circle-outline', label: 'Pusat Bantuan', color: '#111827' },
        { icon: 'log-out-outline', label: 'Keluar', color: '#EF4444' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Profil Saya</ThemedText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <Image 
                        source={{ uri: 'https://avatar.iran.liara.run/public/boy' }} 
                        style={styles.avatarBig} 
                    />
                    <ThemedText style={styles.profileName}>Ahmad Fathan</ThemedText>
                    <ThemedText style={styles.profileEmail}>ahmad.fathan@example.com</ThemedText>
                    <TouchableOpacity style={styles.editBadge}>
                        <ThemedText style={styles.editBadgeText}>Member Premium</ThemedText>
                    </TouchableOpacity>
                </View>

                {/* Settings Menu */}
                <View style={styles.menuSection}>
                    <ThemedText style={styles.sectionTitle}>Pengaturan Akun</ThemedText>
                    
                    <View style={styles.menuCard}>
                        {menuItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <TouchableOpacity style={styles.menuRow}>
                                    <View style={styles.menuLeft}>
                                        <View style={[styles.iconBox, item.color === '#EF4444' && { backgroundColor: '#FEE2E2' }]}>
                                            <Ionicons name={item.icon as any} size={20} color={item.color} />
                                        </View>
                                        <ThemedText style={[styles.menuLabel, { color: item.color }]}>
                                            {item.label}
                                        </ThemedText>
                                    </View>
                                    {item.color !== '#EF4444' && (
                                        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                                    )}
                                </TouchableOpacity>
                                {index < menuItems.length - 1 && <View style={styles.divider} />}
                            </React.Fragment>
                        ))}
                    </View>
                </View>
                
                <ThemedText style={styles.appVersion}>Versi Aplikasi 1.0.0</ThemedText>
                <View style={{ height: 40 }} />
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
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
    content: { padding: 20 },

    profileSection: { alignItems: 'center', marginBottom: 32 },
    avatarBig: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E5E7EB', marginBottom: 16 },
    profileName: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 4 },
    profileEmail: { fontSize: 14, color: '#6B7280', marginBottom: 12 },
    editBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
    editBadgeText: { color: '#B45309', fontSize: 12, fontWeight: '700' },

    menuSection: { marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12, marginLeft: 8 },
    menuCard: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
    menuRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16 },
    menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    iconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center' },
    menuLabel: { fontSize: 15, fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginLeft: 48 },

    appVersion: { textAlign: 'center', color: '#9CA3AF', fontSize: 12, marginTop: 10 },
});