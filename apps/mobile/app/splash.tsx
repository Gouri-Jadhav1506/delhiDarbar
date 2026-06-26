import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { loadLanguage } from '../src/i18n';
import { useTranslation } from 'react-i18next';

export default function SplashScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      })
    ]).start();

    const initializeApp = async () => {
      // Simulate minimum splash time of 1.5 seconds for branding
      const minSplashTime = new Promise(resolve => setTimeout(resolve, 1500));
      const languageCheck = loadLanguage();

      const [_, savedLanguage] = await Promise.all([minSplashTime, languageCheck]);

      // Navigate based on language preference
      if (savedLanguage) {
        router.replace('/selection');
      } else {
        router.replace('/language-selection');
      }
    };

    initializeApp();
  }, [fadeAnim, scaleAnim, router]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoWrap}>
          <Ionicons name="diamond" size={60} color="#042D31" />
        </View>
        <Text style={styles.brandTitle}>DELHI DARBAR</Text>
        <Text style={styles.tagline}>A World of Flavors & Scents</Text>
        
        {/* Loading Indicator */}
        <Animated.View style={[styles.loaderWrap, { opacity: fadeAnim }]}>
           <Text style={styles.loadingText}>{t('splash.loading', 'Loading...')}</Text>
        </Animated.View>
      </Animated.View>

      <View style={styles.bottomAccent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoWrap: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FEA116',
    letterSpacing: 6,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  loaderWrap: {
    marginTop: 60,
  },
  loadingText: {
    color: '#FEA116',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  bottomAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#FEA116',
  }
});
