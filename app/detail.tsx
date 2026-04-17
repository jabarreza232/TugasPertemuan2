import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';

export default function DetailScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const tintColor = Colors[colorScheme].tint;
    const { id, image, title, subtitle, description, category, location, price, rating, hours } = useLocalSearchParams();
    const ratingStars = (rate: string) => {
        const numRate = parseFloat(rate);
        return '★'.repeat(Math.floor(numRate)) + (numRate % 1 >= 0.5 ? '☆' : '');
    };
    const imageUrl = typeof image === 'string' ? image : image?.[0];

    return (
        <ThemedView style={styles.container}>
            {/* Header */}
            <View style={styles.heroContainer}>
                <Image
                    source={{
                        uri: imageUrl,
                    }}
                    style={styles.heroImage}
                />

                {/* Overlay */}
                <View style={styles.overlay} />

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backButtonFloating}
                >
                    <IconSymbol name="chevron.left" size={24} color="#fff" />
                </TouchableOpacity>

                {/* Title di atas gambar */}
                <View style={styles.heroContent}>
                    <ThemedText style={styles.heroTitle}>
                        {title}
                    </ThemedText>
                    <ThemedText style={styles.heroSubtitle}>
                        {location}
                    </ThemedText>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.sheet}>

                    {/* Category Badge */}
                    {category && (
                        <View style={[styles.categoryBadge, { backgroundColor: tintColor }]}>
                            <ThemedText style={styles.categoryText}>
                                {category}
                            </ThemedText>
                        </View>
                    )}

                    {/* Title Section */}
                    <ThemedView style={styles.titleSection}>
                        <ThemedText type="title" style={styles.mainTitle}>
                            {title}
                        </ThemedText>
                        <ThemedText style={[styles.subtitle, { color: tintColor }]}>
                            {subtitle}
                        </ThemedText>

                        {/* Rating */}
                        <View style={styles.ratingBadge}>
                            <ThemedText style={styles.ratingText}>
                                ⭐ {rating}
                            </ThemedText>
                        </View>
                    </ThemedView>

                    {/* Divider */}
                    <View style={[styles.divider, { backgroundColor: tintColor }]} />

                    {/* Info Cards */}
                    {location && (
                        <View style={styles.infoCard}>
                            <IconSymbol name="location.fill" size={18} color={tintColor} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <ThemedText style={styles.infoLabel}>Lokasi</ThemedText>
                                <ThemedText style={styles.infoValue}>{location}</ThemedText>
                            </View>
                        </View>
                    )}

                    {price && (
                        <View style={styles.infoCard}>
                            <IconSymbol name="dollarsign.circle.fill" size={18} color={tintColor} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <ThemedText style={styles.infoLabel}>Harga Tiket</ThemedText>
                                <ThemedText style={styles.infoValue}>{price}</ThemedText>
                            </View>
                        </View>
                    )}

                    {hours && (
                        <View style={styles.infoCard}>
                            <IconSymbol name="clock.fill" size={18} color={tintColor} />
                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <ThemedText style={styles.infoLabel}>Jam Operasional</ThemedText>
                                <ThemedText style={styles.infoValue}>{hours}</ThemedText>
                            </View>
                        </View>
                    )}

                    {/* Description Section */}
                    <ThemedView style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            Deskripsi
                        </ThemedText>
                        <ThemedText style={styles.descriptionText}>
                            {description}
                        </ThemedText>
                    </ThemedView>

                    {/* Tips Section */}
                    <ThemedView style={styles.section}>
                        <ThemedText type="subtitle" style={styles.sectionTitle}>
                            Tips Berkunjung
                        </ThemedText>
                        <View style={styles.tipItem}>
                            <ThemedText style={[styles.tipBullet, { color: tintColor }]}>•</ThemedText>
                            <ThemedText style={styles.tipText}>Datang pagi hari untuk menghindari kerumunan</ThemedText>
                        </View>
                        <View style={styles.tipItem}>
                            <ThemedText style={[styles.tipBullet, { color: tintColor }]}>•</ThemedText>
                            <ThemedText style={styles.tipText}>Bawa air minum dan sunscreen</ThemedText>
                        </View>
                        <View style={styles.tipItem}>
                            <ThemedText style={[styles.tipBullet, { color: tintColor }]}>•</ThemedText>
                            <ThemedText style={styles.tipText}>Pakai pakaian yang nyaman dan sesuai cuaca</ThemedText>
                        </View>
                    </ThemedView>

                    {/* Action Button */}
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: tintColor }]}
                        activeOpacity={0.8}
                    >
                        <ThemedText style={styles.buttonText}>
                            Pesan Tiket Sekarang
                        </ThemedText>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 30 }} />
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heroContainer: {
        height: 280,
    },

    heroImage: {
        width: '100%',
        height: '100%',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },

    backButtonFloating: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    heroContent: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    ratingBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginTop: 8,
    },

    ratingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },

    heroTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#fff',
    },

    heroSubtitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
        marginTop: 4,
    },

    content: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f9fa',
    },

    sheet: {
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: '#fff',
        padding: 16,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginTop: 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    backButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: 0.5,
    },

    categoryBadge: {
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 24,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    categoryText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 0.4,
    },
    titleSection: {
        marginBottom: 18,
        paddingBottom: 16,
    },
    mainTitle: {
        marginBottom: 8,
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    ratingContainer: {
        marginTop: 10,
    },
    rating: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    divider: {
        height: 1.5,
        marginVertical: 16,
        borderRadius: 1,
        opacity: 0.3,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 14,
        paddingHorizontal: 14,
        marginBottom: 12,
        borderRadius: 14,
        borderLeftWidth: 4,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },
    infoLabel: {
        fontSize: 11,
        opacity: 0.6,
        marginBottom: 5,
        fontWeight: '600',
        letterSpacing: 0.3,
        textTransform: 'uppercase',
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 8,
        borderRadius: 8,
    },
    infoText: {
        fontSize: 13,
    },
    section: {
        marginBottom: 26,
        paddingBottom: 12,
    },
    sectionTitle: {
        marginBottom: 14,
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 0.3,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        letterSpacing: 0.25,
        opacity: 0.8,
        fontWeight: '400',
    },
    tipItem: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderLeftWidth: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    tipBullet: {
        fontSize: 20,
        fontWeight: '900',
        marginTop: -2,
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.4,
    },
});
