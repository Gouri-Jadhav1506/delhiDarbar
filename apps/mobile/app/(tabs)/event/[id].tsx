import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Linking,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { EVENTS } from '@/constants/mockData';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function EventDetailsScreen() {
  const { t } = useTranslation();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { userName, phoneNumber } = useAuth();
  
  const event = EVENTS.find(e => e.id === id);

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('events.details.not_found')}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.primary, marginTop: 20 }}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleRSVP = () => {
    const message = `🎉 *${t('events.whatsapp_rsvp_title', { title: event.title })}* 🎉\n\n` +
      `👤 ${t('cart.auth.your_name_label')}: ${userName || 'Guest'}\n` +
      `📞 ${t('cart.auth.phone_placeholder')}: ${phoneNumber || 'N/A'}\n` +
      `📅 ${t('profile.label_date')}: ${event.date}\n` +
      `⏰ ${t('profile.label_time_slot')}: ${event.time}\n` +
      `📍 ${t('events.details.venue_label')}: Skyline\n\n` +
      `Looking forward to the night!`;

    const businessPhone = '919000000000';
    const url = `whatsapp://send?phone=${businessPhone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: event.image }} style={styles.heroImage} contentFit="cover" />
          <LinearGradient
            colors={['rgba(4, 45, 49, 0.4)', 'rgba(4, 45, 49, 0.95)']}
            style={styles.heroGradient}
          />
          
          {/* Back Button */}
          <SafeAreaView style={styles.backBtnWrap}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <BlurView intensity={30} tint="dark" style={styles.blurBtn}>
                <Ionicons name="chevron-back" size={24} color="#FFF" />
              </BlurView>
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.heroContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{event.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
                <Text style={styles.metaText}>{event.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={18} color={Colors.primary} />
                <Text style={styles.metaText}>{event.time}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.djSection}>
            <View style={styles.djInfo}>
              <Text style={styles.sectionLabel}>{t('events.details.headlining')}</Text>
              <Text style={styles.djName}>{event.djName || t('events.details.featured_artist')}</Text>
            </View>
            <Ionicons name="musical-notes" size={28} color={Colors.primary} />
          </View>
          
          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>{t('events.about_event')}</Text>
            <Text style={styles.longDesc}>{event.longDescription}</Text>
          </View>

          <View style={styles.highlightSection}>
            <Text style={styles.sectionTitle}>{t('events.label_highlights')}</Text>
            {event.highlights.map((h, i) => (
              <View key={i} style={styles.highlightItem}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                <Text style={styles.highlightText}>{h}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 180 }} />
      </ScrollView>

      {/* Floating RSVP Button */}
      <View style={styles.footer}>
        <LinearGradient
          colors={['transparent', Colors.background]}
          style={styles.footerGradient}
          pointerEvents="none"
        />
        <TouchableOpacity style={styles.rsvpBtn} onPress={handleRSVP}>
          <LinearGradient
            colors={[Colors.primary, '#FEA42B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.rsvpGradient}
          >
            <Ionicons name="logo-whatsapp" size={24} color={Colors.background} />
            <Text style={styles.rsvpText}>{t('events.rsvp_whatsapp')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
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
  heroContainer: {
    height: 480,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backBtnWrap: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  blurBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    right: 25,
  },
  categoryBadge: {
    backgroundColor: 'rgba(254, 161, 22, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  title: {
    ...Typography.h1,
    color: '#FFF',
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: -1,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  detailsContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
  },
  djSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  djInfo: {
    flex: 1,
  },
  sectionLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  djName: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 22,
  },
  descSection: {
    marginTop: 35,
  },
  sectionTitle: {
    ...Typography.h3,
    color: '#FFF',
    fontSize: 18,
    marginBottom: 12,
  },
  longDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    lineHeight: 24,
  },
  highlightSection: {
    marginTop: 35,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  highlightText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 100,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  footerGradient: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    height: 150,
  },
  rsvpBtn: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  rsvpGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  rsvpText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
  },
});
