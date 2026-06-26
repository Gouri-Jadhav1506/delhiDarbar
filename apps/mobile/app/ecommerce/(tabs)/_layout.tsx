import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { useWishlist } from '../../../contexts/WishlistContext';
import { useRetailCart } from '../../../contexts/RetailCartContext';

export default function TabsLayout() {
  const { wishlistCount } = useWishlist();
  const { itemCount } = useRetailCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#042D31',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255,255,255,0.05)',
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
          elevation: 0,
        },
        tabBarActiveTintColor: '#FEA116',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <View pointerEvents="none">
              <Ionicons name={focused ? 'bag' : 'bag-outline'} size={24} color={color} />
              {itemCount > 0 && (
                <View style={[styles.badge, { backgroundColor: '#FEA116' }]}>
                  <Text style={styles.cartBadgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, focused }) => (
            <View pointerEvents="none">
              <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color} />
              {wishlistCount > 0 && (
                <View style={[styles.badge, { backgroundColor: '#F06595' }]}>
                  <Text style={styles.badgeText}>{wishlistCount > 99 ? '99+' : wishlistCount}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#042D31',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
  },
  cartBadgeText: {
    color: '#042D31',
    fontSize: 9,
    fontWeight: '800',
  },
});

