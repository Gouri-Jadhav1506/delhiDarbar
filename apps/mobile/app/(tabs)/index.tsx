import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * Skyline Home — Restaurant showcase tab.
 *
 * Displays the hero, featured dishes, stats counters, and blog teasers.
 * This is the primary informational tab for the Skyline brand.
 */

// ── Static Data (mirroring web) ──
const FEATURED_DISHES = [
  {
    id: '1',
    name: 'Chicken Tikka',
    price: '₹120',
    description: 'Charcoal-roasted chicken, yogurt marinade, signature spices.',
  },
  {
    id: '2',
    name: 'Peri Peri Fries',
    price: '₹160',
    description: 'Crispy fries tossed in spicy peri peri seasoning by Skyline.',
  },
  {
    id: '3',
    name: 'Butter Chicken',
    price: '₹90',
    description: 'Creamy tomato curry with tender chicken and rich spices.',
  },
  {
    id: '4',
    name: 'Paneer Tikka',
    price: '₹320',
    description: 'Grilled cottage cheese, herbs, and Skyline spice blend.',
  },
];

const STATS = [
  { label: 'Happy Customers', value: '5K+' },
  { label: 'Dishes Served', value: '120+' },
  { label: 'Years of Legacy', value: '15+' },
  { label: 'Expert Chefs', value: '8' },
];

export default function SkylineHomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-Deep-Teal">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Hero Section ── */}
        <View className="px-6 pt-8 pb-10">
          <Text className="text-Amber font-satisfy text-xl mb-1">Welcome to</Text>
          <Text className="text-white text-4xl font-bold mb-2">
            Skyline
          </Text>
          <Text className="text-xs uppercase tracking-widest text-Amber/60 mb-4">
            by Delhi Darbar
          </Text>
          <Text className="text-Gray text-base leading-6">
            Rooftop lounge bar & Indian restaurant with panoramic city views,
            signature cocktails, and authentic cuisine.
          </Text>
        </View>

        {/* ── Stats Row ── */}
        <View className="flex-row flex-wrap px-4 mb-8">
          {STATS.map((stat) => (
            <View key={stat.label} className="w-1/2 px-2 mb-4">
              <View className="bg-Dark-Cyan-Green rounded-2xl p-4 items-center border border-white/10">
                <Text className="text-Amber text-2xl font-bold">{stat.value}</Text>
                <Text className="text-Gray text-xs mt-1 uppercase tracking-wider">
                  {stat.label}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Featured Menu ── */}
        <View className="px-6 mb-8">
          <Text className="text-Amber font-satisfy text-lg mb-1">Our Specials</Text>
          <Text className="text-white text-2xl font-bold mb-6">Featured Menu</Text>

          {FEATURED_DISHES.map((dish) => (
            <View
              key={dish.id}
              className="bg-Dark-Cyan-Green rounded-2xl p-5 mb-4 border border-white/10"
            >
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-white text-lg font-semibold flex-1 mr-3">
                  {dish.name}
                </Text>
                <View className="bg-Amber/20 rounded-lg px-3 py-1">
                  <Text className="text-Amber font-bold text-sm">{dish.price}</Text>
                </View>
              </View>
              <Text className="text-Gray text-sm leading-5">{dish.description}</Text>
            </View>
          ))}
        </View>

        {/* ── Contact CTA ── */}
        <View className="px-6 mb-6">
          <View className="bg-Amber rounded-2xl p-6 items-center">
            <Text className="text-Deep-Teal text-xl font-bold mb-2">
              Reserve Your Table
            </Text>
            <Text className="text-Deep-Teal/70 text-center text-sm mb-4">
              Experience the finest rooftop dining in the city
            </Text>
            <Pressable className="bg-Deep-Teal rounded-xl px-8 py-3">
              <Text className="text-Amber font-bold text-base">Book Now</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
