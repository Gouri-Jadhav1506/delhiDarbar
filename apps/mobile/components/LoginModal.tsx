import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Animated, { 
  FadeIn, 
  FadeInDown 
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedPressable from './AnimatedPressable';

const { width } = Dimensions.get('window');

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ visible, onClose, onSuccess }: LoginModalProps) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!visible) {
      setStep('phone');
      setPhone('');
      setOtp('');
    }
  }, [visible]);

  const handleSendOTP = () => {
    if (phone.length >= 7) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleVerify = async () => {
    if (otp.length === 4) {
      setIsLoading(true);
      try {
        await login(phone, 'Guest');
        setIsLoading(false);
        onSuccess();
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View entering={FadeIn} style={StyleSheet.absoluteFill}>
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            activeOpacity={1} 
            onPress={onClose} 
          >
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
        </Animated.View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <Animated.View 
            entering={FadeIn.duration(200)} 
            style={styles.modalCard}
          >
            <BlurView intensity={80} tint="dark" style={styles.cardBlur}>
              <View style={styles.header}>
                <View style={styles.handle} />
                <Text style={styles.title}>{t('booking.verify_title')}</Text>
                <Text style={styles.subtitle}>{t('booking.verify_subtitle')}</Text>
              </View>

              {step === 'phone' ? (
                <Animated.View entering={FadeInDown} style={styles.form}>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="call-outline" size={20} color={Colors.primary} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder="+1 (xxx) xxx-xxxx"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                      autoFocus
                    />
                  </View>
                  <AnimatedPressable 
                    style={[styles.primaryBtn, phone.length < 7 && styles.btnDisabled]} 
                    disabled={phone.length < 7 || isLoading}
                    onPress={handleSendOTP}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={Colors.background} />
                    ) : (
                      <Text style={styles.btnText}>{t('login.sendOtp').toUpperCase()}</Text>
                    )}
                  </AnimatedPressable>
                </Animated.View>
              ) : (
                <Animated.View entering={FadeInDown} style={styles.form}>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="keypad-outline" size={20} color={Colors.primary} style={styles.icon} />
                    <TextInput
                      style={styles.input}
                      placeholder="••••"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="number-pad"
                      maxLength={4}
                      value={otp}
                      onChangeText={setOtp}
                      autoFocus
                    />
                  </View>
                  <AnimatedPressable 
                    style={[styles.primaryBtn, otp.length < 4 && styles.btnDisabled]} 
                    disabled={otp.length < 4 || isLoading}
                    onPress={handleVerify}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={Colors.background} />
                    ) : (
                      <Text style={styles.btnText}>{t('login.verify').toUpperCase()}</Text>
                    )}
                  </AnimatedPressable>
                  <TouchableOpacity onPress={() => setStep('phone')} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Change Phone Number</Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </BlurView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    width: '100%',
  },
  modalCard: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(5, 59, 64, 0.7)',
  },
  cardBlur: {
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    height: 64,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  primaryBtn: {
    height: 64,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  btnDisabled: {
    opacity: 0.5,
    backgroundColor: 'rgba(254, 161, 22, 0.3)',
  },
  btnText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  backBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  backBtnText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    textDecorationLine: 'underline',
  }
});
