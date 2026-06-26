import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { setLanguagePreference } from '../src/i18n';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  
  // Initialize with current language if valid, else null
  const initLang = (i18n.language === 'en' || i18n.language === 'fr') ? i18n.language as 'en'|'fr' : null;
  const [selectedLang, setSelectedLang] = useState<'en' | 'fr' | null>(initLang);

  const handleLanguageSelect = (lang: 'en' | 'fr') => {
    setSelectedLang(lang);
    // update i18n immediately so UI translates, but wait to save/navigate until continue
    i18n.changeLanguage(lang);
  };

  const handleContinue = async () => {
    if (selectedLang) {
      await setLanguagePreference(selectedLang);
      router.replace('/selection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topAccent} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconWrap}>
            <Ionicons name="language" size={36} color="#042D31" />
          </View>
          <Text style={styles.title}>{t('language_selection.title', 'Choose Language')}</Text>
          <Text style={styles.subtitle}>{t('language_selection.subtitle', 'Select your preferred language')}</Text>
        </View>

        <View style={styles.optionsWrap}>
          {/* English Option */}
          <TouchableOpacity 
            style={[styles.langCard, selectedLang === 'en' && styles.langCardSelected]}
            activeOpacity={0.8}
            onPress={() => handleLanguageSelect('en')}
          >
            <View style={styles.langLeft}>
              <View style={[styles.radio, selectedLang === 'en' && styles.radioActive]}>
                {selectedLang === 'en' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.langName}>{t('language_selection.english', 'English')}</Text>
            </View>
            <Text style={styles.flag}>🇬🇧</Text>
          </TouchableOpacity>

          {/* French Option */}
          <TouchableOpacity 
            style={[styles.langCard, selectedLang === 'fr' && styles.langCardSelected]}
            activeOpacity={0.8}
            onPress={() => handleLanguageSelect('fr')}
          >
            <View style={styles.langLeft}>
              <View style={[styles.radio, selectedLang === 'fr' && styles.radioActive]}>
                {selectedLang === 'fr' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.langName}>{t('language_selection.french', 'Français')}</Text>
            </View>
            <Text style={styles.flag}>🇫🇷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.continueBtn, !selectedLang && styles.continueBtnDisabled]}
            activeOpacity={0.85}
            disabled={!selectedLang}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>{t('language_selection.continue', 'Continue')}</Text>
            <Ionicons name="arrow-forward" size={20} color={!selectedLang ? 'rgba(255,255,255,0.4)' : '#042D31'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'web' ? 40 : 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  optionsWrap: {
    gap: 16,
  },
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
  },
  langCardSelected: {
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
    borderColor: '#FEA116',
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#FEA116',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FEA116',
  },
  langName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  flag: {
    fontSize: 24,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 10 : 30,
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: '#FEA116',
    borderRadius: 16,
    gap: 8,
    shadowColor: '#FEA116',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  continueBtnDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#042D31',
    letterSpacing: 1,
  }
});
