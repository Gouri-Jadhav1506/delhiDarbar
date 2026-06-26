import { Stack } from 'expo-router';

export default function RestaurantLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="order-type" />
      <Stack.Screen name="book-table" />
      <Stack.Screen name="booking-success" />
      <Stack.Screen name="my-bookings" />
      <Stack.Screen name="booking/[id]" />
      <Stack.Screen name="menu" />
      <Stack.Screen 
        name="customize" 
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }} 
      />
    </Stack>
  );
}
