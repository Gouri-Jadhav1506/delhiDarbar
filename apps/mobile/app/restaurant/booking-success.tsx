import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBooking, Booking } from '../../contexts/BookingContext';

export default function BookingSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const { bookings } = useBooking();
  
  const id = params.id as string;
  const booking = bookings.find(b => b.id === id);
  
  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{t('bookingSuccess.saved', 'Booking saved')}</Text>
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.replace('/selection')}>
            <Text style={styles.doneBtnText}>{t('common.backToHome', 'Back to Home')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Format the date if it's available
  let displayDate = t('bookingSuccess.selectedDate', 'Selected Date');
  if (booking.date) {
    try {
      const d = new Date(booking.date);
      displayDate = d.toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch {
      displayDate = booking.date;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIconWrap}>
          <Ionicons name="checkmark" size={60} color="#042D31" />
        </View>
        
        <Text style={styles.title}>{t('bookingSuccess.confirmed', 'Booking Confirmed!')}</Text>
        <Text style={styles.subtitle}>
          {t('bookingSuccess.subtitle', 'Your table at Skyline has been successfully reserved. We look forward to hosting you.')}
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={24} color="#FEA116" />
            <View style={styles.rowText}>
              <Text style={styles.label}>{t('common.date', 'Date')}</Text>
              <Text style={styles.value}>{displayDate}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Ionicons name="time-outline" size={24} color="#FEA116" />
            <View style={styles.rowText}>
              <Text style={styles.label}>{t('common.time', 'Time')}</Text>
              <Text style={styles.value}>{booking.time}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Ionicons name="people-outline" size={24} color="#FEA116" />
            <View style={styles.rowText}>
              <Text style={styles.label}>{t('common.guests', 'Guests')}</Text>
              <Text style={styles.value}>{booking.guests} {booking.guests === 1 ? t('common.person', 'Person') : t('common.people', 'People')}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.viewBtn} 
          activeOpacity={0.85} 
          onPress={() => router.replace('/restaurant/my-bookings' as any)}
        >
          <Text style={styles.viewBtnText}>{t('bookingSuccess.viewBookings', 'View My Bookings')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.doneBtn} 
          activeOpacity={0.85} 
          onPress={() => router.replace('/selection')}
        >
          <Text style={styles.doneBtnText}>{t('common.backToHome', 'Back to Home')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowText: {
    marginLeft: 16,
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
    marginLeft: 40,
  },
  viewBtn: {
    width: '100%',
    height: 56,
    backgroundColor: '#FEA116',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#042D31',
  },
  doneBtn: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  doneBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
