import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import AnimatedPressable from '@/components/AnimatedPressable';

const { width, height } = Dimensions.get('window');

export default function TableWelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleStartOrdering = () => {
    // Navigate to the main menu tab
    router.replace('/(tabs)/menu');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Premium Background (Styled with Gradient & Vignette) */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#053B40', '#042D31', '#000']}
          style={StyleSheet.absoluteFill}
        />
        {/* Subtle Decorative Glows */}
        <View style={[styles.glow, { top: -100, left: -100 }]} />
        <View style={[styles.glow, { bottom: -150, right: -50, width: 400, height: 400, opacity: 0.1 }]} />
      </View>

      <SafeAreaView style={styles.content}>
        <View style={styles.main}>
          {/* Hero Icon/Brand Accent */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.iconContainer}>
            <LinearGradient
              colors={['rgba(254, 161, 22, 0.2)', 'transparent']}
              style={styles.iconGlow}
            />
            <Ionicons name="restaurant" size={48} color={Colors.primary} />
          </Animated.View>

          {/* Table Identifier Section */}
          <Animated.View entering={FadeInUp.delay(400)} style={styles.tableBlock}>
            <Text style={styles.tableLabel}>{t('profile.scanner.table_title')}</Text>
            <View style={styles.numberRow}>
              <Text style={styles.tableNumber}>12</Text>
              <View style={styles.activeDot} />
            </View>
          </Animated.View>

          {/* Welcome Message */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.welcomeBlock}>
            <Text style={styles.welcomeTitle}>{t('profile.scanner.welcome_msg')}</Text>
            <Text style={styles.welcomeSubtitle}>
              Your culinary journey at Skyline begins now. Explore our curated menu and enjoy your evening.
            </Text>
          </Animated.View>
        </View>

        {/* Action Button */}
        <Animated.View entering={FadeInUp.delay(800)} style={styles.footer}>
          <AnimatedPressable 
            style={styles.ctaButton}
            onPress={handleStartOrdering}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{t('profile.scanner.start_ordering')}</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.background} />
            </LinearGradient>
          </AnimatedPressable>
          
          <TouchableOpacity 
            style={styles.backLink}
            onPress={() => router.replace('/scanner')}
          >
            <Text style={styles.backLinkText}>RE-SCAN</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  glow: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary,
    opacity: 0.15,
    filter: 'blur(100px)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  iconGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
  },
  tableBlock: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tableLabel: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 4,
    opacity: 0.8,
    marginBottom: 5,
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tableNumber: {
    color: '#FFF',
    fontSize: 90,
    fontWeight: '900',
    lineHeight: 100,
    letterSpacing: -2,
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginTop: 20,
    marginLeft: 4,
  },
  welcomeBlock: {
    alignItems: 'center',
    maxWidth: 280,
  },
  welcomeTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  welcomeSubtitle: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    paddingBottom: Platform.OS === 'ios' ? 40 : 60,
    alignItems: 'center',
  },
  ctaButton: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  ctaGradient: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  ctaText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  backLink: {
    marginTop: 25,
    padding: 10,
  },
  backLinkText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textDecorationLine: 'underline',
  }
});
