import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';

// Generator for next 14 days
const getNextDays = (count: number, langCode: string) => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    
    // Formatting based on language
    const locale = langCode === 'fr' ? 'fr-FR' : 'en-US';
    const dayName = nextDate.toLocaleDateString(locale, { weekday: 'short' });
    const dayNumber = nextDate.getDate();
    const month = nextDate.toLocaleDateString(locale, { month: 'short' });
    
    // Use deterministic date string so IDs don't change on every render due to milliseconds
    const id = nextDate.toISOString().split('T')[0];
    
    days.push({
      id,
      dayName,
      dayNumber,
      month,
      fullDate: nextDate,
    });
  }
  return days;
};

const TIME_SLOTS = [
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
];

const PREFERENCES = ['Indoor', 'Outdoor', 'Window Seat', 'Quiet Area', 'High Chair'];

export default function BookTableScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t, i18n } = useTranslation();
  const { addBooking, modifyBooking, bookings } = useBooking();
  const { isAuthenticated } = useAuth();
  
  const existingId = params.bookingId as string | undefined;
  const existingBooking = existingId ? bookings.find(b => b.id === existingId) : undefined;
  
  const dates = getNextDays(14, i18n.language);
  const [selectedDate, setSelectedDate] = useState(existingBooking?.date || dates[0].id);
  const [selectedTime, setSelectedTime] = useState(existingBooking?.time || t('bookTable.now', 'Now'));
  const [guests, setGuests] = useState(existingBooking?.guests || 2);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(existingBooking?.preferences || []);

  const togglePreference = (pref: string) => {
    if (selectedPreferences.includes(pref)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== pref));
    } else {
      setSelectedPreferences([...selectedPreferences, pref]);
    }
  };

  const handleBooking = () => {
    let bookingId = existingId;
    if (existingId) {
      modifyBooking(existingId, {
        date: selectedDate,
        time: selectedTime,
        guests,
        preferences: selectedPreferences
      });
    } else {
      const newBooking = addBooking({
        date: selectedDate,
        time: selectedTime,
        guests,
        preferences: selectedPreferences
      });
      bookingId = newBooking.id;
    }
    
    // Require login after confirming table booking, if not already logged in
    if (!isAuthenticated) {
      router.push('/ecommerce/login?returnUrl=/restaurant/menu' as any);
    } else {
      router.push('/restaurant/menu');
    }
  };

  const isValid = selectedDate && selectedTime && guests > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FEA116" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('bookTable.header', 'Book a Table')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Number of Guests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('bookTable.guests', 'Number of Guests')}</Text>
          <View style={styles.guestSelector}>
            <TouchableOpacity 
              style={[styles.guestBtn, guests <= 1 && styles.guestBtnDisabled]} 
              onPress={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              <Ionicons name="remove" size={20} color={guests <= 1 ? 'rgba(255,255,255,0.2)' : '#FEA116'} />
            </TouchableOpacity>
            <View style={styles.guestCountWrap}>
              <Text style={styles.guestCount}>{guests}</Text>
              <Text style={styles.guestLabel}>{guests === 1 ? t('bookTable.person', 'Person') : t('bookTable.people', 'People')}</Text>
            </View>
            <TouchableOpacity 
              style={[styles.guestBtn, guests >= 20 && styles.guestBtnDisabled]} 
              onPress={() => setGuests(Math.min(20, guests + 1))}
              disabled={guests >= 20}
            >
              <Ionicons name="add" size={20} color={guests >= 20 ? 'rgba(255,255,255,0.2)' : '#FEA116'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('bookTable.selectDate', 'Select Date')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
            {dates.map((date, index) => {
              const isSelected = selectedDate === date.id;
              return (
                <TouchableOpacity 
                  key={index}
                  style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                  onPress={() => setSelectedDate(date.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dayName, isSelected && styles.textSelected]}>{date.dayName}</Text>
                  <Text style={[styles.dayNumber, isSelected && styles.textSelected]}>{date.dayNumber}</Text>
                  <Text style={[styles.monthName, isSelected && styles.textSelected]}>{date.month}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('bookTable.selectTime', 'Select Time')}</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time, index) => {
              const isSelected = selectedTime === time;
              return (
                <TouchableOpacity 
                  key={index}
                  style={[styles.timeBtn, isSelected && styles.timeBtnSelected]}
                  onPress={() => setSelectedTime(time)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.timeText, isSelected && styles.textSelected]}>{time}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('bookTable.preferences', 'Table Preference (Optional)')}</Text>
          <View style={styles.prefGrid}>
            {PREFERENCES.map((pref, index) => {
              const isSelected = selectedPreferences.includes(pref);
              return (
                <TouchableOpacity 
                  key={index}
                  style={[styles.prefBtn, isSelected && styles.prefBtnSelected]}
                  onPress={() => togglePreference(pref)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.prefText, isSelected && styles.textSelected]}>
                    {t(`bookTable.pref_${pref.replace(/ /g, '')}`, pref)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[styles.bookBtn, !isValid && styles.bookBtnDisabled]}
          activeOpacity={0.85}
          disabled={!isValid}
          onPress={handleBooking}
        >
          <Text style={styles.bookBtnText}>
            {existingId ? t('bookTable.update', 'Update Reservation') : t('bookTable.confirm', 'Confirm & View Menu')}
          </Text>
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
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100, // room for bottom bar
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  
  // Guests
  guestSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  guestBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestBtnDisabled: {
    backgroundColor: 'transparent',
  },
  guestCountWrap: {
    alignItems: 'center',
  },
  guestCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  guestLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },

  // Dates
  dateScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  dateCard: {
    width: 72,
    height: 90,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  dateCardSelected: {
    backgroundColor: '#FEA116',
    borderColor: '#FEA116',
  },
  dayName: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dayNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  monthName: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  textSelected: {
    color: '#042D31',
  },

  // Times
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  timeBtnSelected: {
    backgroundColor: '#FEA116',
    borderColor: '#FEA116',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },

  // Preferences
  prefGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  prefBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  prefBtnSelected: {
    backgroundColor: '#FEA116',
    borderColor: '#FEA116',
  },
  prefText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#042D31',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  bookBtn: {
    height: 56,
    backgroundColor: '#FEA116',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  bookBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowOpacity: 0,
    elevation: 0,
  },
  bookBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#042D31',
  },
});
