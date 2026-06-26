import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions,
  Linking,
  Platform,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { RESERVATIONS } from '@/constants/mockData';
import { useAuth } from '@/contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function ReservationDetailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { userName, phoneNumber } = useAuth();
  
  const reservation = RESERVATIONS.find(r => r.id === id);

  if (!reservation) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Reservation not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.primary, marginTop: 20 }}>{t('common.back')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getStatusColor = () => {
    switch (reservation.status) {
      case 'Confirmed': return '#4CAF50';
      case 'Pending': return Colors.primary;
      case 'Completed': return 'rgba(255,255,255,0.4)';
      default: return Colors.primary;
    }
  };

  const getStatusIcon = () => {
    switch (reservation.status) {
      case 'Confirmed': return 'checkmark-circle';
      case 'Pending': return 'time-outline';
      case 'Completed': return 'calendar-outline';
      default: return 'help-circle-outline';
    }
  };

  const handleModify = () => {
    const message = `💁‍♂️ *${t('profile.modify_booking')}* 💁‍♂️\n\n` +
      `🆔 ID: ${reservation.id}\n` +
      `👤 ${t('cart.auth.your_name_label')}: ${userName || 'Guest'}\n` +
      `📅 ${t('profile.label_date')}: ${reservation.date}\n` +
      `⏰ ${t('profile.label_time_slot')}: ${reservation.time}\n` +
      `👥 ${t('profile.num_guests')}: ${reservation.guests}\n\n` +
      `I would like to modify my booking.`;

    const businessPhone = '919000000000';
    const url = `whatsapp://send?phone=${businessPhone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(`https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`);
      }
    });
  };

  const handleCancel = () => {
    Alert.alert(
      t('profile.cancel_conf_title'),
      t('profile.cancel_conf_msg'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { 
          text: t('profile.cancel_booking'), 
          style: 'destructive',
          onPress: () => {
            const message = `❌ *${t('profile.cancel_booking')}* ❌\n\n` +
              `🆔 ID: ${reservation.id}\n` +
              `👤 Name: ${userName || 'Guest'}\n` +
              `📅 Date: ${reservation.date}\n` +
              `⏰ Time: ${reservation.time}\n\n` +
              `Please cancel this reservation.`;

            const businessPhone = '919000000000';
            const url = `whatsapp://send?phone=${businessPhone}&text=${encodeURIComponent(message)}`;
            Linking.openURL(url);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <SafeAreaView style={styles.navBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <BlurView intensity={30} tint="dark" style={styles.blurBtn}>
                <Ionicons name="chevron-back" size={24} color="#FFF" />
              </BlurView>
            </TouchableOpacity>
          </SafeAreaView>

          <View style={styles.statusSection}>
            <View style={[styles.iconContainer, { backgroundColor: `${getStatusColor()}20` }]}>
              <Ionicons name={getStatusIcon()} size={48} color={getStatusColor()} />
            </View>
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {reservation.status === 'Confirmed' ? t('profile.status_confirmed_long').toUpperCase() : 
               reservation.status === 'Pending' ? t('profile.status_pending').toUpperCase() : 
               t('profile.status_completed').toUpperCase()}
            </Text>
            <Text style={styles.reservationId}>ID: {reservation.id}</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>{t('profile.label_date').toUpperCase()}</Text>
              <Text style={styles.gridValue}>{reservation.date.split(',')[1]?.trim() || reservation.date}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>{t('profile.label_time_slot').toUpperCase()}</Text>
              <Text style={styles.gridValue}>{reservation.time}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>{t('profile.num_guests').toUpperCase()}</Text>
              <Text style={styles.gridValue}>{reservation.guests} Pax</Text>
            </View>
          </View>
        </View>

        {/* Requests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.special_requests_label')}</Text>
          <View style={styles.requestBox}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color={Colors.primary} style={{ marginTop: 2 }} />
            <Text style={styles.requestText}>
              {reservation.specialRequests || t('profile.no_requests')}
            </Text>
          </View>
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <LinearGradient
          colors={['transparent', Colors.background]}
          style={styles.footerGradient}
          pointerEvents="none"
        />
        
        {reservation.status !== 'Completed' && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.modifyBtn} onPress={handleModify}>
              <LinearGradient
                colors={[Colors.primary, '#FEA42B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.btnGradient}
              >
                <Ionicons name="logo-whatsapp" size={20} color={Colors.background} />
                <Text style={styles.btnText}>{t('profile.modify_booking')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>{t('profile.cancel_booking')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    height: 380,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  blurBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusSection: {
    alignItems: 'center',
    gap: 15,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  reservationId: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsCard: {
    marginHorizontal: 25,
    backgroundColor: Colors.surface,
    borderRadius: 32,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginTop: -30,
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  gridLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
    opacity: 0.8,
  },
  gridValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  section: {
    paddingHorizontal: 25,
    marginTop: 40,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  requestBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: 20,
    gap: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  requestText: {
    flex: 1,
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 100,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
  },
  footerGradient: {
    position: 'absolute',
    top: -100,
    left: 0,
    right: 0,
    height: 200,
  },
  actionContainer: {
    gap: 15,
  },
  modifyBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  btnGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    gap: 12,
  },
  btnText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  cancelBtn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
  },
});
