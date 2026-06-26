import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBooking, Booking } from '../../contexts/BookingContext';

export default function MyBookingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { bookings } = useBooking();

  const renderBooking = ({ item }: { item: Booking }) => {
    let displayDate = item.date;
    try {
      const d = new Date(item.date);
      displayDate = d.toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {}

    const isActive = item.status === 'upcoming';
    const isCancelled = item.status === 'cancelled';

    return (
      <TouchableOpacity 
        style={styles.card} 
        activeOpacity={0.8}
        onPress={() => router.push(`/restaurant/booking/${item.id}` as any)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <View style={[styles.statusDot, isActive ? styles.statusActive : isCancelled ? styles.statusCancelled : styles.statusDone]} />
            <Text style={styles.statusText}>{t(`myBookings.status_${item.status}`, item.status.toUpperCase())}</Text>
          </View>
          <Text style={styles.bookingId}>#{item.id}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.restaurantName}>{t('restaurant.brand', 'Skyline')}</Text>
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={16} color="#FEA116" />
              <Text style={styles.detailText}>{displayDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={16} color="#FEA116" />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="people-outline" size={16} color="#FEA116" />
              <Text style={styles.detailText}>{item.guests}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.footerAction}>{t('myBookings.viewDetails', 'View Details')}</Text>
          <Ionicons name="chevron-forward" size={16} color="#FEA116" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FEA116" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('myBookings.header', 'My Bookings')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBooking}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons name="calendar-outline" size={64} color="rgba(255,255,255,0.1)" />
            <Text style={styles.emptyTitle}>{t('myBookings.emptyTitle', 'No Reservations')}</Text>
            <Text style={styles.emptyText}>{t('myBookings.emptyText', "You haven't made any table bookings yet.")}</Text>
            <TouchableOpacity 
              style={styles.emptyBtn} 
              onPress={() => router.push('/restaurant/order-type')}
            >
              <Text style={styles.emptyBtnText}>{t('myBookings.emptyBtn', 'Book a Table')}</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 24,
    flexGrow: 1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusActive: {
    backgroundColor: '#25D366',
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  statusCancelled: {
    backgroundColor: '#FF4B4B',
  },
  statusDone: {
    backgroundColor: '#888888',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bookingId: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  cardBody: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  footerAction: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FEA116',
    marginRight: 4,
  },
  
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  emptyBtnText: {
    color: '#FEA116',
    fontWeight: '600',
    fontSize: 15,
  },
});
