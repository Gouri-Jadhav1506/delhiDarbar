import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';

const { width } = Dimensions.get('window');

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact';
}

export default function EmptyState({ 
  icon, 
  title, 
  subtitle, 
  actionLabel, 
  onAction,
  variant = 'default'
}: EmptyStateProps) {
  const isCompact = variant === 'compact';

  return (
    <Animated.View 
      entering={FadeIn.duration(600)} 
      style={[styles.container, isCompact && styles.compactContainer]}
    >
      <Animated.View 
        entering={ZoomIn.delay(200).duration(500)} 
        style={[styles.iconCircle, isCompact && styles.compactIconCircle]}
      >
        <LinearGradient
          colors={['rgba(254, 161, 22, 0.12)', 'transparent']}
          style={styles.iconGlow}
        />
        <Ionicons name={icon} size={isCompact ? 32 : 80} color="rgba(255,255,255,0.15)" />
      </Animated.View>

      <Text style={[styles.title, isCompact && styles.compactTitle]}>{title}</Text>
      
      {subtitle && (
        <Text style={[styles.subtitle, isCompact && styles.compactSubtitle]}>{subtitle}</Text>
      )}

      {actionLabel && onAction && (
        <TouchableOpacity 
          style={[styles.actionBtn, isCompact && styles.compactActionBtn]}
          onPress={onAction}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={[Colors.primary, '#FEA42B']}
            style={[styles.btnGradient, isCompact && styles.compactBtnGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.btnText, isCompact && styles.compactBtnText]}>{actionLabel}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 300,
  },
  compactContainer: {
    padding: 15,
    minHeight: 140,
  },
  iconCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  compactIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 12,
  },
  iconGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 90,
  },
  title: {
    ...Typography.h3,
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  compactTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  compactSubtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  actionBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  compactActionBtn: {
    borderRadius: 12,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  btnGradient: {
    paddingHorizontal: 36,
    paddingVertical: 18,
    minWidth: 180,
  },
  compactBtnGradient: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    minWidth: 130,
  },
  btnText: {
    color: Colors.background,
    fontWeight: '900',
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  compactBtnText: {
    fontSize: 13,
  },
});
