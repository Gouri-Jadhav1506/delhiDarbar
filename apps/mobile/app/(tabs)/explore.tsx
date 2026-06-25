import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

/**
 * Spice n Blish — Product Catalog Tab
 *
 * Displays a catalog of premium spices & artisanal blends.
 * Each product card has an "Enquire Now" button that opens the
 * InquiryModal — NO cart, NO checkout, NO payment.
 */

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  weight: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'biryani-masala',
    name: 'Biryani Masala',
    category: 'Blends',
    description: 'Aromatic blend for the perfect biryani — cumin, cardamom, bay leaf, star anise.',
    weight: '100g | 250g',
  },
  {
    id: 'garam-masala',
    name: 'Garam Masala',
    category: 'Blends',
    description: 'Warm spice blend — cinnamon, cloves, black pepper, nutmeg.',
    weight: '100g | 250g',
  },
  {
    id: 'kashmiri-chilli',
    name: 'Kashmiri Red Chilli',
    category: 'Single Origin',
    description: 'Vivid color, mild heat — perfect for tandoori and gravy preparations.',
    weight: '100g | 500g',
  },
  {
    id: 'turmeric-powder',
    name: 'Lakadong Turmeric',
    category: 'Single Origin',
    description: 'High-curcumin turmeric from Meghalaya — earthy, golden, premium.',
    weight: '100g | 250g',
  },
  {
    id: 'chai-masala',
    name: 'Chai Masala',
    category: 'Blends',
    description: 'Delhi Darbar signature blend — ginger, cardamom, cinnamon, black pepper.',
    weight: '50g | 100g',
  },
  {
    id: 'paneer-tikka-masala',
    name: 'Paneer Tikka Masala',
    category: 'Ready Mixes',
    description: 'Ready-to-use spice mix for restaurant-style paneer tikka at home.',
    weight: '75g',
  },
];

const CATEGORIES = ['All', 'Blends', 'Single Origin', 'Ready Mixes'];

export default function SpiceNBlishScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnquire = (product: Product) => {
    // Navigate to the inquiry modal, passing product info as params
    router.push({
      pathname: '/inquiry-modal',
      params: {
        productId: product.id,
        productName: product.name,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-Deep-Teal">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* ── Header ── */}
        <View className="px-6 pt-8 pb-4">
          <Text className="text-spice-rose font-satisfy text-xl mb-1">
            Explore
          </Text>
          <Text className="text-white text-3xl font-bold mb-2">
            Spice n Blish
          </Text>
          <Text className="text-Gray text-sm leading-5">
            Premium spices, artisanal blends, and curated ingredients — enquire
            to order.
          </Text>
        </View>

        {/* ── Search Bar ── */}
        <View className="px-6 mb-4">
          <View className="bg-Dark-Cyan-Green rounded-xl px-4 py-3 flex-row items-center border border-white/10">
            <Text className="text-Gray mr-2">🔍</Text>
            <TextInput
              className="flex-1 text-white text-base"
              placeholder="Search spices..."
              placeholderTextColor="#888888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* ── Category Chips ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 mb-6"
          contentContainerStyle={{ paddingRight: 24 }}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              className={`mr-3 px-5 py-2 rounded-full border ${
                activeCategory === cat
                  ? 'bg-spice-rose border-spice-rose'
                  : 'bg-transparent border-white/20'
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  activeCategory === cat ? 'text-white' : 'text-Gray'
                }`}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Product Cards ── */}
        <View className="px-6">
          {filteredProducts.length === 0 ? (
            <View className="items-center py-12">
              <Text className="text-Gray text-base">No products found.</Text>
            </View>
          ) : (
            filteredProducts.map((product) => (
              <View
                key={product.id}
                className="bg-Dark-Cyan-Green rounded-2xl p-5 mb-4 border border-white/10"
              >
                {/* Category Badge */}
                <View className="self-start bg-spice-rose/20 rounded-lg px-3 py-1 mb-3">
                  <Text className="text-spice-rose text-xs font-semibold uppercase tracking-wider">
                    {product.category}
                  </Text>
                </View>

                {/* Product Info */}
                <Text className="text-white text-lg font-bold mb-1">
                  {product.name}
                </Text>
                <Text className="text-Gray text-sm leading-5 mb-2">
                  {product.description}
                </Text>
                <Text className="text-white/50 text-xs mb-4">
                  Available: {product.weight}
                </Text>

                {/* Enquire Now CTA */}
                <Pressable
                  onPress={() => handleEnquire(product)}
                  className="bg-spice-rose rounded-xl py-3 items-center active:opacity-80"
                >
                  <Text className="text-white font-bold text-sm uppercase tracking-wider">
                    Enquire Now
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
