import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../../constants/products';

const { width } = Dimensions.get('window');
const GRID_GAP = 16;
const HORIZONTAL_PADDING = 24;
const PADDING_TOTAL = HORIZONTAL_PADDING * 2;
const AVAILABLE_WIDTH = width - PADDING_TOTAL;

// On larger screens (web/tablet), we can fit 3 columns. On mobile, 2.
const NUM_COLUMNS = width >= 768 ? 3 : 2;
const CARD_WIDTH = Math.floor((AVAILABLE_WIDTH - (GRID_GAP * (NUM_COLUMNS - 1))) / NUM_COLUMNS);

export default function CategoriesScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleCategoryPress = (categoryKey: string) => {
    router.push(`/ecommerce/category/${categoryKey}`);
  };

  const renderCategory = ({ item }: { item: typeof CATEGORIES[0] }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { width: CARD_WIDTH }]}
      activeOpacity={0.85}
      onPress={() => handleCategoryPress(item.key)}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${item.color}15` }]}>
        <Ionicons name={item.icon} size={36} color={item.color} />
      </View>
      <Text style={[styles.categoryTitle, { textAlign: 'center' }]} numberOfLines={2}>
        {t(`ecommerce.cat_${item.key}`, item.label)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('categories.header', 'Shop by Category')}</Text>
      </View>

      <FlatList
        data={CATEGORIES}
        renderItem={renderCategory}
        keyExtractor={item => item.key}
        numColumns={NUM_COLUMNS}
        key={NUM_COLUMNS} // Force re-render if screen size crosses column breakpoint
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  
  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 24 : 54,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // Grid
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 24,
    paddingBottom: Platform.OS === 'web' ? 24 : 60, // extra padding for bottom tabs on mobile
  },
  columnWrapper: {
    justifyContent: 'flex-start',
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  
  // Cards
  categoryCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 20,
  },
});
