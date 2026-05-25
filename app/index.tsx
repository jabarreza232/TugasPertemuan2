import { useRouter } from 'expo-router';
import { 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity, 
  View, 
  TextInput,
  RefreshControl,
  Platform
} from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';

export interface ListItem {
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

export default function HomeScreen() {
  const router = useRouter();
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  
  // STATE BARU UNTUK FAVORIT 🔥
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const MOCK_API_URL = 'https://6a1439936c7db8aac0541617.mockapi.io/api/wisata';
      const res = await fetch(MOCK_API_URL);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const handleItemPress = (item: ListItem) => {
    router.push({
      pathname: '/detail',
      params: { ...item, rating: item.rating?.toString() || '' },
    });
  };

  // FUNGSI TOGGLE FAVORIT 🔥
  const toggleFavorite = (id: string) => {
    setFavoriteIds(prevIds => {
      if (prevIds.includes(id)) {
        return prevIds.filter(favId => favId !== id); // Hapus jika sudah ada
      }
      return [...prevIds, id]; // Tambahkan jika belum ada
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi 🌅';
    if (hour < 15) return 'Selamat Siang ☀️';
    if (hour < 18) return 'Selamat Sore 🌇';
    return 'Selamat Malam 🌙';
  };

  const categories = ['Semua', ...Array.from(new Set(items.map(item => item.category).filter(Boolean)))];

  const filteredItems = items.filter(item => {
    const matchCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const renderPopularCard = ({ item }: { item: ListItem }) => {
    const isFavorite = favoriteIds.includes(item.id);
    
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => handleItemPress(item)}>
        <View style={styles.sliderCard}>
          <Image source={{ uri: item.image }} style={styles.sliderImage} />
          <View style={styles.sliderOverlay}>
            <ThemedText style={styles.sliderTitle}>{item.title}</ThemedText>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color="#E5E7EB" />
              <ThemedText style={styles.sliderLocation}>{item.location}</ThemedText>
            </View>
          </View>
          
          {/* TOMBOL FAVORIT MELAYANG 🔥 */}
          <TouchableOpacity 
            style={styles.sliderFavButton} 
            activeOpacity={0.7} 
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={20} 
              color={isFavorite ? "#EF4444" : "#FFFFFF"} 
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  const NavItem = ({ icon, label, isActive, onPress }: { icon: any, label: string, isActive?: boolean, onPress: () => void }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.navItem}>
      <Ionicons 
        name={isActive ? icon : `${icon}-outline`} 
        size={24} 
        color={isActive ? '#111827' : '#9CA3AF'} 
      />
      <ThemedText style={[styles.navLabel, isActive && styles.navLabelActive]}>
        {label}
      </ThemedText>
      {isActive && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        style={styles.mainContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} 
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0a7ea4"]} />
        }
      >
        <View style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <ThemedText style={styles.greeting}>{getGreeting()}</ThemedText>
              <ThemedText style={styles.title}>Mau liburan kemana?</ThemedText>
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/profile')}>
              <Image 
                source={{ uri: 'https://avatar.iran.liara.run/public/boy' }} 
                style={styles.avatar} 
              />
            </TouchableOpacity>
          </View>

          {/* SEARCH BAR */}
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari destinasi atau lokasi..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
          </View>

          {/* MENU CATEGORY HORIZONTAL SCROLL */}
          <View style={styles.categoryWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipContainer}
            >
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  activeOpacity={0.7}
                  onPress={() => setActiveCategory(cat)}
                >
                  <View style={[styles.chip, activeCategory === cat && styles.chipActive]}>
                    <ThemedText style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>
                      {cat}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* SLIDER CAROUSEL */}
          {searchQuery === '' && (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionTitleRow}>
                <ThemedText style={styles.sectionTitle}>Rekomendasi Populer</ThemedText>
                <Ionicons name="flame" size={20} color="#E11D48" />
              </View>
              <FlatList
                horizontal
                data={items.slice(0, 4)}
                keyExtractor={(item, index) => `slider-${item?.id || index}`}
                renderItem={renderPopularCard}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16, paddingHorizontal: 20 }}
                snapToAlignment="start"
                decelerationRate="fast"
                pagingEnabled={Platform.OS === 'ios'}
              />
            </View>
          )}

          {/* LIST FAVORIT BAWAH */}
          <View style={[styles.sectionContainer, { paddingHorizontal: 20 }]}>
            <View style={styles.sectionTitleRow}>
              <ThemedText style={styles.sectionTitle}>
                {searchQuery ? 'Hasil Pencarian' : 'Destinasi Pilihan'}
              </ThemedText>
              {!searchQuery && <Ionicons name="sparkles" size={18} color="#D97706" />}
            </View>

            {filteredItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={48} color="#D1D5DB" />
                <ThemedText style={styles.emptyStateText}>
                  Maaf, destinasi tidak ditemukan.
                </ThemedText>
              </View>
            ) : (
              <View style={styles.favoriteList}>
                {filteredItems.map((item, index) => {
                  const isFavorite = favoriteIds.includes(item.id);
                  return (
                    <TouchableOpacity key={`fav-${item.id || index}`} activeOpacity={0.8} onPress={() => handleItemPress(item)}>
                      <View style={styles.favoriteCard}>
                        <Image source={{ uri: item.image }} style={styles.favoriteImage} />
                        <View style={styles.favoriteInfo}>
                          
                          <View style={styles.favoriteHeaderRow}>
                            <ThemedText style={styles.favoriteTitle} numberOfLines={1}>{item.title}</ThemedText>
                            {/* TOMBOL FAVORIT DI LIST 🔥 */}
                            <TouchableOpacity 
                              style={styles.listFavButton}
                              activeOpacity={0.7} 
                              onPress={() => toggleFavorite(item.id)}
                            >
                              <Ionicons 
                                name={isFavorite ? "heart" : "heart-outline"} 
                                size={18} 
                                color={isFavorite ? "#EF4444" : "#9CA3AF"} 
                              />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.locationSubtitleRow}>
                            <Ionicons name="location-outline" size={14} color="#6B7280" />
                            <ThemedText style={styles.favoriteSubtitle} numberOfLines={1}>{item.location}</ThemedText>
                          </View>
                          
                          <View style={styles.cardFooter}>
                            <View style={styles.ratingContainer}>
                              <Ionicons name="star" size={14} color="#D97706" />
                              <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
                            </View>
                            <ThemedText style={styles.priceText}>{item.price}</ThemedText>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

        </View>
      </ScrollView>

      {/* FLOATING BOTTOM NAVIGATION BAR */}
      <View style={styles.bottomNavContainer}>
        <NavItem 
          icon="home" 
          label="Beranda" 
          isActive={true} 
          onPress={() => {}} 
        />
        <NavItem 
          icon="heart" 
          label="Favorit" 
          isActive={false} 
          onPress={() => router.push('/favorites')} 
        />
        <NavItem 
          icon="receipt" 
          label="Riwayat" 
          isActive={false} 
          onPress={() => router.push('/history')} 
        />
        <NavItem 
          icon="person" 
          label="Profil" 
          isActive={false} 
          onPress={() => router.push('/profile')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    height: '100%',
  },

  categoryWrapper: {
    marginTop: 24,
    marginBottom: 8,
  },
  chipContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },

  sectionContainer: {
    marginTop: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  sliderCard: {
    width: 280,
    height: 340,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
    position: 'relative',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  sliderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sliderLocation: {
    fontSize: 13,
    color: '#F3F4F6',
    fontWeight: '500',
  },
  
  // Style untuk tombol favorit di slider
  sliderFavButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  favoriteList: {
    gap: 14,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  favoriteImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    height: 80,
  },
  favoriteHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  listFavButton: {
    padding: 4,
    marginLeft: 8,
  },
  locationSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: -4,
  },
  favoriteSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#B45309',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0a7ea4',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  bottomNavContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  navLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
  navLabelActive: {
    color: '#111827',
    fontWeight: '700',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#111827',
    position: 'absolute',
    bottom: -8,
  }
});