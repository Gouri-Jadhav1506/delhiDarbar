import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  Dimensions 
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor 
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { setLanguagePreference } from '@/src/i18n';
import { Colors } from '@/constants/theme';

const TOGGLE_WIDTH = 80;
const TOGGLE_HEIGHT = 34;
const PILL_WIDTH = (TOGGLE_WIDTH - 6) / 2;

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // 0 for English, 1 for French
  const sliderPosition = useSharedValue(currentLang === 'fr' ? 1 : 0);

  useEffect(() => {
    sliderPosition.value = withSpring(currentLang === 'fr' ? 1 : 0, {
      damping: 20,
      stiffness: 150
    });
  }, [currentLang]);

  const toggleLanguage = async () => {
    const nextLang = currentLang === 'en' ? 'fr' : 'en';
    await setLanguagePreference(nextLang);
  };

  const animatedSliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sliderPosition.value * PILL_WIDTH }],
  }));

  const enTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      sliderPosition.value,
      [0, 1],
      ['#000', 'rgba(255,255,255,0.4)']
    )
  }));

  const frTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      sliderPosition.value,
      [0, 1],
      ['rgba(255,255,255,0.4)', '#000']
    )
  }));

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      onPress={toggleLanguage} 
      style={styles.container}
    >
      <Animated.View style={[styles.slider, animatedSliderStyle]} />
      <View style={styles.labelRow}>
        <View style={styles.labelCell}>
          <Animated.Text style={[styles.labelText, enTextStyle]}>EN</Animated.Text>
        </View>
        <View style={styles.labelCell}>
          <Animated.Text style={[styles.labelText, frTextStyle]}>FR</Animated.Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    padding: 3,
  },
  slider: {
    width: PILL_WIDTH,
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 9,
    position: 'absolute',
    left: 3,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  labelCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
