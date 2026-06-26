import React, { useEffect } from 'react';
import { StyleSheet, View, Animated, LayoutRectangle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  interpolate 
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';

interface SkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: any;
}

export default function SkeletonLoader({ width, height, borderRadius = 12, style }: SkeletonProps) {
  const shimmerValue = useSharedValue(-1);

  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1, // Infinite
      false // No reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerValue.value,
      [-1, 1],
      [-200, 200]
    );

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View style={[styles.skeleton, { width, height, borderRadius }, style]}>
      <Reanimated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.05)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.1 }}
          style={StyleSheet.absoluteFill}
        />
      </Reanimated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
  },
});
