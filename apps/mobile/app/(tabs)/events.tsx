import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Modal,
  Linking,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { EVENTS } from '@/constants/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

type Event = typeof EVENTS[0];

export default function EventsScreen() {
  const { userName, phoneNumber } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [entryCount, setEntryCount] = useState(1);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const handleBookPress = (event: Event) => {
    setSelectedEvent(event);
    setEntryCount(1);
    setIsSummaryVisible(true);
  };

  const handleAddToCalendar = () => {
    Alert.alert(
      t('events.add_to_calendar'),
      t('events.calendar_alert_description', { title: selectedEvent?.title }),
      [{ text: t('common.ok') }]
    );
  };

  const confirmOnWhatsApp = () => {
    if (!selectedEvent) return;

    const message = `🎉 *${t('events.whatsapp_request_title')}* 🎉\n\n` +
      `🔥 *${selectedEvent.title}*\n` +
      `📅 ${t('profile.label_date')}: ${selectedEvent.date}\n` +
      `⏰ ${t('profile.label_time_slot')}: ${selectedEvent.time}\n` +
      `👥 ${t('cart.preview.guests')}: ${entryCount} ${t('events.person_s')}\n\n` +
      `👤 ${t('cart.auth.your_name_label')}: ${userName || 'Guest'}\n` +
      `📞 ${t('cart.auth.phone_placeholder')}: ${phoneNumber || 'N/A'}\n\n` +
      `${t('events.confirm_entry')}!`;

    const businessPhone = '919000000000';
    const url = `whatsapp://send?phone=${businessPhone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`);
      }
    });

    setIsSummaryVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('events.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('events.subtitle')}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {EVENTS.map((event) => (
          <TouchableOpacity 
            key={event.id} 
            activeOpacity={0.9}
            onPress={() => router.push({ pathname: '/(tabs)/event/[id]', params: { id: event.id } })}
          >
            <View style={styles.eventCard}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: event.image }} style={styles.eventImage} contentFit="cover" />
                <View style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{event.day}</Text>
                  <Text style={styles.dateMonth}>{event.month}</Text>
                </View>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.85)']}
                  style={styles.imageGradient}
                />
              </View>

              <View style={styles.eventContent}>
                <View style={styles.rowBetween}>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeText}>{event.category.toUpperCase()}</Text>
                  </View>
                  <View style={styles.djBadge}>
                    <Ionicons name="musical-notes" size={12} color={Colors.primary} />
                    <Text style={styles.djBadgeText}>{event.djName || t('events.headlining')}</Text>
                  </View>
                </View>

                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDesc}>{event.description}</Text>
                
                <View style={styles.infoRow}>
                  <View style={styles.infoItem}>
                    <Ionicons name="time-outline" size={16} color={Colors.primary} />
                    <Text style={styles.infoText}>{event.time}</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Ionicons name="location-outline" size={16} color={Colors.primary} />
                    <Text style={styles.infoText}>Main Stage</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.bookBtn}
                  activeOpacity={0.8}
                  onPress={() => handleBookPress(event)}
                >
                  <LinearGradient
                    colors={[Colors.primary, '#FEA42B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bookGradient}
                  >
                    <Text style={styles.bookText}>{t('events.rsvp_button')}</Text>
                    <Ionicons name="ticket-outline" size={18} color={Colors.background} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.consultantCard}>
          <LinearGradient
            colors={['#063D42', '#042D31']}
            style={styles.consultantGradient}
          >
            <View style={styles.consultantIcon}>
              <Ionicons name="sparkles" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.consultantTitle}>Plan a Private Event?</Text>
            <Text style={styles.consultantDesc}>Host your birthday or corporate event with bespoke lounge service.</Text>
            <TouchableOpacity style={styles.consultantBtn}>
              <Text style={styles.consultantBtnText}>Request Inquiry</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Event Booking Summary Modal */}
      <Modal visible={isSummaryVisible} animationType="fade" transparent>
        <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
          <View style={styles.summaryModal}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalLabel}>{t('events.booking_summary')}</Text>
                <Text style={styles.modalTitle}>{t('events.confirm_entry')}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsSummaryVisible(false)}>
                <Ionicons name="close-circle-outline" size={32} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            </View>

            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Ionicons name="star" size={24} color={Colors.primary} />
                <View style={styles.summaryTextWrap}>
                  <Text style={styles.itemTitle}>{selectedEvent?.title}</Text>
                  <Text style={styles.itemSub}>{selectedEvent?.date} • {selectedEvent?.time}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Entry Quantity Stepper */}
              <View style={[styles.summaryRow, { alignItems: 'center', justifyContent: 'space-between' }]}>
                <View>
                  <Text style={styles.itemTitle}>{t('events.person_s')}</Text>
                  <Text style={styles.itemSub}>{t('events.max_guests')}</Text>
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity 
                    style={styles.stepBtn} 
                    onPress={() => setEntryCount(Math.max(1, entryCount - 1))}
                  >
                    <Ionicons name="remove" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepVal}>{entryCount}</Text>
                  <TouchableOpacity 
                    style={styles.stepBtn} 
                    onPress={() => setEntryCount(Math.min(10, entryCount + 1))}
                  >
                    <Ionicons name="add" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider} />

              <TouchableOpacity style={styles.calendarBtn} onPress={handleAddToCalendar}>
                <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                <Text style={styles.calendarBtnText}>{t('events.add_to_calendar')}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.finalBtn} onPress={confirmOnWhatsApp}>
              <LinearGradient
                colors={[Colors.primary, '#FEA42B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.finalGradient}
              >
                <Text style={styles.finalBtnText}>{t('events.confirm_whatsapp')}</Text>
                <Ionicons name="logo-whatsapp" size={22} color={Colors.background} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsSummaryVisible(false)}>
              <Text style={styles.cancelText}>{t('profile.edit_selection')}</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
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
    paddingVertical: 20,
  },
  headerTitle: {
    ...Typography.h1,
    fontSize: 27,
    color: '#FFF',
  },
  headerSubtitle: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  eventCard: {
    backgroundColor: Colors.surface,
    borderRadius: 26,
    overflow: 'hidden',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  dateBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(254, 161, 22, 0.95)',
    width: 50,
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 5,
  },
  dateDay: {
    color: '#000',
    fontSize: 18,
    fontWeight: '900',
  },
  dateMonth: {
    color: '#000',
    fontSize: 10,
    fontWeight: '800',
    marginTop: -2,
  },
  eventContent: {
    padding: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeBadge: {
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  djBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  djBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    opacity: 0.9,
  },
  typeText: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  eventTitle: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 21,
    letterSpacing: -0.5,
  },
  eventDesc: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  infoText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '600',
  },
  bookBtn: {
    marginTop: 22,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  bookGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  bookText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  consultantCard: {
    borderRadius: 26,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.15)',
  },
  consultantGradient: {
    padding: 30,
    alignItems: 'center',
    gap: 15,
  },
  consultantIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  consultantTitle: {
    ...Typography.h2,
    color: '#FFF',
    textAlign: 'center',
    fontSize: 22,
  },
  consultantDesc: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  consultantBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 5,
  },
  consultantBtnText: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  summaryModal: {
    backgroundColor: Colors.surface,
    borderRadius: 36,
    width: '100%',
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.25)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 4,
  },
  modalTitle: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 26,
  },
  summaryBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 15,
  },
  summaryTextWrap: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  itemSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 18,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 5,
    borderRadius: 14,
  },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepVal: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    minWidth: 20,
    textAlign: 'center',
  },
  calendarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  calendarBtnText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  finalBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  finalGradient: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  finalBtnText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  cancelBtn: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
  },
  cancelText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
