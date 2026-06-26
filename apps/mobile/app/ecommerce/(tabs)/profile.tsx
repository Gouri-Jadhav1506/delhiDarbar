import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, phoneNumber, logout } = useAuth();
  
  // Mock states for toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    type = 'link', 
    value, 
    onToggle, 
    onPress,
    color = '#fff'
  }: { 
    icon: keyof typeof Ionicons.glyphMap, 
    title: string, 
    subtitle?: string,
    type?: 'link' | 'toggle' | 'button',
    value?: boolean,
    onToggle?: (val: boolean) => void,
    onPress?: () => void,
    color?: string
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      activeOpacity={type === 'link' || type === 'button' ? 0.7 : 1}
      onPress={type === 'toggle' ? () => onToggle?.(!value) : onPress}
    >
      <View style={styles.settingIconWrap}>
        <Ionicons name={icon} size={20} color={color === '#fff' ? '#FEA116' : color} />
      </View>
      <View style={styles.settingTextContent}>
        <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      
      {type === 'link' && (
        <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.3)" />
      )}
      
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: 'rgba(255,255,255,0.1)', true: '#FEA116' }}
          thumbColor={Platform.OS === 'ios' ? '#fff' : value ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="rgba(255,255,255,0.1)"
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Profile Section */}
      <View style={styles.profileHeader}>
        <View style={styles.profileIconWrap}>
          <Text style={styles.profileInitials}>{isAuthenticated ? t('profile.initials', 'JD') : t('profile.guestInitials', 'G')}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{isAuthenticated ? t('profile.name', 'Jane Doe') : t('profile.guestName', 'Guest')}</Text>
          <Text style={styles.profileEmail}>{isAuthenticated ? phoneNumber : t('profile.guestSubtitle', 'Not logged in')}</Text>
        </View>
        {isAuthenticated && (
          <TouchableOpacity style={styles.editProfileBtn}>
            <Ionicons name="pencil" size={16} color="#042D31" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Account Settings */}
        {renderSectionHeader(t('profile.accountSettings', 'Account Settings'))}
        <View style={styles.sectionCard}>
          {renderSettingItem({ icon: 'person-outline', title: t('profile.personalInfo', 'Personal Information') })}
        </View>

        {/* App Preferences */}
        {renderSectionHeader(t('profile.appPreferences', 'App Preferences'))}
        <View style={styles.sectionCard}>
          {renderSettingItem({ 
            icon: 'notifications-outline', 
            title: t('profile.pushNotifications', 'Push Notifications'), 
            type: 'toggle',
            value: notificationsEnabled,
            onToggle: setNotificationsEnabled
          })}
          <View style={styles.divider} />
          {renderSettingItem({ 
            icon: 'moon-outline', 
            title: t('profile.darkMode', 'Dark Mode'), 
            type: 'toggle',
            value: darkModeEnabled,
            onToggle: setDarkModeEnabled
          })}
          <View style={styles.divider} />
          {renderSettingItem({ 
            icon: 'language-outline', 
            title: t('settings.language', 'Language'), 
            subtitle: i18n.language === 'fr' ? 'Français' : 'English',
            type: 'link',
            onPress: () => router.push('/language-selection' as any)
          })}
        </View>

        {/* Privacy & Security */}
        {renderSectionHeader(t('profile.privacySecurity', 'Privacy & Security'))}
        <View style={styles.sectionCard}>
          {renderSettingItem({ icon: 'lock-closed-outline', title: t('profile.changePassword', 'Change Password') })}
          <View style={styles.divider} />
          {renderSettingItem({ 
            icon: 'finger-print-outline', 
            title: t('profile.biometricLogin', 'Biometric Login'), 
            type: 'toggle',
            value: biometricsEnabled,
            onToggle: setBiometricsEnabled
          })}
        </View>

        {/* Help & Support */}
        {renderSectionHeader(t('profile.helpSupport', 'Help & Support'))}
        <View style={styles.sectionCard}>
          {renderSettingItem({ 
            icon: 'restaurant-outline', 
            title: t('profile.restaurantBookings', 'Restaurant Bookings'),
            type: 'link',
            onPress: () => router.push('/restaurant/my-bookings' as any)
          })}
          <View style={styles.divider} />
          {renderSettingItem({ icon: 'help-circle-outline', title: t('profile.faq', 'FAQ & Help Center') })}
          <View style={styles.divider} />
          {renderSettingItem({ 
            icon: 'document-text-outline', 
            title: t('profile.disclaimer', 'Disclaimer'),
            type: 'link',
            onPress: () => router.push('/ecommerce/disclaimer' as any)
          })}
        </View>

        {/* Logout */}
        <View style={[styles.sectionCard, styles.logoutCard]}>
          {isAuthenticated ? renderSettingItem({ 
            icon: 'log-out-outline', 
            title: t('profile.logOut', 'Log Out'), 
            type: 'button',
            color: '#F06595',
            onPress: () => logout()
          }) : renderSettingItem({ 
            icon: 'log-in-outline', 
            title: t('profile.logIn', 'Log In / Sign Up'), 
            type: 'button',
            color: '#FEA116',
            onPress: () => router.push('/ecommerce/login')
          })}
        </View>
        
        <Text style={styles.versionText}>{t('profile.appVersion', 'App Version 1.0.0')}</Text>
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
  
  // Profile Header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 24 : 64,
    paddingBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  profileIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(254, 161, 22, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.4)',
  },
  profileInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FEA116',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  editProfileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // List Sections
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
    marginTop: 20,
  },
  sectionCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  logoutCard: {
    marginTop: 30,
    borderColor: 'rgba(240, 101, 149, 0.2)',
    backgroundColor: 'rgba(240, 101, 149, 0.05)',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  settingTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  settingSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginLeft: 66, // Aligns with text content (16 padding + 36 icon + 14 margin)
  },
  versionText: {
    textAlign: 'center',
    marginTop: 32,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 13,
  },
});
