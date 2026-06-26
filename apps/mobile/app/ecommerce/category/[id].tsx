import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, useWindowDimensions, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PRODUCTS, CATEGORIES, productImages, Product } from '../../../constants/products';
import { useWishlist } from '../../../contexts/WishlistContext';

const CARD_GAP = 12;

export default function CategoryProductsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  
  const categoryParams = CATEGORIES.find(c => c.key === id);
  const categoryName = categoryParams ? t(`ecommerce.cat_${categoryParams.key}`, categoryParams.label) : t('category.default', 'Category');


  const { wishlistItems, toggleWishlist } = useWishlist();
  const { width } = useWindowDimensions();

  // Responsive logic
  const isTablet = width >= 768;
  const numColumns = isTablet ? 3 : 2;
  const horizontalPadding = 24 * 2; // 24 on each side
  const availableWidth = width - horizontalPadding;
  const cardWidth = Math.floor((availableWidth - (CARD_GAP * (numColumns - 1))) / numColumns);

  const filteredProducts = PRODUCTS.filter((product) => {
    return id === 'All' || product.category === id;
  });

  const handleProductPress = (productId: string) => {
    router.push(`/ecommerce/product/${productId}`);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, { width: cardWidth }]}
      activeOpacity={0.9}
      onPress={() => handleProductPress(item.id)}
    >
      <View style={styles.imageWrap}>
        <Image source={productImages[item.image]} style={styles.productImage} resizeMode="cover" />
        <TouchableOpacity 
          style={styles.wishlistBtn} 
          onPress={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
        >
          <Ionicons 
            name={wishlistItems.includes(item.id) ? "heart" : "heart-outline"} 
            size={20} 
            color={wishlistItems.includes(item.id) ? "#F06595" : "#fff"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.productName} numberOfLines={1}>{t(`ecommerce.product_${item.id}_name`, item.name)}</Text>
        <Text style={styles.productCategory}>{t(`ecommerce.cat_${item.category.toLowerCase().replace(/ /g, '_')}`, item.category)}</Text>
        {/* Star rating */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#FEA116" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewText}>({item.reviewCount})</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FEA116" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName} {t('category.products', 'Products')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.productsSectionHeader}>
        <Text style={styles.productCount}>{filteredProducts.length} {t('category.itemsFound', 'items found')}</Text>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="rgba(255,255,255,0.15)" />
            <Text style={styles.emptyText}>{t('category.empty', 'No products found in this category.')}</Text>
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 54,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Products section header
  productsSectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  productCount: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  // Product Grid
  gridContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: CARD_GAP,
  },
  productCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
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
  imageWrap: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(4, 45, 49, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardBody: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FEA116',
  },
  reviewText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FEA116',
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.3)',
  },
});
