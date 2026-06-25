import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Root layout — wraps the entire app in a theme provider.
 * The tab navigator lives inside (tabs)/_layout.tsx.
 * The InquiryModal is registered as a modal route here.
 */

// Customized dark theme matching our Deep-Teal brand
const DelhiDarbarDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#FFD84D',       // Amber / Gold
    background: '#102B2A',    // Deep-Teal
    card: '#0F2727',          // Dark-Cyan-Green
    text: '#ffffff',
    border: '#1B3030',        // Cyan
    notification: '#e11d48',  // Spice Rose
  },
};

const DelhiDarbarLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#102B2A',
    background: '#ffffff',
    card: '#f8f9fa',
    text: '#102B2A',
    border: '#D9D9D9',
    notification: '#e11d48',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DelhiDarbarDark : DelhiDarbarLight}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="inquiry-modal"
          options={{
            presentation: 'modal',
            title: 'Enquire Now',
            headerStyle: { backgroundColor: '#102B2A' },
            headerTintColor: '#FFD84D',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
