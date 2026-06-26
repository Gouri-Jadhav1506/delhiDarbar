import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolate,
  FadeInDown,
  FadeIn
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { RESTAURANT_MENU, MenuItem } from '@/constants/menuItems';
import { useRestaurantCart } from '@/contexts/RestaurantCartContext';
import AnimatedPressable from '@/components/AnimatedPressable';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.55;

export default function MenuDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const { addToCart, cart } = useRestaurantCart();
  const [showVideo, setShowVideo] = useState(false);

  // Find the menu item
  let menuItem: MenuItem | undefined;
  for (const category of RESTAURANT_MENU) {
    const found = category.data.find(item => item.id === id);
    if (found) {
      menuItem = found;
      break;
    }
  }

  const scrollY = useSharedValue(0);

  if (!menuItem) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Item not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
            Extrapolate.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const blurInitialOpacity = Platform.OS === 'ios' ? 0 : 1;
  const headerBlurStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [HEADER_HEIGHT * 0.5, HEADER_HEIGHT * 0.8],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const handleAddToCart = () => {
    addToCart(menuItem!);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Parallax Header Image */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <Image 
          source={{ uri: menuItem.image }} 
          style={styles.headerImage} 
          contentFit="cover" 
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        
        {menuItem.videoUrl && (
          <TouchableOpacity 
            style={styles.videoBadge}
            onPress={() => setShowVideo(true)}
          >
            <BlurView intensity={30} tint="dark" style={styles.videoBlur}>
              <Ionicons name="play" size={20} color={Colors.primary} />
              <Text style={styles.videoText}>{t('menu.detail.watch_video')}</Text>
            </BlurView>
          </TouchableOpacity>
        )}
      </Animated.View>

      {/* Sticky Top Navigation */}
      <View style={styles.topNav}>
        <SafeAreaView>
          <View style={styles.navContent}>
            <TouchableOpacity 
              style={styles.navBtn} 
              onPress={() => router.back()}
            >
              <BlurView intensity={20} tint="dark" style={styles.navBlur}>
                <Ionicons name="chevron-back" size={24} color="#FFF" />
              </BlurView>
            </TouchableOpacity>
            
            <Animated.View style={[styles.navTitleWrap, headerBlurStyle]}>
              <Text style={styles.navTitle} numberOfLines={1}>{menuItem.name}</Text>
            </Animated.View>

            <TouchableOpacity style={styles.navBtn}>
              <BlurView intensity={20} tint="dark" style={styles.navBlur}>
                <Ionicons name="share-outline" size={20} color="#FFF" />
              </BlurView>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <Animated.ScrollView
        onScroll={(e) => { scrollY.value = e.nativeEvent.contentOffset.y; }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.spacer} />
        
        <View style={styles.detailsContainer}>
          {/* Main Info */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.mainInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.itemName}>{menuItem.name}</Text>
              {menuItem.dietary && (
                <View style={[styles.dietaryDot, menuItem.dietary === 'veg' ? styles.vegDot : styles.nonVegDot]} />
              )}
            </View>
            
            <View style={styles.metaRow}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color={Colors.primary} />
                <Text style={styles.ratingText}>{menuItem.rating}</Text>
              </View>
              <Text style={styles.categoryText}>{menuItem.categoryType.toUpperCase()}</Text>
              {menuItem.tag && (
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{menuItem.tag.toUpperCase()}</Text>
                </View>
              )}
            </View>
          </Animated.View>

          {/* Description / Story */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>{t('menu.detail.about')}</Text>
            <Text style={styles.descriptionText}>{menuItem.description}</Text>
          </Animated.View>

          {/* Ingredients Grid */}
          {menuItem.ingredients && (
            <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
              <Text style={styles.sectionTitle}>{t('menu.detail.ingredients')}</Text>
              <View style={styles.ingredientsGrid}>
                {menuItem.ingredients.map((ing, index) => (
                  <View key={index} style={styles.ingredientChip}>
                    <Text style={styles.ingredientText}>{ing}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}

          <View style={{ height: 150 }} />
        </View>
      </Animated.ScrollView>

      {/* Sticky Footer CTA */}
      <BlurView intensity={80} tint="dark" style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.priceWrap}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>${menuItem.price.toFixed(2)}</Text>
          </View>
          
          <AnimatedPressable 
            style={styles.addCta}
            onPress={handleAddToCart}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{t('menu.detail.add_to_order')}</Text>
              <Ionicons name="cart-outline" size={20} color={Colors.background} />
            </LinearGradient>
          </AnimatedPressable>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: HEADER_HEIGHT,
    width: width,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
  },
  spacer: {
    height: HEADER_HEIGHT - 60,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  detailsContainer: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 30,
    paddingHorizontal: 25,
    minHeight: height * 0.6,
  },
  topNav: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  navContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    height: 60,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  navBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  navTitleWrap: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  navTitle: {
    ...Typography.h3,
    color: '#FFF',
    fontSize: 18,
  },
  videoBadge: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.3)',
  },
  videoBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  videoText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  mainInfo: {
    marginBottom: 30,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  itemName: {
    ...Typography.h1,
    color: '#FFF',
    fontSize: 32,
    flex: 1,
  },
  dietaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  vegDot: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  nonVegDot: {
    backgroundColor: '#F44336',
    shadowColor: '#F44336',
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  ratingText: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  categoryText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  tagBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '900',
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 15,
  },
  descriptionText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  ingredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ingredientChip: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
  },
  ingredientText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceWrap: {
    gap: 4,
  },
  priceLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  priceValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
  },
  addCta: {
    width: width * 0.55,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  ctaGradient: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  ctaText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
  },
  backText: {
    color: Colors.primary,
    fontWeight: '700',
  }
});
