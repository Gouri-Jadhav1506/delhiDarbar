import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

/**
 * Bottom Tab Navigator — Delhi Darbar Super App
 *
 * Tab 1: Skyline     → Restaurant info & blog  (blue theme  #0284c7)
 * Tab 2: Spice n Blish → Product catalog & inquiry (rose theme #e11d48)
 */

const SKYLINE_BLUE = '#0284c7';
const SPICE_ROSE = '#e11d48';
const TAB_BAR_BG = '#0F2727';          // Dark-Cyan-Green
const TAB_INACTIVE = '#888888';         // Gray

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BG,
          borderTopColor: '#1B3030',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarInactiveTintColor: TAB_INACTIVE,
      }}
    >
      {/* ── Tab 1: Skyline ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Skyline',
          tabBarActiveTintColor: SKYLINE_BLUE,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="house.fill"
              color={focused ? SKYLINE_BLUE : color}
            />
          ),
        }}
      />

      {/* ── Tab 2: Spice n Blish ── */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Spice n Blish',
          tabBarActiveTintColor: SPICE_ROSE,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="sparkles"
              color={focused ? SPICE_ROSE : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
