import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform,
  StatusBar,
  SafeAreaView,
  Linking
} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import Animated, { 
  FadeInDown, 
  FadeInRight,
  FadeOutLeft,
  Layout,
  SlideInRight
} from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedPressable from '@/components/AnimatedPressable';
import LoginModal from '@/components/LoginModal';

const { width, height } = Dimensions.get('window');

// Mock data for time slots
const TIME_SLOTS = [
  { id: '1', time: '18:00', label: 'Evening Start' },
  { id: '2', time: '18:30', label: 'Sunset Dinner' },
  { id: '3', time: '19:00', label: 'Prime Time', isPrime: true },
  { id: '4', time: '19:30', label: 'Prime Time', isPrime: true },
  { id: '5', time: '20:00', label: 'Peak Hour', isPrime: true },
  { id: '6', time: '20:30', label: 'Peak Hour', isPrime: true },
  { id: '7', time: '21:00', label: 'Dinner Special', isPrime: true },
  { id: '8', time: '21:30', label: 'Late Night' },
  { id: '9', time: '22:00', label: 'Late Night' },
];

const SEATING_PREFERENCES = [
  { id: 'rooftop', icon: 'cloud-outline', label: 'Rooftop Lounge' },
  { id: 'lounge', icon: 'musical-notes-outline', label: 'Social Lounge' },
  { id: 'vip', icon: 'diamond-outline', label: 'VIP Booth' },
];

