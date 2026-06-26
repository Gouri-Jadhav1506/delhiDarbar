import React from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  runOnJS 
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface AnimatedPressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  haptic?: Haptics.ImpactFeedbackStyle;
  scaleTo?: number;
}

const AnimatedView = Animated.createAnimatedComponent(Pressable);

export default function AnimatedPressable({ 
  children, 
  style, 
  haptic = Haptics.ImpactFeedbackStyle.Light,
  scaleTo = 0.95,
  onPress,
  ...props 
}: AnimatedPressableProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(scaleTo, { damping: 10, stiffness: 200 });
    if (haptic) {
      Haptics.impactAsync(haptic);
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <AnimatedView
      {...props}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, animatedStyle]}
    >
      {children}
    </AnimatedView>
  );
}
