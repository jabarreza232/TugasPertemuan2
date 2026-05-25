import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PaymentScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const tintColor = Colors[colorScheme].tint;
    
    // Tangkap data dari halaman booking
    const { title, visitorName, ticketCount, totalPrice } = useLocalSearchParams();

    // Simulasi Countdown Timer (15 Menit)
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const formatRupiah = (numberStr: any) => {
        const num = parseInt(numberStr, 10) || 0;
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(num);
    };

    const handlePaymentComplete = () => {
        Alert.alert(
            "Pembayaran Berhasil 🎉",
            "Terima kasih, e-tiket Anda telah diterbitkan.",
            [{ text: "Tutup", onPress: () => router.dismissAll() }]
        );
    };

    // ID Transaksi Acak
    const orderId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <IconSymbol name="chevron.left" size={24} color="#111827" />
                </TouchableOpacity>
                <ThemedText style={styles.headerTitle}>Pembayaran</ThemedText>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Timer Alert */}
                <View style={styles.timerCard}>
                    <ThemedText style={styles.timerText}>Selesaikan pembayaran dalam</ThemedText>
                    <ThemedText style={styles.timerValue}>{formatTime(timeLeft)}</ThemedText>
                </View>

                {/* QRIS Card */}
                <View style={styles.qrisCard}>
                    <View style={styles.qrisHeader}>
                        <ThemedText style={styles.qrisLogoText}>QRIS</ThemedText>
                        <Image 
                            source={{ uri: 'https://seeklogo.com/images/Q/qris-logo-60AFB58757-seeklogo.com.png' }} 
                            style={styles.qrisLogoImage} 
                            resizeMode="contain"
                        />
                    </View>
                    
                    <View style={styles.qrContainer}>
                        {/* API Publik untuk generate QR dummy */}
                        <Image 
                            source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=PAYMENT_${orderId}` }} 
                            style={styles.qrImage}
                        />
                    </View>
                    
                    <ThemedText style={styles.scanInstruction}>
                        Scan QR Code ini menggunakan aplikasi M-Banking atau e-Wallet pilihan Anda.
                    </ThemedText>
                </View>

                {/* Order Details Card */}
                <View style={styles.detailsCard}>
                    <ThemedText style={styles.detailsSectionTitle}>Rincian Pemesanan</ThemedText>
                    <View style={styles.divider} />
                    
                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>ID Transaksi</ThemedText>
                        <ThemedText style={styles.detailValue}>{orderId}</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Destinasi</ThemedText>
                        <ThemedText style={styles.detailValue} numberOfLines={1}>{title}</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Nama Pengunjung</ThemedText>
                        <ThemedText style={styles.detailValue}>{visitorName}</ThemedText>
                    </View>
                    <View style={styles.detailRow}>
                        <ThemedText style={styles.detailLabel}>Jumlah</ThemedText>
                        <ThemedText style={styles.detailValue}>{ticketCount} Tiket</ThemedText>
                    </View>
                    
                    <View style={[styles.divider, { borderStyle: 'dashed' }]} />
                    
                    <View style={styles.detailRow}>
                        <ThemedText style={styles.totalLabel}>Total Tagihan</ThemedText>
                        <ThemedText style={[styles.totalValue, { color: tintColor }]}>{formatRupiah(totalPrice)}</ThemedText>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Confirmation Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.confirmBtn, { backgroundColor: tintColor }]}
                    onPress={handlePaymentComplete}
                >
                    <ThemedText style={styles.confirmBtnText}>Saya Sudah Bayar</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
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
    scrollContent: {
        padding: 20,
    },

    timerCard: {
        backgroundColor: '#FEF2F2',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    timerText: { fontSize: 13, color: '#EF4444', marginBottom: 4, fontWeight: '500' },
    timerValue: { fontSize: 24, fontWeight: '800', color: '#B91C1C' },

    qrisCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    qrisHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    qrisLogoText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#111827',
        marginRight: 8,
    },
    qrisLogoImage: {
        width: 60,
        height: 24,
    },
    qrContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: 20,
    },
    qrImage: {
        width: 200,
        height: 200,
    },
    scanInstruction: {
        textAlign: 'center',
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 20,
        paddingHorizontal: 16,
    },

    detailsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    detailsSectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 16 },
    divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 16 },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
    detailValue: { fontSize: 14, color: '#111827', fontWeight: '700', flex: 1, textAlign: 'right' },
    
    totalLabel: { fontSize: 15, color: '#111827', fontWeight: '700' },
    totalValue: { fontSize: 18, fontWeight: '800' },

    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 24,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    confirmBtn: {
        paddingVertical: 16,
        borderRadius: 100,
        alignItems: 'center',
    },
    confirmBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});