/** Skyline Premium - Root Layout */
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import '../src/i18n';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BookingProvider } from '@/contexts/BookingContext';
import { TableProvider } from '@/contexts/TableContext';
import { RestaurantCartProvider } from '@/contexts/RestaurantCartContext';
import { AuthProvider } from '@/contexts/AuthContext';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <TableProvider>
        <BookingProvider>
          <RestaurantCartProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="splash" options={{ headerShown: false }} />
                <Stack.Screen name="language-selection" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="selection" options={{ headerShown: false }} />
              <Stack.Screen name="fulfillment" options={{ headerShown: false }} />
                <Stack.Screen name="premium-splash" options={{ headerShown: false }} />
                <Stack.Screen name="ecommerce" options={{ headerShown: false }} />
                <Stack.Screen name="restaurant" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </RestaurantCartProvider>
        </BookingProvider>
      </TableProvider>
    </AuthProvider>
  );
}
