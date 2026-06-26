import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../../contexts/BookingContext';

export default function BookingDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const id = params.id as string;
  const { bookings, cancelBooking } = useBooking();

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FEA116" />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>{t('bookingDetail.notFound', 'Booking not found.')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  let displayDate = booking.date;
  try {
    const d = new Date(booking.date);
    displayDate = d.toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {}

  const isActive = booking.status === 'upcoming';
  const isCancelled = booking.status === 'cancelled';

  const handleCancel = () => {
    Alert.alert(
      t('bookingDetail.cancelTitle', 'Cancel Reservation'),
      t('bookingDetail.cancelMsg', 'Are you sure you want to cancel this table booking?'),
      [
        { text: t('bookingDetail.noKeep', 'No, Keep it'), style: 'cancel' },
        { 
          text: t('bookingDetail.yesCancel', 'Yes, Cancel'), 
          style: 'destructive',
          onPress: () => {
            cancelBooking(booking.id);
            router.back();
          }
        }
      ]
    );
  };

  const handleModify = () => {
    router.push({
      pathname: '/restaurant/book-table',
      params: { bookingId: booking.id }
    } as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FEA116" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('bookingDetail.header', 'Booking Details')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.statusWrap}>
          <View style={[styles.statusBadge, isActive ? styles.statusActive : isCancelled ? styles.statusCancelled : styles.statusDone]}>
            <Text style={[styles.statusText, isCancelled && styles.statusTextCancelled]}>{t(`myBookings.status_${booking.status}`, booking.status.toUpperCase())}</Text>
          </View>
          <Text style={styles.bookingId}>{t('bookingDetail.idPrefix', 'ID: #')}{booking.id}</Text>
        </View>

        <Text style={styles.restaurantName}>{t('restaurant.brand', 'Skyline')}</Text>
        <Text style={styles.restaurantAddress}>{t('bookingDetail.address', 'Skyline Group, New Delhi')}</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons name="calendar-outline" size={20} color="#FEA116" />
            </View>
            <View>
              <Text style={styles.label}>{t('common.date', 'Date')}</Text>
              <Text style={styles.value}>{displayDate}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons name="time-outline" size={20} color="#FEA116" />
            </View>
            <View>
              <Text style={styles.label}>{t('common.time', 'Time')}</Text>
              <Text style={styles.value}>{booking.time}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons name="people-outline" size={20} color="#FEA116" />
            </View>
            <View>
              <Text style={styles.label}>{t('common.guests', 'Guests')}</Text>
              <Text style={styles.value}>{booking.guests} {booking.guests === 1 ? t('common.person', 'Person') : t('common.people', 'People')}</Text>
            </View>
          </View>

          {booking.preferences && booking.preferences.length > 0 && (
            <>
              <View style={styles.divider} />
              <View style={styles.row}>
                <View style={styles.iconWrap}>
                  <Ionicons name="star-outline" size={20} color="#FEA116" />
                </View>
                <View>
                  <Text style={styles.label}>{t('bookingDetail.preferences', 'Preferences')}</Text>
                  <Text style={styles.value}>{booking.preferences.map(p => t(`bookTable.pref_${p.replace(/ /g, '')}`, p)).join(', ')}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {isActive && (
          <View style={styles.actionsBox}>
            <TouchableOpacity style={styles.modifyBtn} onPress={handleModify} activeOpacity={0.8}>
              <Ionicons name="pencil-outline" size={20} color="#042D31" />
              <Text style={styles.modifyBtnText}>{t('bookingDetail.modify', 'Modify Booking')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel} activeOpacity={0.8}>
              <Ionicons name="close-circle-outline" size={20} color="#FF4B4B" />
              <Text style={styles.cancelBtnText}>{t('bookingDetail.cancel', 'Cancel Booking')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  content: {
    padding: 24,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
  },
  statusWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusActive: {
    backgroundColor: 'rgba(37, 211, 102, 0.15)',
  },
  statusCancelled: {
    backgroundColor: 'rgba(255, 75, 75, 0.15)',
  },
  statusDone: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#25D366',
    letterSpacing: 0.5,
  },
  statusTextCancelled: {
    color: '#FF4B4B',
  },
  bookingId: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  label: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 16,
    marginLeft: 56,
  },
  actionsBox: {
    gap: 16,
  },
  modifyBtn: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FEA116',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  modifyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#042D31',
  },
  cancelBtn: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 75, 75, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  cancelBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4B4B',
  },
});
