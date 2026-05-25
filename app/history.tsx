import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';

export default function HistoryScreen() {
    const router = useRouter();

    const historyData = [
        {
            id: 'INV-109283',
            title: 'Borobudur',
            date: '20 Mei 2026',
            tickets: 2,
            total: 'Rp 60.000',
            status: 'success' // success, pending, failed
        },
        {
            id: 'INV-556123',
            title: 'Pantai Kuta',
            date: '15 April 2026',
            tickets: 1,
            total: 'Rp 20.000',
            status: 'success'
        },
        {
            id: 'INV-998271',
            title: 'Gunung Bromo',
            date: '10 Feb 2026',
            tickets: 4,
            total: 'Rp 120.000',
            status: 'failed'
        }
    ];

    const getStatusUI = (status: string) => {
        switch(status) {
            case 'success': return { label: 'Selesai', color: '#10B981', bg: '#D1FAE5' };
            case 'pending': return { label: 'Menunggu', color: '#F59E0B', bg: '#FEF3C7' };
            default: return { label: 'Dibatalkan', color: '#EF4444', bg: '#FEE2E2' };
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#111827" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Riwayat Transaksi</ThemedText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.listContainer}>
                    {historyData.map((item) => {
                        const statusUI = getStatusUI(item.status);
                        return (
                            <View key={item.id} style={styles.historyCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.titleRow}>
                                        <Ionicons name="ticket" size={20} color="#0a7ea4" />
                                        <ThemedText style={styles.historyTitle}>{item.title}</ThemedText>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: statusUI.bg }]}>
                                        <ThemedText style={[styles.statusText, { color: statusUI.color }]}>
                                            {statusUI.label}
                                        </ThemedText>
                                    </View>
                                </View>
                                
                                <View style={styles.divider} />
                                
                                <View style={styles.cardBody}>
                                    <View>
                                        <ThemedText style={styles.infoLabel}>Tanggal Pemesanan</ThemedText>
                                        <ThemedText style={styles.infoValue}>{item.date}</ThemedText>
                                    </View>
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <ThemedText style={styles.infoLabel}>Jumlah Tiket</ThemedText>
                                        <ThemedText style={styles.infoValue}>{item.tickets} Tiket</ThemedText>
                                    </View>
                                </View>
                                
                                <View style={styles.cardFooter}>
                                    <ThemedText style={styles.totalLabel}>Total Bayar</ThemedText>
                                    <ThemedText style={styles.totalValue}>{item.total}</ThemedText>
                                </View>
                            </View>
                        );
                    })}
                </View>
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

    listContainer: { gap: 16 },
    historyCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    historyTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    statusText: { fontSize: 12, fontWeight: '700' },
    
    divider: { height: 1, backgroundColor: '#F3F4F6', marginBottom: 12 },
    
    cardBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    infoLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
    infoValue: { fontSize: 14, fontWeight: '600', color: '#111827' },
    
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 10 },
    totalLabel: { fontSize: 13, color: '#4B5563', fontWeight: '500' },
    totalValue: { fontSize: 16, fontWeight: '800', color: '#111827' },
});