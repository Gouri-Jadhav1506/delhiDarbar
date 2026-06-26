import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView, useWindowDimensions, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PRODUCTS, CATEGORIES, productImages, Product } from '../../../constants/products';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useRetailCart } from '../../../contexts/RetailCartContext';
import spiceBlissLogo from '../../../assets/images/spice-bliss-logo.png';

const CARD_GAP = 12;

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart, isInCart, itemCount } = useRetailCart();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  // Responsive logic
  const isTablet = width >= 768;
  const numColumns = isTablet ? 3 : 2;
  const horizontalPadding = 24 * 2; // 24 on each side
  const availableWidth = width - horizontalPadding;
  const cardWidth = Math.floor((availableWidth - (CARD_GAP * (numColumns - 1))) / numColumns);

  const filteredProducts = PRODUCTS.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
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
          <TouchableOpacity
            style={[styles.quickAddBtn, isInCart(item.id) && styles.quickAddBtnActive]}
            onPress={(e) => { e.stopPropagation(); if (!isInCart(item.id)) addToCart(item); }}
          >
            <Ionicons
              name={isInCart(item.id) ? 'checkmark' : 'add'}
              size={16}
              color={isInCart(item.id) ? '#042D31' : '#FEA116'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      {/* Section Title for Products */}
      <View style={styles.productsSectionHeader}>
        <Text style={styles.sectionTitle}>
          {t('home.discover', 'Discover Products')}
        </Text>
        <Text style={styles.productCount}>{filteredProducts.length} {t('home.items', 'items')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top accent bar */}
      <View style={styles.topAccent} />

      {/* Header */}
      <View style={styles.header}>
        <Image 
          source={spiceBlissLogo} 
          style={styles.headerLogo} 
          resizeMode="contain" 
        />
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.switchBtn}
            onPress={() => router.replace('/selection')}
          >
            <Ionicons name="apps-outline" size={24} color="#FEA116" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.cartBtn}
            onPress={() => router.push('/ecommerce/(tabs)/cart' as any)}
          >
            <Ionicons name="bag-outline" size={24} color="#FEA116" />
            {itemCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color="rgba(255,255,255,0.35)" />
        <TextInput
          style={styles.searchInput}
          placeholder={t('home.searchPlaceholder', 'Search products...')}
          placeholderTextColor="rgba(255,255,255,0.25)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.35)" />
          </TouchableOpacity>
        )}
      </View>

      {/* Products Grid with Category Header */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // Force re-render of FlatList when columns change
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="rgba(255,255,255,0.15)" />
            <Text style={styles.emptyText}>{t('home.noProducts', 'No products found')}</Text>
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
  topAccent: {
    height: 3,
    backgroundColor: '#FEA116',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 8,
  },
  headerLogo: {
    width: 200,
    height: 60,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchBtn: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  cartBtn: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FEA116',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#042D31',
  },

  // Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 24,
    marginTop: 16,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    height: '100%',
  },

  // Products section header
  productsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  productCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: '500',
  },

  // Product Grid
  gridContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    aspectRatio: 1, // Ensures image is always square relative to its dynamic width
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
  quickAddBtn: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.25)',
  },
  quickAddBtnActive: {
    backgroundColor: '#FEA116',
    borderColor: '#FEA116',
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
