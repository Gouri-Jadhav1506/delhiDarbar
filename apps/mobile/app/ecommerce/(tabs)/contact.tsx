import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function ContactScreen() {
  const { t } = useTranslation();

  const handleCall = () => {
    Linking.openURL('tel:+1234567890').catch(() => {
      Alert.alert('Error', 'Unable to open phone dialer');
    });
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@skylinegroup.com').catch(() => {
      Alert.alert('Error', 'Unable to open email client');
    });
  };

  const handleDirections = () => {
    // Replace with a real maps link if available
    Linking.openURL('https://maps.apple.com/?q=Skyline').catch(() => {
      Alert.alert('Error', 'Unable to open maps');
    });
  };

  const handleWhatsApp = () => {
    Linking.openURL('whatsapp://send?phone=+1234567890').catch(() => {
      Alert.alert('Error', 'Unable to open WhatsApp');
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('contact.header', 'Contact Us')}</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro */}
        <View style={styles.introSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="chatbubbles-outline" size={32} color="#042D31" />
          </View>
          <Text style={styles.introTitle}>{t('contact.getInTouch', 'Get in Touch')}</Text>
          <Text style={styles.introText}>
            {t('contact.introText', "We're here to help! Reach out to us for any queries about our products or your orders.")}
          </Text>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionHeader}>{t('contact.quickActions', 'QUICK ACTIONS')}</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
            <Text style={styles.actionTitle}>{t('contact.whatsapp', 'WhatsApp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={handleCall}>
            <Ionicons name="call-outline" size={28} color="#FEA116" />
            <Text style={styles.actionTitle}>{t('contact.callUs', 'Call Us')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={handleEmail}>
            <Ionicons name="mail-outline" size={28} color="#FEA116" />
            <Text style={styles.actionTitle}>{t('contact.emailUs', 'Email Us')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={handleDirections}>
            <Ionicons name="location-outline" size={28} color="#FEA116" />
            <Text style={styles.actionTitle}>{t('contact.directions', 'Directions')}</Text>
          </TouchableOpacity>
        </View>

        {/* Details List */}
        <Text style={styles.sectionHeader}>{t('contact.detailsHeader', 'CONTACT DETAILS')}</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailItem}>
            <View style={styles.detailIconWrap}>
              <Ionicons name="business-outline" size={20} color="#FEA116" />
            </View>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>{t('restaurant.brand', 'Skyline Group')}</Text>
              <Text style={styles.detailValue}>{t('contact.storeName', 'Spice and Bliss Store')}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconWrap}>
              <Ionicons name="navigate-outline" size={20} color="#FEA116" />
            </View>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>{t('contact.addressLabel', 'Address')}</Text>
              <Text style={styles.detailValue}>{t('contact.addressValue', '123 Heritage Street,\nNew Delhi, 110001, India')}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.detailItem}>
            <View style={styles.detailIconWrap}>
              <Ionicons name="time-outline" size={20} color="#FEA116" />
            </View>
            <View style={styles.detailTextContent}>
              <Text style={styles.detailLabel}>{t('contact.hoursLabel', 'Business Hours')}</Text>
              <Text style={styles.detailValue}>{t('contact.hoursValue', 'Mon - Sun: 10:00 AM - 9:00 PM')}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 24 : 54,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 36,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 36,
    gap: 12,
  },
  actionCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
  },
  detailsCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  detailItem: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  detailIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailTextContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.45)',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: 80,
  },
});