export default function NewReservationScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeating, setSelectedSeating] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  // Generate next 14 days
  const dates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      list.push({
        full: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return list;
  }, []);

  const perfectFor = useMemo(() => {
    if (guests === 2) return t('booking.perfect_for.romantic');
    if (guests >= 6) return t('booking.perfect_for.party');
    if (guests >= 4) return t('booking.perfect_for.group');
    return t('booking.perfect_for.casual');
  }, [guests, t]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else if (!isAuthenticated) {
      setShowLogin(true);
    } else {
      handleFinalConfirm();
    }
  };

  const handleFinalConfirm = () => {
    const message = t('booking.whatsapp_msg', {
      guests,
      date: selectedDate,
      time: selectedTime,
      seating: selectedSeating
    });
    const url = `whatsapp://send?phone=919833534575&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      // Fallback
      Linking.openURL(`https://wa.me/919833534575?text=${encodeURIComponent(message)}`);
    });
  };

  const canProceed = () => {
    if (step === 1) return !!selectedDate;
    if (step === 2) return !!selectedTime;
    if (step === 3) return !!selectedSeating;
    return false;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => step > 1 ? setStep(step - 1) : router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>{t('booking.title')}</Text>
            <Text style={styles.headerSubtitle}>{t('booking.subtitle')}</Text>
          </View>
        </View>

        {/* Multi-Step Indicator */}
        <View style={styles.stepIndicator}>
          {[1, 2, 3].map(s => (
            <View key={s} style={[styles.stepDot, step >= s && styles.stepDotActive]} />
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {step === 1 && (
            <Animated.View entering={FadeInRight} exiting={FadeOutLeft} style={styles.stepContainer}>
              <Text style={styles.sectionLabel}>{t('booking.select_date').toUpperCase()}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateList}>
                {dates.map((d, i) => (
                  <TouchableOpacity 
                    key={i} 
                    style={[styles.dateCard, selectedDate === d.full && styles.selectedDate]}
                    onPress={() => setSelectedDate(d.full)}
                  >
                    <Text style={[styles.dateMonth, selectedDate === d.full && styles.selectedDateText]}>{d.month}</Text>
                    <Text style={[styles.dateDay, selectedDate === d.full && styles.selectedDateText]}>{d.dayNum}</Text>
                    <Text style={[styles.dateWeek, selectedDate === d.full && styles.selectedDateText]}>{d.dayName}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View style={styles.guestSection}>
                <Text style={styles.sectionLabel}>{t('booking.select_guests').toUpperCase()}</Text>
                <View style={styles.stepper}>
                  <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={styles.stepAction}>
                    <Ionicons name="remove" size={24} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.guestCount}>{guests}</Text>
                  <TouchableOpacity onPress={() => setGuests(guests + 1)} style={styles.stepAction}>
                    <Ionicons name="add" size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.perfectBadge}>
                  <Ionicons name="sparkles" size={14} color={Colors.primary} />
                  <Text style={styles.perfectText}>{perfectFor}</Text>
                </View>
              </View>
            </Animated.View>
          )}

          {step === 2 && (
            <Animated.View entering={FadeInRight} style={styles.stepContainer}>
              <Text style={styles.sectionLabel}>{t('booking.select_time').toUpperCase()}</Text>
              <View style={styles.timeGrid}>
                {TIME_SLOTS.map(slot => (
                  <TouchableOpacity 
                    key={slot.id} 
                    style={[
                      styles.timeSlot, 
                      selectedTime === slot.time && styles.selectedTimeSlot,
                      slot.isPrime && styles.primeSlot
                    ]}
                    onPress={() => setSelectedTime(slot.time)}
                  >
                    <Text style={[styles.slotText, selectedTime === slot.time && styles.selectedSlotText]}>{slot.time}</Text>
                    {slot.isPrime && <Text style={styles.primeLabel}>{t('booking.slots.dinner')}</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          {step === 3 && (
            <Animated.View entering={FadeInRight} style={styles.stepContainer}>
              <Text style={styles.sectionLabel}>{t('booking.choose_vibe').toUpperCase()}</Text>
              <View style={styles.seatingList}>
                {SEATING_PREFERENCES.map(pref => (
                  <TouchableOpacity 
                    key={pref.id}
                    style={[styles.seatingCard, selectedSeating === pref.id && styles.selectedSeating]}
                    onPress={() => setSelectedSeating(pref.id)}
                  >
                    <View style={styles.seatingIconWrap}>
                      <Ionicons name={pref.icon as any} size={24} color={selectedSeating === pref.id ? Colors.background : Colors.primary} />
                    </View>
                    <Text style={[styles.seatingLabel, selectedSeating === pref.id && styles.selectedSeatingLabel]}>{pref.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Summary Preview */}
              <View style={styles.voucherPreview}>
                <BlurView intensity={30} tint="dark" style={styles.voucherBlur}>
                  <Text style={styles.voucherTitle}>{t('booking.whatsapp_preview')}</Text>
                  <View style={styles.voucherLine} />
                  <View style={styles.voucherDetails}>
                    <View style={styles.voucherItem}>
                      <Ionicons name="calendar-outline" size={16} color="rgba(255,255,255,0.4)" />
                      <Text style={styles.voucherValue}>{selectedDate}</Text>
                    </View>
                    <View style={styles.voucherItem}>
                      <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.4)" />
                      <Text style={styles.voucherValue}>{selectedTime}</Text>
                    </View>
                    <View style={styles.voucherItem}>
                      <Ionicons name="people-outline" size={16} color="rgba(255,255,255,0.4)" />
                      <Text style={styles.voucherValue}>{guests} Guests</Text>
                    </View>
                  </View>
                </BlurView>
              </View>
            </Animated.View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.confirmBtn, !canProceed() && styles.btnDisabled]}
            disabled={!canProceed()}
            onPress={handleNext}
          >
            <LinearGradient
              colors={[Colors.primary, '#FEA42B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtn}
            >
              <Text style={styles.confirmText}>
                {step === 3 ? t('booking.confirm') : t('common.continue').toUpperCase()}
              </Text>
              <Ionicons name={step === 3 ? 'logo-whatsapp' : 'arrow-forward'} size={20} color={Colors.background} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <LoginModal 
        visible={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSuccess={() => {
          setShowLogin(false);
          handleFinalConfirm();
        }} 
      />
    </View>
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
    paddingTop: 10,
    gap: 15,
    marginBottom: 30,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 22,
  },
  headerSubtitle: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  stepIndicator: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 30,
  },
  stepDot: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
  },
  stepDotActive: {
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  stepContainer: {
    width: '100%',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 20,
  },
  dateList: {
    gap: 12,
    marginBottom: 40,
  },
  dateCard: {
    width: 70,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  selectedDate: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  selectedDateText: {
    color: Colors.background,
  },
  dateMonth: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '800',
  },
  dateDay: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '900',
    marginVertical: 4,
  },
  dateWeek: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  guestSection: {
    marginTop: 20,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  stepAction: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestCount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFF',
  },
  perfectBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    alignSelf: 'center',
  },
  perfectText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeSlot: {
    width: (width - 64) / 3,
    height: 70,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  selectedTimeSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  slotText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  selectedSlotText: {
    color: Colors.background,
  },
  primeSlot: {
    borderColor: 'rgba(254, 161, 22, 0.3)',
  },
  primeLabel: {
    fontSize: 8,
    color: Colors.primary,
    fontWeight: '900',
    marginTop: 4,
  },
  seatingList: {
    gap: 12,
    marginBottom: 30,
  },
  seatingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    borderRadius: 20,
    gap: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  selectedSeating: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  seatingIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatingLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  selectedSeatingLabel: {
    color: Colors.background,
  },
  voucherPreview: {
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
  },
  voucherBlur: {
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  voucherTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    marginBottom: 15,
    textAlign: 'center',
  },
  voucherLine: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 20,
  },
  voucherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voucherItem: {
    alignItems: 'center',
    gap: 6,
  },
  voucherValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  confirmBtn: {
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  gradientBtn: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  confirmText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  }
});
