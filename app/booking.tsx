import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function BookingScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const tintColor = Colors[colorScheme].tint;
    const { title, price, image, location } = useLocalSearchParams();

    const [ticketCount, setTicketCount] = useState(1);
    const [visitorName, setVisitorName] = useState(''); // State baru untuk nama

    const parsePrice = (priceString: any) => {
        if (!priceString) return 0;
        const numericString = priceString.replace(/[^0-9]/g, '');
        return parseInt(numericString, 10) || 0;
    };

    const basePrice = parsePrice(price);
    const totalPrice = basePrice * ticketCount;

    const formatRupiah = (number: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const handleConfirm = () => {
        if (!visitorName.trim()) {
            Alert.alert('Perhatian', 'Mohon masukkan nama pengunjung terlebih dahulu.');
            return;
        }

        // Arahkan ke halaman payment dan bawa datanya
        router.push({
            pathname: '/payment',
            params: {
                title,
                visitorName,
                ticketCount: ticketCount.toString(),
                totalPrice: totalPrice.toString(),
            }
        });
    };

    return (
        <ThemedView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <IconSymbol name="chevron.left" size={24} color="#111827" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Pesan Tiket</ThemedText>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                {/* Destination Summary Card */}
                <View style={styles.summaryCard}>
                    <Image source={{ uri: image as string }} style={styles.summaryImage} />
                    <View style={styles.summaryInfo}>
                        <ThemedText style={styles.summaryTitle} numberOfLines={1}>{title}</ThemedText>
                        <ThemedText style={styles.summaryLocation} numberOfLines={1}>{location}</ThemedText>
                        <ThemedText style={[styles.summaryPrice, { color: tintColor }]}>{price} / tiket</ThemedText>
                    </View>
                </View>

                {/* Form Control */}
                <View style={styles.formSection}>
                    <ThemedText style={styles.sectionTitle}>Detail Pesanan</ThemedText>

                    {/* NAMA PENGUNJUNG (BARU 🔥) */}
                    <View style={styles.formRowVertical}>
                        <View style={styles.formLabelRow}>
                            <IconSymbol name="person.fill" size={20} color="#6B7280" />
                            <ThemedText style={styles.formLabel}>Nama Pengunjung</ThemedText>
                        </View>
                        <TextInput 
                            style={styles.inputField}
                            placeholder="Masukkan nama lengkap..."
                            placeholderTextColor="#9CA3AF"
                            value={visitorName}
                            onChangeText={setVisitorName}
                        />
                    </View>

                    {/* Date Simulation */}
                    <View style={styles.formRow}>
                        <View style={styles.formLabelRow}>
                            <IconSymbol name="calendar" size={20} color="#6B7280" />
                            <ThemedText style={styles.formLabel}>Tanggal Kunjungan</ThemedText>
                        </View>
                        <ThemedText style={styles.formValue}>Besok</ThemedText>
                    </View>

                    {/* Ticket Counter */}
                    <View style={styles.formRow}>
                        <View style={styles.formLabelRow}>
                            <IconSymbol name="person.2.fill" size={20} color="#6B7280" />
                            <ThemedText style={styles.formLabel}>Jumlah Tiket</ThemedText>
                        </View>

                        <View style={styles.counterContainer}>
                            <TouchableOpacity
                                style={[styles.counterBtn, ticketCount <= 1 && styles.counterBtnDisabled]}
                                onPress={() => setTicketCount(Math.max(1, ticketCount - 1))}
                                disabled={ticketCount <= 1}
                            >
                                <IconSymbol name="minus" size={16} color={ticketCount <= 1 ? '#9CA3AF' : '#111827'} />
                            </TouchableOpacity>
                            <ThemedText style={styles.counterValue}>{ticketCount}</ThemedText>
                            <TouchableOpacity
                                style={styles.counterBtn}
                                onPress={() => setTicketCount(ticketCount + 1)}
                            >
                                <IconSymbol name="plus" size={16} color="#111827" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Payment Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.totalContainer}>
                    <ThemedText style={styles.totalLabel}>Total Pembayaran</ThemedText>
                    <ThemedText style={styles.totalPrice}>{formatRupiah(totalPrice)}</ThemedText>
                </View>
                <TouchableOpacity
                    style={[styles.confirmBtn, { backgroundColor: tintColor }]}
                    onPress={handleConfirm}
                >
                    <ThemedText style={styles.confirmBtnText}>Lanjut Bayar</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
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
    content: { flex: 1, padding: 20 },

    summaryCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    summaryImage: { width: 80, height: 80, borderRadius: 12 },
    summaryInfo: { flex: 1, marginLeft: 16, justifyContent: 'center' },
    summaryTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 4 },
    summaryLocation: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
    summaryPrice: { fontSize: 14, fontWeight: '700' },

    formSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 20 },
    
    // Gaya Baru untuk Input
    formRowVertical: {
        marginBottom: 24,
    },
    inputField: {
        marginTop: 12,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },

    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    formLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    formLabel: { fontSize: 15, color: '#4B5563', fontWeight: '500' },
    formValue: { fontSize: 15, fontWeight: '600', color: '#111827' },

    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    counterBtn: {
        width: 32, height: 32,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterBtnDisabled: { opacity: 0.5 },
    counterValue: { fontSize: 16, fontWeight: '700', width: 20, textAlign: 'center' },

    bottomBar: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 24,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'flex-end' },
    totalLabel: { fontSize: 14, color: '#6B7280' },
    totalPrice: { fontSize: 24, fontWeight: '800', color: '#111827' },
    confirmBtn: {
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
    },
    confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});