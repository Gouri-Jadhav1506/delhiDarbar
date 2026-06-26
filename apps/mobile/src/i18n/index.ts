import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './translations/en.json';
import fr from './translations/fr.json';

const ASYNC_STORAGE_LANG_KEY = '@app_language';

// Configuration
export const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

// Custom language detector since expo-localization is not strictly required here
// We will initialize i18n and later override it when the app loads async storage.
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: 'en', // Default initial language, but we will override via AsyncStorage before rendering fully
    interpolation: {
      escapeValue: false, // React already safeguards from xss
    },
  });

export const loadLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(ASYNC_STORAGE_LANG_KEY);
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
      await i18n.changeLanguage(savedLanguage);
      return savedLanguage;
    }
  } catch (e) {
    console.warn('Failed to fetch language from storage', e);
  }
  return null; // Means user hasn't selected yet
};

export const setLanguagePreference = async (lang: 'en' | 'fr') => {
  try {
    await AsyncStorage.setItem(ASYNC_STORAGE_LANG_KEY, lang);
    await i18n.changeLanguage(lang);
  } catch (e) {
    console.warn('Failed to save language to storage', e);
  }
};

export default i18n;
