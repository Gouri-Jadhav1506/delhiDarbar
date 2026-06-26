import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { 
  FadeInDown, 
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import AnimatedPressable from '@/components/AnimatedPressable';

const { width, height } = Dimensions.get('window');

interface SeatingSection {
  id: string;
  key: string;
  image: string;
  status: 'available' | 'limited' | 'full';
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

const SEATING_SECTIONS: SeatingSection[] = [
  {
    id: '1',
    key: 'rooftop',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    icon: 'cloud-outline',
    color: '#00C853',
  },
  {
    id: '2',
    key: 'lounge',
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c3d?auto=format&fit=crop&w=800&q=80',
    status: 'limited',
    icon: 'musical-notes-outline',
    color: Colors.primary,
  },
  {
    id: '3',
    key: 'bar',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    icon: 'beer-outline',
    color: '#00C853',
  },
  {
    id: '4',
    key: 'vip',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=800&q=80',
    status: 'full',
    icon: 'diamond-outline',
    color: '#FF1744',
  }
];

export default function AmbienceScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scrollY = useSharedValue(0);

  const handleSelect = (id: string, status: string) => {
    if (status === 'full') return;
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (selectedId) {
      router.push('/(tabs)/menu');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background Subtle Gradient */}
      <LinearGradient
        colors={[Colors.background, '#053B40']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>{t('ambience.title')}</Text>
            <Text style={styles.subtitle}>{t('ambience.subtitle')}</Text>
          </View>
        </View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={(e) => { scrollY.value = e.nativeEvent.contentOffset.y; }}
          scrollEventThrottle={16}
        >
          {SEATING_SECTIONS.map((item, index) => (
            <AmbienceCard 
              key={item.id}
              item={item}
              index={index}
              isSelected={selectedId === item.id}
              onSelect={() => handleSelect(item.id, item.status)}
              t={t}
            />
          ))}
          <View style={{ height: 100 }} />
        </Animated.ScrollView>
      </SafeAreaView>

      {/* Floating Action Button */}
      {selectedId && (
        <Animated.View 
          entering={FadeInDown.springify()} 
          style={styles.fabContainer}
        >
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={handleConfirm}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.fab}
            >
              <Text style={styles.fabText}>{t('ambience.reserve_vibe')}</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.background} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

function AmbienceCard({ item, index, isSelected, onSelect, t }: { 
  item: SeatingSection, 
  index: number, 
  isSelected: boolean,
  onSelect: () => void,
  t: any 
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(isSelected ? 1.02 : scale.value) }],
      borderColor: withSpring(isSelected ? Colors.primary : 'transparent'),
      borderWidth: isSelected ? 2 : 0,
    };
  });

  const statusColor = item.status === 'available' ? '#00E676' : 
                     item.status === 'limited' ? Colors.primary : '#FF5252';

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 150).springify()}
      style={[styles.cardContainer, animatedStyle]}
    >
      <TouchableOpacity 
        activeOpacity={0.95}
        onPress={onSelect}
        onPressIn={() => { scale.value = 0.98; }}
        onPressOut={() => { scale.value = 1; }}
        style={styles.cardTouch}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImage} 
          contentFit="cover"
          transition={500}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Status Badge */}
        <View style={styles.statusBadge}>
          <BlurView intensity={30} tint="dark" style={styles.statusBlur}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: '#FFF' }]}>
              {t(`ambience.status.${item.status}`).toUpperCase()}
            </Text>
          </BlurView>
        </View>

        {/* Content Info */}
        <View style={styles.cardContent}>
          <View style={styles.vibeRow}>
            <Ionicons name={item.icon} size={16} color={Colors.primary} />
            <Text style={styles.vibeText}>{t(`ambience.sections.${item.key}.vibe`)}</Text>
          </View>
          <Text style={styles.sectionName}>{t(`ambience.sections.${item.key}.name`)}</Text>
          <Text style={styles.sectionDesc} numberOfLines={2}>
            {t(`ambience.sections.${item.key}.description`)}
          </Text>
        </View>

        {/* Selection Indicator */}
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Ionicons name="checkmark-circle" size={32} color={Colors.primary} />
          </View>
        )}

        {/* Muted Overlay for Full */}
        {item.status === 'full' && (
          <View style={styles.fullOverlay}>
            <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />
            <Text style={styles.fullNote}>{t('ambience.status.full').toUpperCase()}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 20,
    gap: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 24,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardContainer: {
    height: height * 0.3,
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
  },
  cardTouch: {
    flex: 1,
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
  },
  statusBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statusBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cardContent: {
    marginTop: 'auto',
    padding: 20,
  },
  vibeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  vibeText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  sectionName: {
    ...Typography.h3,
    color: '#FFF',
    fontSize: 20,
    marginBottom: 4,
  },
  sectionDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    lineHeight: 18,
  },
  selectedIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -16,
    shadowColor: Colors.primary,
    shadowRadius: 15,
    shadowOpacity: 0.5,
  },
  fullOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullNote: {
    color: '#FFF',
    fontWeight: '900',
    fontSize: 16,
    letterSpacing: 3,
  },
  fabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 30,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  fab: {
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  }
});
