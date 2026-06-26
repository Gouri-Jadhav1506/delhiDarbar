import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform, 
  SectionList,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useTable } from '../../contexts/TableContext';
import { RESTAURANT_MENU, MenuItem } from '../../constants/menuItems';
import { useRestaurantCart } from '../../contexts/RestaurantCartContext';

const { width } = Dimensions.get('window');

export default function RestaurantMenuScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { activeTable } = useTable();
  const { cart, addToCart, removeFromCart, updateQuantity, itemCount, cartTotal } = useRestaurantCart();
  
  const sectionListRef = useRef<SectionList>(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getCartQuantity = (itemId: string) => {
    return cart.filter(c => c.id === itemId).reduce((sum, i) => sum + i.quantity, 0);
  };

  const handleItemPress = (item: MenuItem) => {
    if (item.customizable) {
      router.push({ pathname: '/restaurant/customize', params: { itemId: item.id } } as any);
    } else {
      addToCart(item);
    }
  };

  const scrollToCategory = (index: number) => {
    setActiveCategoryIndex(index);
    sectionListRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      animated: true,
      viewPosition: 0
    });
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const qty = getCartQuantity(item.id);
    const cartLine = cart.find(c => c.id === item.id);
    
    return (
      <TouchableOpacity 
        style={styles.itemCard}
        activeOpacity={0.8}
        onPress={() => item.customizable && handleItemPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        
        <View style={styles.itemContent}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemName} numberOfLines={2}>{t(`menu.item_${item.id}_name`, item.name)}</Text>
            {item.dietary && (
              <View style={[
                styles.dietaryDot, 
                item.dietary === 'veg' ? styles.vegDot : 
                item.dietary === 'non-veg' ? styles.nonVegDot : styles.veganDot
              ]} />
            )}
          </View>
          
          <Text style={styles.itemDesc} numberOfLines={2}>{t(`menu.item_${item.id}_desc`, item.description)}</Text>
          
          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            
            {qty > 0 && !item.customizable && cartLine ? (
              <View style={styles.qtyControls}>
                <TouchableOpacity 
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(cartLine.cartItemId, qty - 1)}
                >
                  <Ionicons name="remove" size={16} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity 
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(cartLine.cartItemId, qty + 1)}
                >
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ alignItems: 'flex-end', gap: 6 }}>
                {qty > 0 && <Text style={{ fontSize: 12, color: '#FEA116', fontWeight: '800' }}>{qty} {t('menu.inCart', 'IN CART')}</Text>}
                <TouchableOpacity 
                  style={styles.addBtn}
                  onPress={() => handleItemPress(item)}
                >
                  <Text style={styles.addBtnText}>{item.customizable ? t('menu.customize', 'CUSTOMIZE') : t('menu.add', 'ADD')}</Text>
                  <Ionicons name="add" size={16} color="#042D31" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FEA116" />
          </TouchableOpacity>
          <View style={styles.headerTitles}>
            <Text style={styles.headerTitle}>{t('restaurant.brand', 'Skyline')}</Text>
            <Text style={styles.tableSubtitle}>
              {activeTable ? t('menu.orderingFrom', 'Ordering from Table {{table}}', {table: activeTable}) : t('menu.takeawayOrder', 'Takeaway Order')}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.switchBtn} 
            onPress={() => router.replace('/selection')}
          >
            <Ionicons name="apps-outline" size={22} color="#FEA116" />
          </TouchableOpacity>
        </View>
        
        {/* Categories Horizontal Scroll */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {RESTAURANT_MENU.map((category, index) => {
            const isActive = activeCategoryIndex === index;
            return (
              <TouchableOpacity
                key={category.title}
                style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                onPress={() => scrollToCategory(index)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {t('menu.cat_' + category.title.toLowerCase().replace(/ /g, '_'), category.title) as string}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Menu List */}
      <SectionList
        ref={sectionListRef}
        sections={RESTAURANT_MENU}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeaderWrap}>
            <Text style={styles.sectionHeader}>{t('menu.cat_' + title.toLowerCase().replace(/ /g, '_'), title) as string}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            const visibleSectionStr = viewableItems[0].section.title;
            const index = RESTAURANT_MENU.findIndex(s => s.title === visibleSectionStr);
            if (index !== -1 && index !== activeCategoryIndex) {
              setActiveCategoryIndex(index);
            }
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <View style={styles.floatingCartWrap}>
          <TouchableOpacity 
            style={styles.cartBtn}
            activeOpacity={0.9}
            onPress={() => console.log('Go to Checkout')}
          >
            <View style={styles.cartCountWrap}>
              <Text style={styles.cartCount}>{itemCount}</Text>
            </View>
            <Text style={styles.cartViewText}>{t('menu.viewOrder', 'View Order')}</Text>
            <Text style={styles.cartTotal}>${cartTotal.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  header: {
    paddingTop: Platform.OS === 'web' ? 24 : 12,
    backgroundColor: '#042D31',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  headerTitles: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  tableSubtitle: {
    fontSize: 12,
    color: '#FEA116',
    marginTop: 2,
    fontWeight: '600',
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: 12,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryPillActive: {
    backgroundColor: '#FEA116',
    borderColor: '#FEA116',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  categoryTextActive: {
    color: '#042D31',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for floating cart
  },
  sectionHeaderWrap: {
    paddingVertical: 16,
    backgroundColor: '#042D31',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  itemImage: {
    width: 110,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  itemContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 22,
    paddingRight: 8,
  },
  dietaryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  vegDot: {
    backgroundColor: '#25D366',
  },
  nonVegDot: {
    backgroundColor: '#FF4B4B',
  },
  veganDot: {
    backgroundColor: '#AEEA00',
  },
  itemDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 18,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FEA116',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEA116',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#042D31',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  qtyBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    minWidth: 20,
    textAlign: 'center',
  },
  floatingCartWrap: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 24,
    left: 20,
    right: 20,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEA116',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cartCountWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#042D31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FEA116',
  },
  cartViewText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#042D31',
  },
  cartTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#042D31',
  },
});
