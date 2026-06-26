import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView,
  TextInput,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { OFFERS, EVENTS, VENUES, MENU_CATEGORIES, TRENDING_ITEMS_IDS } from '@/constants/mockData';
import { RESTAURANT_MENU, MenuItem } from '@/constants/menuItems';
import LanguageToggle from '@/components/LanguageToggle';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Find trending items from RESTAURANT_MENU
  const trendingItems: MenuItem[] = [];
  RESTAURANT_MENU.forEach(cat => {
    cat.data.forEach(item => {
      if (TRENDING_ITEMS_IDS.includes(item.id)) {
        trendingItems.push(item);
      }
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header & Glassmorphism Search */}
        <View style={styles.stickyHeader}>
          <BlurView intensity={Platform.OS === 'ios' ? 40 : 100} tint="dark" style={styles.blurHeader}>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcomeText}>{t('home.welcome')}</Text>
                <Text style={styles.brandText}>{t('home.brand')}</Text>
              </View>
              <View style={styles.headerRight}>
                <LanguageToggle />
                <TouchableOpacity 
                  style={styles.notificationBtn}
                  onPress={() => router.push('/scanner')}
                >
                  <Ionicons name="qr-code-outline" size={22} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationBtn}>
                  <Ionicons name="notifications-outline" size={22} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.searchWrap}>
              <Ionicons name="search" size={18} color="rgba(255,255,255,0.4)" style={styles.searchIcon} />
              <TextInput 
                placeholder={t('menu.search_placeholder')} 
                placeholderTextColor="rgba(255,255,255,0.3)"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </BlurView>
        </View>

        {/* Fulfillment Mode Switcher */}
        <TouchableOpacity
          style={styles.fulfillmentBanner}
          activeOpacity={0.8}
          onPress={() => router.replace('/fulfillment')}
        >
          <View style={styles.fulfillmentLeft}>
            <View style={styles.fulfillmentDot} />
            <Text style={styles.fulfillmentLabel}>
              {t('fulfillment.current_mode', 'Ordering Mode')}
            </Text>
          </View>
          <View style={styles.fulfillmentRight}>
            <Text style={styles.fulfillmentMode}>
              {t('fulfillment.change', 'Change')}
            </Text>
            <Ionicons name="swap-horizontal" size={14} color={Colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Top Banner Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          snapToInterval={width - 40}
          decelerationRate="fast"
          contentContainerStyle={styles.bannerScroll}
        >
          {OFFERS.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.bannerCard} activeOpacity={0.9}>
              <Image source={{ uri: offer.image }} style={styles.bannerImage} contentFit="cover" />
              <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
                style={styles.bannerGradient}
              >
                <View style={styles.bannerBadge}>
                  <Text style={styles.bannerBadgeText}>{offer.discount}</Text>
                </View>
                <Text style={styles.bannerTitle}>{offer.title}</Text>
                <Text style={styles.bannerDesc}>{offer.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Explore Menu CTA */}
        <View style={styles.ctaWrapper}>
          <TouchableOpacity 
            style={styles.exploreCta} 
            activeOpacity={0.8}
            onPress={() => router.push('/ambience')}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{t('home.explore_menu')}</Text>
              <Ionicons name="restaurant" size={20} color={Colors.background} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.categories')}</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScroll}
        >
          {MENU_CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryItem} 
              onPress={() => router.push('/(tabs)/menu')}
            >
              <View style={styles.categoryImageWrap}>
                <Image source={{ uri: cat.image }} style={styles.categoryImg} contentFit="cover" />
              </View>
              <Text style={styles.categoryLabel}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Venues Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.featured_venues')}</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.venueScroll}
        >
          {VENUES.map((venue) => (
            <TouchableOpacity key={venue.id} style={styles.venueCard} activeOpacity={0.8}>
              <Image source={{ uri: venue.image }} style={styles.venueImage} contentFit="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.venueGradient}
              >
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.venueSubtitle} numberOfLines={1}>{venue.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Trending Items */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.trending_items')}</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.trendingScroll}
        >
          {trendingItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.trendingCard} activeOpacity={0.8}>
              <Image source={{ uri: item.image }} style={styles.trendingImg} contentFit="cover" />
              <View style={styles.trendingLabelWrap}>
                <Text style={styles.trendingName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.trendingPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upcoming Events */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.upcoming_events')}</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/events')}>
            <Text style={styles.seeAll}>{t('common.see_all')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventList}>
          {EVENTS.slice(0, 2).map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard} activeOpacity={0.9} onPress={() => router.push({ pathname: '/(tabs)/event/[id]', params: { id: event.id } })}>
              <Image source={{ uri: event.image }} style={styles.eventImg} contentFit="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.eventGradient}
              >
                <View style={styles.eventBadge}>
                  <Text style={styles.eventBadgeText}>{event.category.toUpperCase()}</Text>
                </View>
                <Text style={styles.eventName}>{event.title}</Text>
                <View style={styles.eventRow}>
                  <Ionicons name="calendar-outline" size={14} color={Colors.primary} />
                  <Text style={styles.eventTime}>{event.date} • {event.time}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  fulfillmentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.12)',
  },
  fulfillmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fulfillmentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  fulfillmentLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  fulfillmentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  fulfillmentMode: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  stickyHeader: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  blurHeader: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },
  brandText: {
    ...Typography.h1,
    fontSize: 27,
    color: '#FFF',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bannerScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 20,
    marginBottom: 20,
  },
  bannerCard: {
    width: width - 40,
    height: 190,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bannerBadgeText: {
    color: Colors.background,
    fontSize: 10,
    fontWeight: '900',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  bannerDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  ctaWrapper: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  exploreCta: {
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  ctaGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  ctaText: {
    color: Colors.background,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    ...Typography.h3,
    color: '#FFF',
    fontSize: 20,
  },
  seeAll: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 30,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImageWrap: {
    width: 78,
    height: 78,
    borderRadius: 39,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(254, 161, 22, 0.4)',
    padding: 3,
    marginBottom: 10,
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  categoryLabel: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  venueScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 30,
  },
  venueCard: {
    width: 260,
    height: 160,
    borderRadius: 22,
    overflow: 'hidden',
    marginRight: 15,
  },
  venueImage: {
    width: '100%',
    height: '100%',
  },
  venueGradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 15,
    justifyContent: 'flex-end',
  },
  venueName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  venueSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  trendingScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 30,
  },
  trendingCard: {
    width: 150,
    marginRight: 15,
  },
  trendingImg: {
    width: 150,
    height: 150,
    borderRadius: 22,
    marginBottom: 10,
  },
  trendingLabelWrap: {
    paddingHorizontal: 4,
  },
  trendingName: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  trendingPrice: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  eventList: {
    paddingHorizontal: 20,
  },
  eventCard: {
    width: '100%',
    height: 190,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 18,
  },
  eventImg: {
    width: '100%',
    height: '100%',
  },
  eventGradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
  },
  eventBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(254, 161, 22, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  eventBadgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  eventName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  eventTime: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '500',
  },
});
