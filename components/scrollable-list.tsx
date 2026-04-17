import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';

export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  location?: string;
  price?: string;
  rating?: number;
  hours?: string;
  category?: string;
}

interface ScrollableListProps {
  items: ListItem[];
  onItemPress: (item: ListItem) => void;
}
type Props = ScrollableListProps;

export default function ScrollableList({ items, onItemPress }: Props) {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onItemPress(item)}
            activeOpacity={0.8}
          >
            <ThemedView style={styles.card}>
              
              {/* IMAGE */}
              <Image
                source={{
                  uri: item.image || 'https://osccdn.medcom.id/images/content/2024/07/29/fef9274b4ed4d18b6633325373a32ee6.jpg',
                }}
                style={styles.image}
              />

              {/* CONTENT */}
              <View style={styles.cardContent}>
                <ThemedText style={styles.title}>
                  {item.title}
                </ThemedText>

                <ThemedText style={styles.subtitle}>
                  {item.subtitle}
                </ThemedText>

                {/* INFO ROW */}
                <View style={styles.row}>
                  <ThemedText style={styles.location}>
                    📍 {item.location}
                  </ThemedText>

                  <ThemedText style={styles.rating}>
                    ⭐ {item.rating}
                  </ThemedText>
                </View>

                <ThemedText
                  numberOfLines={2}
                  style={styles.description}
                >
                  {item.description}
                </ThemedText>
              </View>

            </ThemedView>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },

    elevation: 5,
  },

  image: {
    width: '100%',
    height: 180,
  },

  cardContent: {
    padding: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  location: {
    fontSize: 12,
    opacity: 0.7,
  },

  rating: {
    fontSize: 12,
    fontWeight: '600',
  },

  description: {
    marginTop: 8,
    fontSize: 13,
    opacity: 0.75,
    lineHeight: 18,
  },
});
