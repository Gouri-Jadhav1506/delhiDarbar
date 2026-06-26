import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = () => {
    console.log('Register:', { fullName, email, password, confirmPassword });
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
          {/* Back */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color="#FEA116" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoWrap}>
              <Ionicons name="diamond" size={40} color="#042D31" />
            </View>
            <Text style={styles.brandTitle}>{t('restaurant.brand', 'SKYLINE').toUpperCase()}</Text>
            <Text style={styles.title}>{t('register.header', 'Create Account')}</Text>
            <View style={styles.ornamentRow}>
              <View style={styles.ornamentLine} />
              <Text style={styles.ornamentText}>{t('register.subtitle', 'JOIN THE FAMILY')}</Text>
              <View style={styles.ornamentLine} />
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>{t('register.nameLabel', 'FULL NAME')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color="rgba(255,255,255,0.3)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('register.namePlace', 'John Doe')}
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <Text style={styles.label}>{t('login.emailLabel', 'EMAIL ADDRESS')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color="rgba(255,255,255,0.3)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={t('login.emailPlace', 'your@email.com')}
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>{t('login.passwordLabel', 'PASSWORD')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color="rgba(255,255,255,0.3)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="rgba(255,255,255,0.3)"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>{t('register.confirmLabel', 'CONFIRM PASSWORD')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="shield-checkmark-outline" size={18} color="rgba(255,255,255,0.3)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
                <Ionicons
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="rgba(255,255,255,0.3)"
                />
              </TouchableOpacity>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleRegister}>
              <Text style={styles.primaryBtnText}>{t('register.submitText', 'CREATE ACCOUNT')}</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('login.orText', 'OR')}</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social */}
            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-google" size={20} color="#FEA116" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-apple" size={20} color="#FEA116" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialBtn}>
                <Ionicons name="logo-facebook" size={20} color="#FEA116" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('register.hasAccount', 'Already have an account? ')}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.footerLink}>{t('register.loginLink', 'Sign In')}</Text>
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
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.2)',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
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
    marginTop: 4,
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
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 4,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#042D31',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  dividerText: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    marginHorizontal: 16,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: 'rgba(254, 161, 22, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.15)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  footerText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
  },
  footerLink: {
    color: '#FEA116',
    fontSize: 14,
    fontWeight: '700',
  },
});
