import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Platform
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock data for the reservations list
const MOCK_RESERVATIONS = [
  {
    id: 'res_1',
    date: '2026-04-10',
    time: '20:30',
    guests: 4,
    status: 'confirmed',
    note: 'Window table preferred'
  },
  {
    id: 'res_2',
    date: '2026-04-15',
    time: '19:00',
    guests: 2,
    status: 'pending',
    note: ''
  }
];

export default function ReservationsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('profile.reservations_header')}</Text>
          <Text style={styles.headerSubtitle}>{t('profile.reserve_subtitle')}</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Book Table Promo */}
        <Animated.View entering={FadeInDown.delay(200)}>
          <TouchableOpacity 
            style={styles.promoCard}
            onPress={() => router.push('/reservation/new')}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.promoGradient}
            >
              <View style={styles.promoInfo}>
                <Text style={styles.promoTitle}>{t('profile.book_table_now')}</Text>
                <Text style={styles.promoSubtitle}>{t('profile.book_table_now_subtitle')}</Text>
              </View>
              <View style={styles.promoIconWrap}>
                <Ionicons name="calendar-outline" size={32} color={Colors.background} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Active Reservations */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Bookings</Text>
        </View>

        {MOCK_RESERVATIONS.length > 0 ? (
          MOCK_RESERVATIONS.map((res, index) => (
            <Animated.View 
              key={res.id} 
              entering={FadeInRight.delay(400 + index * 100)}
            >
              <TouchableOpacity 
                style={styles.resCard}
                onPress={() => router.push(`/(tabs)/reservation/${res.id}` as any)}
              >
                <View style={styles.resDateColumn}>
                  <Text style={styles.resMonth}>APR</Text>
                  <Text style={styles.resDay}>{res.date.split('-')[2]}</Text>
                </View>
                
                <View style={styles.resInfo}>
                  <View style={styles.resHeader}>
                    <Text style={styles.resTime}>{res.time}</Text>
                    <View style={[
                      styles.statusBadge, 
                      res.status === 'confirmed' ? styles.statusConfirmed : styles.statusPending
                    ]}>
                      <Text style={styles.statusText}>
                        {t(`profile.status_${res.status}`).toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.resDetails}>
                    <View style={styles.detailItem}>
                      <Ionicons name="people-outline" size={14} color="rgba(255,255,255,0.4)" />
                      <Text style={styles.detailText}>{res.guests} Guests</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="chevron-forward" size={14} color={Colors.primary} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyWrap}>
            <Ionicons name="journal-outline" size={64} color="rgba(255,255,255,0.1)" />
            <Text style={styles.emptyText}>{t('profile.no_reservations_title')}</Text>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 27,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  promoCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  promoGradient: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoInfo: {
    flex: 1,
  },
  promoTitle: {
    ...Typography.h3,
    color: Colors.background,
    fontSize: 20,
  },
  promoSubtitle: {
    color: 'rgba(5, 59, 64, 0.7)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  promoIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  resCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  resDateColumn: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resMonth: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
  },
  resDay: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFF',
  },
  resInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  resHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resTime: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusConfirmed: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  statusPending: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
  },
  resDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 15,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '700',
  }
});
