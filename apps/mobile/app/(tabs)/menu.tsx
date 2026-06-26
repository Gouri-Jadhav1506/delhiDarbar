import React, { useRef, useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  SectionList,
  Dimensions,
  TextInput,
  ScrollView,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSequence, 
  withSpring,
  withTiming 
} from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import { RESTAURANT_MENU, MenuItem } from '@/constants/menuItems';
import { useRestaurantCart } from '@/contexts/RestaurantCartContext';
import AnimatedPressable from '@/components/AnimatedPressable';
import SkeletonLoader from '@/components/SkeletonLoader';

const { width } = Dimensions.get('window');

type MainTab = 'food' | 'drink' | 'combo';

export default function MenuScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { cart, addToCart, updateQuantity, itemCount, cartTotal } = useRestaurantCart();
  
  const sectionListRef = useRef<SectionList>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMainTab, setActiveMainTab] = useState<MainTab>('food');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string | null>(null);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'none' | 'price_low' | 'popular'>('none');

  const cartPulseScale = useSharedValue(1);

  const cartAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cartPulseScale.value }],
    };
  });

  const triggerCartPulse = () => {
    cartPulseScale.value = withSequence(
      withSpring(1.08, { damping: 10, stiffness: 300 }),
      withSpring(1, { damping: 10, stiffness: 200 })
    );
  };

  const toggleDietaryFilter = (filter: string) => {
    setActiveDietary(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveDietary([]);
    setSelectedCuisines([]);
    setSelectedSpiceLevel(null);
    setSelectedAllergens([]);
    setSortBy('none');
  };

  const hasActiveFilters = activeDietary.length > 0 || 
    selectedCuisines.length > 0 || 
    selectedSpiceLevel !== null || 
    selectedAllergens.length > 0 || 
    sortBy !== 'none';

  // Filtering logic
  const filteredMenu = useMemo(() => {
    return RESTAURANT_MENU.map(section => {
      const filteredData = section.data.filter(item => {
        const matchesTab = item.categoryType === activeMainTab;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Dietary match (Veg, Non-Veg, etc)
        const matchesDietary = activeDietary.length > 0 
          ? (item.dietary && activeDietary.includes(item.dietary)) || 
            (activeDietary.includes('veg') && item.dietary === 'vegan')
          : true;

        // Cuisine match
        const matchesCuisine = selectedCuisines.length > 0
          ? item.cuisine?.some(c => selectedCuisines.includes(c))
          : true;

        // Spice match
        const matchesSpice = selectedSpiceLevel 
          ? item.spiceLevel === selectedSpiceLevel
          : true;

        // Allergen match (exclusive - e.g. "Dairy-Free" must NOT have "Dairy" in ingredients/allergens)
        // For simplicity, we match the tag directly in the allergens array
        const matchesAllergens = selectedAllergens.length > 0
          ? item.allergens?.some(a => selectedAllergens.includes(a))
          : true;

        return matchesTab && matchesSearch && matchesDietary && matchesCuisine && matchesSpice && matchesAllergens;
      });

      // Sort logic
      if (sortBy === 'price_low') {
        filteredData.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'popular') {
        filteredData.sort((a, b) => b.rating - a.rating);
      }

      return { ...section, data: filteredData };
    }).filter(section => section.data.length > 0);
  }, [activeMainTab, searchQuery, activeDietary, selectedCuisines, selectedSpiceLevel, selectedAllergens, sortBy]);

  const getCartQuantity = (itemId: string) => {
    return cart.filter(c => c.id === itemId).reduce((sum, i) => sum + i.quantity, 0);
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

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const getDietaryIcon = (dietary?: string) => {
    switch (dietary) {
      case 'veg': return { name: 'leaf', color: '#4CAF50' };
      case 'vegan': return { name: 'plant', color: '#8BC34A' };
      case 'non-veg': return { name: 'restaurant', color: '#F44336' };
      case 'halal': return { name: 'shield-checkmark', color: '#FF9800' };
      case 'gluten-free': return { name: 'warning', color: '#FFEB3B' };
      default: return null;
    }
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const qty = getCartQuantity(item.id);
    const cartLine = cart.find(c => c.id === item.id);
    const dietaryInfo = getDietaryIcon(item.dietary);
    
    return (
      <AnimatedPressable 
        style={styles.itemCard}
        onPress={() => router.push({ pathname: '/menu-detail/[id]', params: { id: item.id } })}
      >
        <View style={styles.itemImageWrap}>
          <Image source={{ uri: item.image }} style={styles.itemImg} contentFit="cover" />
          {item.tag && (
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{t(`menu.tags.${item.tag.toLowerCase().replace(/\s+/g, '_')}`).toUpperCase()}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.itemInfo}>
          <View style={styles.itemHeader}>
            <View style={styles.itemNameRow}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              {dietaryInfo && (
                <View style={styles.dietaryIconWrap}>
                   <Ionicons name={dietaryInfo.name as any} size={14} color={dietaryInfo.color} />
                </View>
              )}
            </View>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={12} color={Colors.primary} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.itemFooter}>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            {qty > 0 && cartLine ? (
              <View style={styles.qtyControls}>
                <TouchableOpacity onPress={() => updateQuantity(cartLine.cartItemId, qty - 1)} style={styles.qtyBtn}>
                  <Ionicons name="remove" size={16} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{qty}</Text>
                <TouchableOpacity onPress={() => updateQuantity(cartLine.cartItemId, qty + 1)} style={styles.qtyBtn}>
                  <Ionicons name="add" size={16} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <AnimatedPressable 
                style={styles.addBtnContainer} 
                onPress={() => {
                  addToCart(item);
                  triggerCartPulse();
                }}
              >
                <LinearGradient
                  colors={[Colors.primary, '#FEA42B']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.addBtn}
                >
                  <Text style={styles.addText}>{t('menu.item.add')}</Text>
                  <Ionicons name="add" size={16} color={Colors.background} />
                </LinearGradient>
              </AnimatedPressable>
            )}
          </View>
        </View>
      </AnimatedPressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.headerArea}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" />
          <TextInput 
            placeholder={t('menu.search_placeholder')} 
            placeholderTextColor="rgba(255,255,255,0.4)"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Tabs */}
      <View style={styles.mainTabs}>
        {(['food', 'drink', 'combo'] as MainTab[]).map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tabItem, activeMainTab === tab && styles.activeTab]}
            onPress={() => setActiveMainTab(tab)}
          >
            <Text style={[styles.tabLabel, activeMainTab === tab && styles.activeTabLabel]}>
              {t(`menu.categories.${tab}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filters Area - Sticky Horizontal Scroll */}
      <View style={styles.filterArea}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {/* Clear All - Visible only when filters active */}
          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearBtn} onPress={clearAllFilters}>
              <Ionicons name="refresh-circle" size={20} color={Colors.primary} />
              <Text style={styles.clearText}>{t('menu.filters.clear_all')}</Text>
            </TouchableOpacity>
          )}

          {/* Primary Dietary (Veg/Non-Veg) */}
          {(['veg', 'non-veg'] as const).map((diet) => {
            const isActive = activeDietary.includes(diet);
            return (
              <TouchableOpacity 
                key={diet}
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => toggleDietaryFilter(diet)}
              >
                <Text style={[styles.filterChipIcon, isActive && styles.activeFilterChipText]}>
                  {diet === 'veg' ? '🌿' : '🥩'}
                </Text>
                <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                  {t(`menu.filters.${diet === 'veg' ? 'veg_only' : 'non_veg'}`)}
                </Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.filterDivider} />

          {/* Cuisine Tags */}
          {['Mughlai', 'North Indian', 'Tandoori', 'Biryani'].map((cuisine) => {
            const isActive = selectedCuisines.includes(cuisine);
            const key = cuisine.toLowerCase().replace(' ', '_');
            return (
              <TouchableOpacity 
                key={cuisine}
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => setSelectedCuisines(prev => 
                  prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
                )}
              >
                <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                  {t(`menu.filters.cuisine.${key}`)}
                </Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.filterDivider} />

          {/* Spice Levels */}
          {(['mild', 'medium', 'spicy'] as const).map((level) => {
            const isActive = selectedSpiceLevel === level;
            const fireIcons = level === 'mild' ? '🔥' : level === 'medium' ? '🔥🔥' : '🔥🔥🔥';
            return (
              <TouchableOpacity 
                key={level}
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => setSelectedSpiceLevel(isActive ? null : level)}
              >
                <Text style={styles.spiceIcon}>{fireIcons}</Text>
                <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                  {t(`menu.filters.spice.${level}`)}
                </Text>
              </TouchableOpacity>
            );
          })}

          <View style={styles.filterDivider} />

          {/* Allergens */}
          {['Gluten', 'Dairy', 'Nuts'].map((allergen) => {
            const isActive = selectedAllergens.includes(allergen);
            const key = allergen === 'Gluten' ? 'gluten_free' : allergen === 'Dairy' ? 'dairy_free' : 'nut_free';
            return (
              <TouchableOpacity 
                key={allergen}
                style={[styles.filterChip, isActive && styles.activeFilterChip]}
                onPress={() => setSelectedAllergens(prev => 
                  prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
                )}
              >
                <Ionicons name="alert-circle-outline" size={12} color={isActive ? Colors.background : 'rgba(255,255,255,0.4)'} />
                <Text style={[styles.filterChipText, isActive && styles.activeFilterChipText]}>
                  {t(`menu.filters.${key}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Categories Bar */}
      <View style={styles.catBarWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catBarScroll}>
          {filteredMenu.map((section, idx) => (
            <TouchableOpacity 
              key={section.title} 
              onPress={() => scrollToCategory(idx)}
              style={[styles.catPill, activeCategoryIndex === idx && styles.activeCatPill]}
            >
              <Text style={[styles.catPillText, activeCategoryIndex === idx && styles.activeCatPillText]}>
                {t(`menu.sections.${section.title.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'n').replace(/[^a-z0-9_]/g, '')}`)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu List */}
      {isLoading ? (
        <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map(i => (
            <View key={i} style={styles.itemCard}>
              <SkeletonLoader width={100} height={100} borderRadius={16} />
              <View style={{ flex: 1, marginLeft: 15, justifyContent: 'center', gap: 10 }}>
                <SkeletonLoader width="80%" height={20} />
                <SkeletonLoader width="60%" height={15} />
                <SkeletonLoader width="40%" height={25} style={{ marginTop: 10 }} />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <SectionList
          ref={sectionListRef}
          sections={filteredMenu}
          keyExtractor={(item) => item.id}
          renderItem={renderMenuItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {t(`menu.sections.${title.toLowerCase().replace(/\s+/g, '_').replace(/&/g, 'n').replace(/[^a-z0-9_]/g, '')}`)}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              const title = viewableItems[0].section.title;
              const idx = filteredMenu.findIndex(s => s.title === title);
              if (idx !== -1) setActiveCategoryIndex(idx);
            }
          }}
        />
      )}

      {/* Floating Cart (Visible if items in cart) */}
      {itemCount > 0 && (
        <Animated.View style={[styles.footerWrap, cartAnimatedStyle]}>
          <TouchableOpacity 
            style={styles.cartBtnTouch} 
            activeOpacity={0.9}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.cartBtn}
            >
              <View style={styles.cartInfo}>
                <View style={styles.badgeWrap}>
                  <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
                <Text style={styles.viewOrderText}>{t('menu.item.view_order')}</Text>
              </View>
              <Text style={styles.totalText}>${cartTotal.toFixed(2)}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerArea: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#FFF',
    fontSize: 16,
  },
  mainTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: Colors.surface,
    padding: 4,
    borderRadius: 14,
    marginBottom: 15,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabLabel: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  activeTabLabel: {
    color: Colors.background,
  },
  filterArea: {
    marginBottom: 15,
  },
  filterScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    gap: 10,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  activeFilterChip: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  activeFilterChipText: {
    color: Colors.background,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginRight: 5,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.3)',
  },
  clearText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  filterChipIcon: {
    fontSize: 14,
  },
  spiceIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  catBarWrapper: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  catBarScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 12,
    gap: 10,
  },
  catPill: {
    paddingBottom: 4,
  },
  activeCatPill: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  catPillText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '700',
  },
  activeCatPillText: {
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  sectionHeader: {
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    ...Typography.h3,
    fontSize: 18,
    color: '#FFF',
  },
  itemCard: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  itemImageWrap: {
    position: 'relative',
  },
  itemImg: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  tagBadge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 8,
    fontWeight: '900',
    color: Colors.background,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  itemName: {
    ...Typography.bodyBold,
    fontSize: 16,
    color: '#FFF',
    flexShrink: 1,
  },
  dietaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  vegDot: {
    backgroundColor: '#4CAF50',
  },
  nonVegDot: {
    backgroundColor: '#F44336',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
  itemDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 16,
    marginVertical: 4,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    ...Typography.bodyBold,
    color: Colors.primary,
    fontSize: 18,
  },
  dietaryIconWrap: {
    padding: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  filterDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  addBtnContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 7,
    gap: 5,
  },
  addText: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.background,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 2,
  },
  qtyBtn: {
    padding: 5,
  },
  qtyText: {
    color: '#FFF',
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
  },
  footerWrap: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 100,
    left: 20,
    right: 20,
  },
  cartBtnTouch: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  cartBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeWrap: {
    backgroundColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: Colors.primary,
    fontWeight: '900',
    fontSize: 13,
  },
  viewOrderText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '800',
  },
  totalText: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: '900',
  },
});
