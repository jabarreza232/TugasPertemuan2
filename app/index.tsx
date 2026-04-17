import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ScrollableList, { ListItem } from '@/components/scrollable-list';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
const sampleItems: ListItem[] = [
  {
    id: '1',
    title: 'Borobudur',
    subtitle: 'Candi Budha Terbesar di Dunia',
    description: 'Candi Borobudur adalah kuil Buddha terbesar di dunia...',
    category: 'Candi Bersejarah',
    location: 'Magelang, Jawa Tengah',
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f',
    price: 'Rp 15.000 - 30.000',
    rating: 4.8,
    hours: '06:00 - 17:00 WIB',
  },
  {
    id: '2',
    title: 'Prambanan',
    subtitle: 'Candi Hindu Megah',
    description: 'Candi Prambanan adalah kompleks candi Hindu terbesar...',
    category: 'Candi Bersejarah',
    location: 'Yogyakarta, Jawa Tengah',
    image: 'https://images.unsplash.com/photo-1604999333679-b86d54738315',
    price: 'Rp 12.500 - 25.000',
    rating: 4.7,
    hours: '06:00 - 17:30 WIB',
  },
  {
    id: '3',
    title: 'Raja Ampat',
    subtitle: 'Kepulauan Surga Bawah Laut',
    description: 'Raja Ampat adalah kepulauan yang terkenal...',
    category: 'Pantai & Laut',
    location: 'Papua Barat',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    price: 'Rp 500.000 - 2.000.000',
    rating: 4.9,
    hours: 'Sepanjang waktu',
  },
  {
    id: '4',
    title: 'Komodo',
    subtitle: 'Pulau Naga Terakhir',
    description: 'Pulau Komodo adalah habitat alami komodo...',
    category: 'Alam Liar',
    location: 'Nusa Tenggara Timur',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    price: 'Rp 50.000 - 150.000',
    rating: 4.6,
    hours: '07:00 - 16:00 WIB',
  },
  {
    id: '5',
    title: 'Danau Toba',
    subtitle: 'Danau Vulkanik Terbesar',
    description: 'Danau Toba adalah danau vulkanik terluas...',
    category: 'Alam & Budaya',
    location: 'Sumatera Utara',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    price: 'Rp 50.000 - 100.000',
    rating: 4.7,
    hours: 'Sepanjang waktu',
  },
  {
    id: '6',
    title: 'Lombok & Gili',
    subtitle: 'Pulau Eksotis & Pantai Putih',
    description: 'Lombok terkenal dengan pantai-pantai indah...',
    category: 'Pantai & Laut',
    location: 'Nusa Tenggara Barat',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206',
    price: 'Rp 100.000 - 300.000',
    rating: 4.8,
    hours: 'Sepanjang waktu',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleItemPress = (item: ListItem) => {
    router.push({
      pathname: '/detail',
      params: {
        id: item.id,
        image: item.image,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        category: item.category,
        location: item.location,
        price: item.price,
        rating: item.rating?.toString() || '',
        hours: item.hours,
      },
    });
  };

 return (
  <ThemedView style={styles.container}>
    
    {/* HEADER */}
    <ThemedView style={styles.header}>
      <ThemedView>
        <ThemedText style={styles.greeting}>Halo 👋</ThemedText>
        <ThemedText type="title" style={styles.title}>
          Wisata Indonesia
        </ThemedText>
      </ThemedView>
      <HelloWave />
    </ThemedView>

    {/* SUBTITLE */}
    <ThemedText style={styles.subtitle}>
      Jelajahi destinasi populer di Indonesia
    </ThemedText>

    {/* CATEGORY CHIPS (NEW 🔥) */}
    <ThemedView style={styles.chipContainer}>
      {['Semua', 'Pantai', 'Gunung', 'Candi', 'Budaya'].map((item) => (
        <ThemedView key={item} style={styles.chip}>
          <ThemedText style={styles.chipText}>{item}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>

    {/* LIST */}
    <ThemedView style={styles.listContainer}>
      <ScrollableList 
        items={sampleItems}
        onItemPress={handleItemPress}
      />
    </ThemedView>

  </ThemedView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 14,
    opacity: 0.6,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    opacity: 0.6,
  },

  chipContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 10,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#E5E7EB', // abu soft
  },

  chipText: {
    fontSize: 12,
    fontWeight: '500',
  },

  listContainer: {
    flex: 1,
    marginTop: 20,
  },
});

