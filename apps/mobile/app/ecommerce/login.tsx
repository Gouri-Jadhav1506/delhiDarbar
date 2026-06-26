import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { returnUrl } = useLocalSearchParams();
  const { login } = useAuth();
  
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOTP = () => {
    if (phone.length >= 7) {
      setStep('otp');
    }
  };

  const handleVerify = async () => {
    if (otp.length > 3) {
      await login(phone, 'Guest');
      if (returnUrl && typeof returnUrl === 'string') {
        router.replace(returnUrl as any);
      } else {
        router.back();
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Top accent bar */}
      <View style={styles.topAccent} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Ionicons name="diamond" size={40} color="#042D31" />
            </View>
            <Text style={styles.brandTitle}>{t('restaurant.brand', 'SKYLINE').toUpperCase()}</Text>
            <Text style={styles.title}>{t('login.welcome', 'Welcome Back')}</Text>
            <View style={styles.ornamentRow}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentText}>{t('login.subtitle', 'LOGIN / SIGNUP')}</Text>
              <View style={styles.ornamentLine} />
            </View>
          </View>

          {/* Form */}
          {step === 'phone' ? (
            <View style={styles.form}>
              <Text style={styles.label}>{t('login.phoneLabel', 'PHONE NUMBER')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={18} color="rgba(255,255,255,0.3)" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="+1 (xxx) xxx-xxxx"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  autoFocus
                />
              </View>

              <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleSendOTP}>
                <Text style={styles.primaryBtnText}>{t('login.sendOtp', 'SEND OTP')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>{t('login.otpLabel', 'ENTER 4-DIGIT OTP')}</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="keypad-outline" size={18} color="rgba(255,255,255,0.3)" style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.otpInput]}
                  placeholder="••••"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  maxLength={4}
                  autoFocus
                />
              </View>

              <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleVerify}>
                <Text style={styles.primaryBtnText}>{t('login.verify', 'VERIFY & PROCEED')}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.reshowBtn} onPress={() => setStep('phone')}>
                <Text style={styles.reshowText}>{t('login.changePhone', 'Change Phone Number')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t('login.orText', 'OR CONTINUE AS GUEST')}</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.footerLink}>{t('login.skip', 'Skip for now')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FEA116',
    zIndex: 10,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 36,
  },
  header: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 48,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FEA116',
    letterSpacing: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  ornamentLine: {
    width: 24,
    height: 1.5,
    backgroundColor: '#FEA116',
  },
  ornamentText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FEA116',
    letterSpacing: 2,
  },
  form: {
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 1.5,
    marginBottom: 4,
    marginTop: 8,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    height: 56,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: '100%',
    letterSpacing: 1,
  },
  otpInput: {
    letterSpacing: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  primaryBtn: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginTop: 10,
  },
  primaryBtnText: {
    color: '#042D31',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 2,
  },
  reshowBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  reshowText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 40,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 2,
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 10,
  },
  footerLink: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
