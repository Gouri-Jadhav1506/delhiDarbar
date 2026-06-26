import { Stack } from 'expo-router';
import { View, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WishlistProvider } from '../../contexts/WishlistContext';
import { RetailCartProvider } from '../../contexts/RetailCartContext';

export default function EcommerceLayout() {

  return (
    <WishlistProvider>
      <RetailCartProvider>
        <View style={{ flex: 1 }}>
            <Stack 
              screenOptions={{ 
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: true,
                gestureDirection: 'horizontal'
              }}
            >
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="product/[id]" />
              <Stack.Screen name="category/[id]" />
              <Stack.Screen name="disclaimer" />
            </Stack>
          </View>
        </RetailCartProvider>
      </WishlistProvider>
  );
}
const styles = StyleSheet.create({});

