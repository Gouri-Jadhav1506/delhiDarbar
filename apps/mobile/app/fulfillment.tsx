import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import AnimatedPressable from '@/components/AnimatedPressable';

const { width } = Dimensions.get('window');

export default function FulfillmentScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleDineIn = () => {
    router.replace('/scanner');
  };

  const handleTakeaway = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Background */}
      <LinearGradient
        colors={['#053B40', '#042D31', '#031E21']}
        style={StyleSheet.absoluteFill}
      />

      {/* Top accent line */}
      <View style={styles.topAccent} />

      {/* Decorative glows */}
      <View style={[styles.glow, { top: -80, right: -60 }]} />
      <View style={[styles.glow, { bottom: 100, left: -80, opacity: 0.08 }]} />

      <SafeAreaView style={styles.safeArea}>
        {/* Back button */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <AnimatedPressable
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="rgba(255,255,255,0.6)" />
          </AnimatedPressable>
        </Animated.View>

        {/* Header */}
        <View style={styles.headerArea}>
          <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.iconWrap}>
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              style={styles.iconGradient}
            >
              <Ionicons name="diamond-outline" size={28} color={Colors.background} />
            </LinearGradient>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <Text style={styles.headerLabel}>
              {t('fulfillment.header_label', 'SKYLINE')}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <Text style={styles.heading}>
              {t('fulfillment.heading', 'How would you\nlike to order?')}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <Text style={styles.subheading}>
              {t('fulfillment.subheading', 'Choose your preferred dining experience')}
            </Text>
          </Animated.View>
        </View>

        {/* Selection Cards */}
        <View style={styles.cardsArea}>

          {/* === DINE-IN CARD (Recommended) === */}
          <Animated.View entering={FadeInUp.delay(500).duration(700)}>
            <AnimatedPressable
              style={styles.cardRecommended}
              onPress={handleDineIn}
              scaleTo={0.97}
            >
              {/* Recommended badge */}
              <View style={styles.recommendedBadge}>
                <Ionicons name="star" size={10} color={Colors.background} />
                <Text style={styles.recommendedText}>
                  {t('fulfillment.recommended', 'RECOMMENDED')}
                </Text>
              </View>

              {/* Glow behind the card */}
              <LinearGradient
                colors={['rgba(254, 161, 22, 0.12)', 'rgba(254, 161, 22, 0.02)', 'transparent']}
                style={styles.cardGlow}
              />

              <View style={styles.cardContent}>
                <View style={styles.cardIconWrap}>
                  <LinearGradient
                    colors={[Colors.primary, '#FEA42B']}
                    style={styles.cardIconGradient}
                  >
                    <Ionicons name="qr-code-outline" size={28} color={Colors.background} />
                  </LinearGradient>
                </View>

                <View style={styles.cardTextArea}>
                  <Text style={styles.cardTitle}>
                    {t('fulfillment.dine_in', 'Dine-In')}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {t('fulfillment.dine_in_desc', 'Scan the QR at your table to start ordering instantly')}
                  </Text>
                </View>

                <View style={styles.cardArrow}>
                  <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
                </View>
              </View>

              {/* Feature pills */}
              <View style={styles.featurePills}>
                <View style={styles.pill}>
                  <Ionicons name="flash-outline" size={12} color={Colors.primary} />
                  <Text style={styles.pillText}>
                    {t('fulfillment.instant', 'Instant')}
                  </Text>
                </View>
                <View style={styles.pill}>
                  <Ionicons name="scan-outline" size={12} color={Colors.primary} />
                  <Text style={styles.pillText}>
                    {t('fulfillment.qr_scan', 'QR Scan')}
                  </Text>
                </View>
                <View style={styles.pill}>
                  <Ionicons name="restaurant-outline" size={12} color={Colors.primary} />
                  <Text style={styles.pillText}>
                    {t('fulfillment.table_service', 'Table Service')}
                  </Text>
                </View>
              </View>
            </AnimatedPressable>
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('fulfillment.or', 'OR')}</Text>
            <View style={styles.dividerLine} />
          </Animated.View>

          {/* === TAKEAWAY CARD === */}
          <Animated.View entering={FadeInUp.delay(700).duration(700)}>
            <AnimatedPressable
              style={styles.card}
              onPress={handleTakeaway}
              scaleTo={0.97}
            >
              <View style={styles.cardContent}>
                <View style={styles.cardIconWrapSecondary}>
                  <Ionicons name="bag-handle-outline" size={26} color={Colors.primary} />
                </View>

                <View style={styles.cardTextArea}>
                  <Text style={styles.cardTitle}>
                    {t('fulfillment.takeaway', 'Takeaway')}
                  </Text>
                  <Text style={styles.cardDesc}>
                    {t('fulfillment.takeaway_desc', 'Browse our menu and pick up your order when ready')}
                  </Text>
                </View>

                <View style={styles.cardArrowSecondary}>
                  <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.3)" />
                </View>
              </View>
            </AnimatedPressable>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.View entering={FadeInUp.delay(900).duration(600)} style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.footerLine} />
            <Text style={styles.footerText}>
              {t('fulfillment.footer', 'DELHI DARBAR GROUP')}
            </Text>
            <View style={styles.footerLine} />
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.primary,
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: Colors.primary,
    opacity: 0.12,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },

  // Header
  headerArea: {
    marginTop: 28,
    marginBottom: 36,
  },
  iconWrap: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 3,
    marginBottom: 12,
    opacity: 0.8,
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 10,
    lineHeight: 22,
  },

  // Cards
  cardsArea: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -20,
  },

  // Recommended Card
  cardRecommended: {
    backgroundColor: 'rgba(254, 161, 22, 0.06)',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(254, 161, 22, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    borderRadius: 24,
  },
  recommendedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    marginBottom: 16,
  },
  recommendedText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.background,
    letterSpacing: 1.5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconWrap: {
    marginRight: 16,
  },
  cardIconGradient: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconWrapSecondary: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(254, 161, 22, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTextArea: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 19,
  },
  cardArrow: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  cardArrowSecondary: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  // Feature pills
  featurePills: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(254, 161, 22, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.3,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
    gap: 14,
    justifyContent: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 2,
  },

  // Standard Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },

  // Footer
  footer: {
    paddingBottom: Platform.OS === 'ios' ? 30 : 40,
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  footerLine: {
    width: 28,
    height: 1,
    backgroundColor: 'rgba(254, 161, 22, 0.25)',
  },
  footerText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.2)',
    letterSpacing: 3,
    fontWeight: '600',
  },
});
