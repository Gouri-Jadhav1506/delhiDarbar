import React, { useState, useEffect } from 'react';
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
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  interpolate 
} from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';

const { width, height } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function QRScannerScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isFlashOn, setIsFlashOn] = useState(false);

  // Animation for the scanning line
  const scanLineY = useSharedValue(0);
  const borderPulse = useSharedValue(1);

  useEffect(() => {
    scanLineY.value = withRepeat(
      withTiming(SCAN_AREA_SIZE, { duration: 2500 }),
      -1,
      true
    );

    borderPulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1.0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scanLineY.value }],
      opacity: interpolate(scanLineY.value, [0, 10, SCAN_AREA_SIZE - 10, SCAN_AREA_SIZE], [0, 1, 1, 0]),
    };
  });

  const animatedBorderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: borderPulse.value }],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Mock Camera Preview (Dark Gradient) */}
      <LinearGradient
        colors={['#041C1E', '#062C2E', '#041C1E']}
        style={StyleSheet.absoluteFill}
      />

      {/* Overlay for focusing the scan area */}
      <View style={styles.overlayContainer}>
        {/* Top Dark Section */}
        <View style={styles.unfocusedArea} />
        
        <View style={styles.middleRow}>
          <View style={styles.unfocusedArea} />
          
          <View style={styles.scanArea}>
            {/* Corner Borders */}
            <Animated.View style={[styles.cornerTL, animatedBorderStyle]} />
            <Animated.View style={[styles.cornerTR, animatedBorderStyle]} />
            <Animated.View style={[styles.cornerBL, animatedBorderStyle]} />
            <Animated.View style={[styles.cornerBR, animatedBorderStyle]} />
            
            {/* Moving Scan Line */}
            <Animated.View style={[styles.scanLine, animatedLineStyle]}>
              <LinearGradient
                colors={['transparent', Colors.primary, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
          
          <View style={styles.unfocusedArea} />
        </View>
        
        {/* Bottom Dark Section */}
        <View style={[styles.unfocusedArea, styles.bottomArea]}>
          <Text style={styles.instructionText}>
            {t('profile.scanner.instruction')}
          </Text>
        </View>
      </View>

      {/* Interface Controls */}
      <SafeAreaView style={styles.controlsTop}>
        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => router.back()}
        >
          <BlurView intensity={30} tint="dark" style={styles.blurWrap}>
            <Ionicons name="close" size={24} color="#FFF" />
          </BlurView>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconBtn} 
          onPress={() => setIsFlashOn(!isFlashOn)}
        >
          <BlurView intensity={30} tint="dark" style={styles.blurWrap}>
            <Ionicons 
              name={isFlashOn ? "flash" : "flash-off"} 
              size={22} 
              color={isFlashOn ? Colors.primary : "#FFF"} 
            />
          </BlurView>
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.menuCta}
          onPress={() => router.replace('/table-welcome')}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
            style={styles.ctaBlur}
          >
            <Text style={styles.ctaText}>DEMO: GO TO MENU</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  unfocusedArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleRow: {
    flexDirection: 'row',
    height: SCAN_AREA_SIZE,
  },
  scanArea: {
    width: SCAN_AREA_SIZE,
    height: SCAN_AREA_SIZE,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
  },
  bottomArea: {
    flex: 1.5,
    paddingTop: 40,
    alignItems: 'center',
  },
  instructionText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 50,
    lineHeight: 24,
    opacity: 0.8,
    fontWeight: '600',
  },
  // Corners
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: Colors.primary,
    borderTopLeftRadius: 20,
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: Colors.primary,
    borderTopRightRadius: 20,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: Colors.primary,
    borderBottomLeftRadius: 20,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: Colors.primary,
    borderBottomRightRadius: 20,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
  },
  controlsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  iconBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  blurWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  menuCta: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  ctaBlur: {
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  ctaText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  }
});
