import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function PremiumSplashScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const logoBlur = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(10);
  const progressWidth = useSharedValue(0);
  
  // Transition values for "zoom out"
  const containerScale = useSharedValue(1);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    // Initial reveal
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.back(1.5)) });
    
    // Tagline reveal
    setTimeout(() => {
      taglineOpacity.value = withTiming(1, { duration: 800 });
      taglineY.value = withTiming(0, { duration: 800 });
    }, 600);

    // Progress bar
    progressWidth.value = withTiming(width * 0.4, { duration: 2500 });

    // Breathing logo effect
    logoBlur.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0, { duration: 1500 })
      ),
      -1,
      true
    );

    // Transition to home
    const timer = setTimeout(() => {
      handleExit();
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const handleExit = () => {
    // Zoom out effect (scale down slightly and fade)
    containerScale.value = withTiming(0.85, { duration: 600, easing: Easing.inOut(Easing.quad) });
    containerOpacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(navigateToHome)();
    });
  };

  const navigateToHome = () => {
    router.replace('/(tabs)');
  };

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
    shadowOpacity: opacity.value * 0.6,
    shadowRadius: 10 + logoBlur.value * 10,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: containerScale.value }],
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <LinearGradient
        colors={[Colors.background, Colors.surface, Colors.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <View style={styles.content}>
        {/* Logo Section */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <View style={styles.diamondOuter}>
             <Ionicons name="diamond" size={48} color={Colors.primary} />
          </View>
          <View style={styles.glow} />
        </Animated.View>

        {/* Brand Name */}
        <Animated.View style={{ opacity }}>
           <Text style={styles.brandTitle}>{t('splash.brand_name')}</Text>
           <View style={styles.separator} />
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={[styles.taglineWrap, taglineStyle]}>
          <Text style={styles.taglineText}>{t('splash.tagline')}</Text>
        </Animated.View>

        {/* Minimal Loader */}
        <View style={styles.loaderContainer}>
          <View style={styles.loaderBg}>
            <Animated.View style={[styles.loaderProgress, progressStyle]} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  diamondOuter: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: 'rgba(254, 161, 22, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: 'rgba(254, 161, 22, 0.15)',
    borderRadius: 30,
    zIndex: 1,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 12,
    textAlign: 'center',
  },
  separator: {
    width: 40,
    height: 2,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    marginTop: 10,
    opacity: 0.5,
  },
  taglineWrap: {
    marginTop: 24,
  },
  taglineText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.45)',
    letterSpacing: 4,
    fontWeight: '500',
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  loaderBg: {
    width: width * 0.4,
    height: 2,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  loaderProgress: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});
