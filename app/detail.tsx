import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, Platform } from 'react-native';

export default function DetailScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const tintColor = Colors[colorScheme].tint;
    const { id, image, title, subtitle, description, category, location, price, rating, hours } = useLocalSearchParams();
    
    const imageUrl = typeof image === 'string' ? image : image?.[0];

    const handlePesanTiket = () => {
        router.push({
            pathname: '/booking',
            params: { id, title, price, image: imageUrl, location }
        });
    };

    return (
        <ThemedView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.heroImage} />
                    <View style={styles.heroGradient} />
                    
                    {/* Back Button */}
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <IconSymbol name="chevron.left" size={24} color="#111827" />
                    </TouchableOpacity>
                </View>

                {/* Main Content Sheet */}
                <View style={styles.contentSheet}>
                    
                    {/* Title & Category Header */}
                    <View style={styles.headerRow}>
                        <View style={styles.titleWrapper}>
                            <ThemedText style={styles.mainTitle}>{title}</ThemedText>
                            <ThemedText style={styles.subtitle}>{location}</ThemedText>
                        </View>
                        <View style={styles.ratingBadge}>
                            <IconSymbol name="star.fill" size={16} color="#D97706" />
                            <ThemedText style={styles.ratingText}>{rating}</ThemedText>
                        </View>
                    </View>

                    {/* Quick Info Grid (Horizontal) */}
                    <View style={styles.quickInfoGrid}>
                        <View style={styles.quickInfoItem}>
                            <View style={[styles.iconBox, { backgroundColor: tintColor + '15' }]}>
                                <IconSymbol name="clock.fill" size={20} color={tintColor} />
                            </View>
                            <ThemedText style={styles.quickInfoLabel}>Buka</ThemedText>
                            <ThemedText style={styles.quickInfoValue} numberOfLines={1}>{hours}</ThemedText>
                        </View>
                        <View style={styles.quickInfoItem}>
                            <View style={[styles.iconBox, { backgroundColor: tintColor + '15' }]}>
                                <IconSymbol name="tag.fill" size={20} color={tintColor} />
                            </View>
                            <ThemedText style={styles.quickInfoLabel}>Kategori</ThemedText>
                            <ThemedText style={styles.quickInfoValue} numberOfLines={1}>{category}</ThemedText>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Description */}
                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Tentang Destinasi</ThemedText>
                        <ThemedText style={styles.descriptionText}>{description}</ThemedText>
                    </View>

                    {/* Tips */}
                    <View style={styles.section}>
                        <ThemedText style={styles.sectionTitle}>Tips Berkunjung</ThemedText>
                        {['Datang pagi hari untuk udara lebih segar', 'Gunakan pakaian dan alas kaki yang nyaman', 'Bawa kamera untuk mengabadikan momen'].map((tip, index) => (
                            <View key={index} style={styles.tipRow}>
                                <IconSymbol name="checkmark.circle.fill" size={20} color={tintColor} />
                                <ThemedText style={styles.tipText}>{tip}</ThemedText>
                            </View>
                        ))}
                    </View>

                    {/* Ruang kosong agar tidak tertutup bottom bar */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* FIXED BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <View style={styles.priceContainer}>
                    <ThemedText style={styles.priceLabel}>Mulai dari</ThemedText>
                    <ThemedText style={[styles.priceValue, { color: tintColor }]}>{price}</ThemedText>
                </View>
                <TouchableOpacity 
                    style={[styles.bookButton, { backgroundColor: tintColor }]}
                    activeOpacity={0.8}
                    onPress={handlePesanTiket}
                >
                    <ThemedText style={styles.bookButtonText}>Pesan Tiket</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollView: { flex: 1 },
    heroContainer: { height: 320, position: 'relative' },
    heroImage: { width: '100%', height: '100%' },
    heroGradient: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    backButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    contentSheet: {
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingTop: 30,
        minHeight: 500,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    titleWrapper: { flex: 1, paddingRight: 16 },
    mainTitle: { fontSize: 26, fontWeight: '800', color: '#111827', marginBottom: 6 },
    subtitle: { fontSize: 15, color: '#6B7280', fontWeight: '500' },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        gap: 6,
    },
    ratingText: { fontSize: 14, fontWeight: '700', color: '#B45309' },
    quickInfoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 24,
    },
    quickInfoItem: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 20,
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    quickInfoLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
    quickInfoValue: { fontSize: 14, fontWeight: '700', color: '#111827' },
    divider: { height: 1, backgroundColor: '#E5E7EB', marginBottom: 24 },
    section: { marginBottom: 28 },
    sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 16 },
    descriptionText: { fontSize: 15, lineHeight: 26, color: '#4B5563', letterSpacing: 0.2 },
    tipRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
    tipText: { flex: 1, fontSize: 15, color: '#4B5563', lineHeight: 22 },
    
    // Bottom Bar Styles
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    priceContainer: { flex: 1 },
    priceLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
    priceValue: { fontSize: 20, fontWeight: '800' },
    bookButton: {
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});