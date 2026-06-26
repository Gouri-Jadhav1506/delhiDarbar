import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useWishlist } from '../../../contexts/WishlistContext';
import { PRODUCTS, productImages } from '../../../constants/products';

const { width } = Dimensions.get('window');

export default function WishlistScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  // Map the wishlist items to product data
  const wishlistProducts = wishlistItems.map(id => {
    return PRODUCTS.find(p => p.id === id);
  }).filter(Boolean) as typeof PRODUCTS;



  const renderWishlistItem = ({ item }: { item: typeof wishlistProducts[0] }) => (
    <View style={styles.wishlistItem}>
      {/* Product Image */}
      <View style={styles.imageWrap}>
        <Image source={productImages[item.image]} style={styles.productImage} resizeMode="cover" />
      </View>

      {/* Product Details */}
      <View style={styles.itemDetails}>
        <Text style={styles.productName} numberOfLines={2}>{t(`ecommerce.product_${item.id}_name`, item.name)}</Text>
        <Text style={styles.productCategory}>{t(`ecommerce.cat_${item.category.toLowerCase().replace(/ /g, '_')}`, item.category)}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>

      {/* Actions */}
      <View style={styles.itemActions}>
        <TouchableOpacity 
          style={styles.removeBtn} 
          onPress={() => removeFromWishlist(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color="#F06595" />
        </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('wishlist.header', 'Wishlist')}</Text>
      </View>

      {wishlistProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="heart-outline" size={64} color="rgba(240, 101, 149, 0.5)" />
          </View>
          <Text style={styles.emptyTitle}>{t('wishlist.emptyTitle', 'Your wishlist is empty')}</Text>
          <Text style={styles.emptyText}>{t('wishlist.emptyText', 'Save items you love and come back to them later.')}</Text>
          <TouchableOpacity 
            style={styles.exploreBtn}
            onPress={() => router.push('/ecommerce/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.exploreText}>{t('wishlist.explore', 'Explore Products')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlistProducts}
          renderItem={renderWishlistItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 54,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(240, 101, 149, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  exploreBtn: {
    backgroundColor: '#FEA116',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
  },
  exploreText: {
    color: '#042D31',
    fontSize: 16,
    fontWeight: '700',
  },

  // List Items
  listContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  imageWrap: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    paddingLeft: 14,
    paddingTop: 4,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    lineHeight: 20,
  },
  productCategory: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FEA116',
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 44,
  },
  removeBtn: {
    padding: 8,
    marginTop: -8,
    marginRight: -8,
  },
});
