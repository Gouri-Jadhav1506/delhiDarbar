import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  TextInput, 
  Modal, 
  Dimensions, 
  Platform, 
  Linking, 
  KeyboardAvoidingView 
} from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { useRestaurantCart, CartItem } from '@/contexts/RestaurantCartContext';
import { useAuth } from '@/contexts/AuthContext';
import { RESTAURANT_MENU, MenuItem } from '@/constants/menuItems';
import { generateWhatsAppMessage } from '@/utils/whatsappHelper';
import Animated, { 
  FadeIn, 
  FadeOut, 
  FadeInDown,
  ZoomIn, 
} from 'react-native-reanimated';
import EmptyState from '@/components/EmptyState';

const { width, height } = Dimensions.get('window');

type OrderType = 'delivery' | 'dine-in';

// ─── ADD-ON OPTIONS ───────────────────────────────────────────
const AVAILABLE_ADDONS = [
  { id: 'ao_butter', name: 'Extra Butter', price: 2.00, icon: '🧈' },
  { id: 'ao_cheese', name: 'Extra Cheese', price: 3.00, icon: '🧀' },
  { id: 'ao_raita', name: 'Fresh Raita', price: 2.50, icon: '🥛' },
  { id: 'ao_salad', name: 'Green Salad', price: 2.00, icon: '🥗' },
];

// ─── COMBO DEALS ──────────────────────────────────────────────
const COMBO_DEALS = [
  {
    id: 'combo_1',
    name: 'Royal Feast',
    description: 'Butter Chicken + Naan + Raita',
    originalPrice: 53.00,
    comboPrice: 42.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80',
    items: ['mc_2', 'bd_1'],
    badge: 'SAVE 19%',
  },
  {
    id: 'combo_2',
    name: 'Biryani Special',
    description: 'Chicken Biryani + Raita + Firni',
    originalPrice: 52.50,
    comboPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1563379091339-0ca4b403970b?auto=format&fit=crop&w=400&q=80',
    items: ['br_1', 'ds_2'],
    badge: 'SAVE 24%',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, addToCart } = useRestaurantCart();
  const { isAuthenticated, phoneNumber, userName, login } = useAuth();

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [loginStep, setLoginStep] = useState(1);
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputGuestCount, setInputGuestCount] = useState('2');
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [otpError, setOtpError] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, string[]>>({});

  const subtotal = cartTotal;
  const addonsTotal = useMemo(() => {
    let total = 0;
    Object.entries(selectedAddons).forEach(([cartItemId, addonIds]) => {
      addonIds.forEach(id => {
        const addon = AVAILABLE_ADDONS.find(a => a.id === id);
        if (addon) {
          const cartItem = cart.find(c => c.cartItemId === cartItemId);
          total += addon.price * (cartItem?.quantity || 1);
        }
      });
    });
    return total;
  }, [selectedAddons, cart]);
  const tax = (subtotal + addonsTotal) * 0.18;
  const total = subtotal + addonsTotal + tax;

  // ─── Group cart items by their RESTAURANT_MENU category ─────
  const groupedItems = useMemo(() => {
    const groups: Record<string, CartItem[]> = {};
    cart.forEach(item => {
      const category = RESTAURANT_MENU.find(cat => 
        cat.data.some(d => d.id === item.id)
      );
      const key = category?.title || 'Other';
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });
    return groups;
  }, [cart]);

  // ─── "Pairs well" suggestions ──────────────────────────────
  const suggestions = useMemo(() => {
    const cartIds = cart.map(i => i.id);
    const allItems = RESTAURANT_MENU.flatMap(cat => cat.data);
    
    // Smart pairing: if they have mains, suggest breads/desserts; if starters, suggest mains
    const hasStarters = cart.some(i => RESTAURANT_MENU[0]?.data.some(d => d.id === i.id));
    const hasMains = cart.some(i => RESTAURANT_MENU[1]?.data.some(d => d.id === i.id));
    const hasBiryani = cart.some(i => RESTAURANT_MENU[2]?.data.some(d => d.id === i.id));
    const hasBreads = cart.some(i => RESTAURANT_MENU[3]?.data.some(d => d.id === i.id));
    const hasDesserts = cart.some(i => RESTAURANT_MENU[4]?.data.some(d => d.id === i.id));

    let pairPool: MenuItem[] = [];
    if (hasMains && !hasBreads) pairPool.push(...(RESTAURANT_MENU[3]?.data || []));
    if ((hasMains || hasBiryani) && !hasDesserts) pairPool.push(...(RESTAURANT_MENU[4]?.data || []));
    if (hasStarters && !hasMains) pairPool.push(...(RESTAURANT_MENU[1]?.data || []).slice(0, 2));
    if (!hasStarters && hasMains) pairPool.push(...(RESTAURANT_MENU[0]?.data || []).slice(0, 2));
    
    // Fallback: if pool is empty, pick bestsellers
    if (pairPool.length === 0) {
      pairPool = allItems.filter(i => i.tag && ['Bestseller', 'Popular', 'Signature'].includes(i.tag));
    }

    return pairPool.filter(i => !cartIds.includes(i.id)).slice(0, 4);
  }, [cart]);

  const toggleAddon = (cartItemId: string, addonId: string) => {
    setSelectedAddons(prev => {
      const current = prev[cartItemId] || [];
      if (current.includes(addonId)) {
        return { ...prev, [cartItemId]: current.filter(id => id !== addonId) };
      }
      return { ...prev, [cartItemId]: [...current, addonId] };
    });
  };

  const handleCheckoutPress = () => {
    if (!isAuthenticated) {
      setIsLoginVisible(true);
      setLoginStep(1);
    } else {
      setIsPreviewVisible(true);
    }
  };

  const handlePhoneSubmit = () => {
    if (inputPhone.length >= 10) setLoginStep(2);
  };

  const handleVerifyOtp = () => {
    if (inputOtp === '1234') setLoginStep(3);
    else setOtpError(true);
  };

  const handleCompleteLogin = () => {
    login(inputPhone, inputName || 'Guest User');
    setIsLoginVisible(false);
    setIsPreviewVisible(true);
  };

  const handleSkip = () => {
    login(inputPhone, 'Guest User');
    setIsLoginVisible(false);
    setIsPreviewVisible(true);
  };

  const sendToWhatsApp = () => {
    let orderDetails = orderType === 'delivery' ? `Takeaway Order (Pickup)` : `Dine-in for ${inputGuestCount} guests`;
    if (orderType === 'delivery' && inputAddress) {
      orderDetails += `\n📝 Note: ${inputAddress}`;
    }
    const message = generateWhatsAppMessage(cart, total) + `\n\n📍 ${orderDetails}`;
    const businessPhone = '919000000000'; 
    const url = `whatsapp://send?phone=${businessPhone}&text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url).then(supported => {
      if (supported) Linking.openURL(url);
      else Linking.openURL(`https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`);
      setIsPreviewVisible(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        clearCart();
        router.replace('/(tabs)/menu');
      }, 4000);
    });
  };

  const handleAddSuggestion = (item: MenuItem) => {
    addToCart(item, { quantity: 1 });
  };

  // ─── EMPTY STATE ────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState 
          icon="basket-outline"
          title={t('cart.empty_cart')}
          subtitle={t('cart.empty_cart_subtitle')}
          actionLabel={t('cart.explore_menu')}
          onAction={() => router.push('/(tabs)/menu')}
        />
      </SafeAreaView>
    );
  }

  // ─── MAIN RENDER ────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{t('cart.title')}</Text>
          <Text style={styles.headerSubtitle}>{cart.length} {cart.length === 1 ? 'item' : 'items'}</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <Ionicons name="trash-outline" size={16} color="#FF6666" />
          <Text style={styles.clearAll}>{t('cart.clear_all')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* ─── GROUPED CART ITEMS ─────────────────────────── */}
        {Object.entries(groupedItems).map(([category, items], groupIndex) => (
          <Animated.View 
            key={category} 
            entering={FadeInDown.delay(groupIndex * 100).duration(400)}
            style={styles.categoryGroup}
          >
            <View style={styles.categoryHeader}>
              <View style={styles.categoryDot} />
              <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
              <View style={styles.categoryLine} />
            </View>
            
            {items.map((item) => (
              <View key={item.cartItemId} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImg} contentFit="cover" />
                <View style={styles.itemInfo}>
                  <View style={styles.itemHead}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <TouchableOpacity 
                      style={styles.removeBtn}
                      onPress={() => removeFromCart(item.cartItemId)}
                    >
                      <Ionicons name="close" size={16} color="#FF6666" />
                    </TouchableOpacity>
                  </View>

                  {item.selectedSpice && (
                    <View style={styles.spiceBadge}>
                      <Text style={styles.spiceBadgeText}>🌶 {item.selectedSpice}</Text>
                    </View>
                  )}

                  <View style={styles.priceQtyRow}>
                    <Text style={styles.itemPrice}>${item.unitTotal.toFixed(2)}</Text>
                    <View style={styles.qtyRow}>
                      <TouchableOpacity 
                        style={styles.qtyBtn} 
                        onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      >
                        <Ionicons name="remove" size={16} color={Colors.primary} />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity 
                        style={styles.qtyBtn} 
                        onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      >
                        <Ionicons name="add" size={16} color={Colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Add-ons for this item */}
                  <View style={styles.addonsRow}>
                    {AVAILABLE_ADDONS.slice(0, 3).map(addon => {
                      const isSelected = (selectedAddons[item.cartItemId] || []).includes(addon.id);
                      return (
                        <TouchableOpacity
                          key={addon.id}
                          style={[styles.addonChip, isSelected && styles.addonChipActive]}
                          onPress={() => toggleAddon(item.cartItemId, addon.id)}
                        >
                          <Text style={styles.addonIcon}>{addon.icon}</Text>
                          <Text style={[styles.addonLabel, isSelected && styles.addonLabelActive]}>
                            +${addon.price.toFixed(0)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </View>
            ))}
          </Animated.View>
        ))}

        {/* ─── UPSELL COMBO DEALS ─────────────────────────── */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.comboSection}>
          <View style={styles.comboHeaderRow}>
            <View style={styles.comboBadgeWrap}>
              <LinearGradient colors={[Colors.primary, '#FEA42B']} style={styles.comboBadge}>
                <Ionicons name="flame" size={12} color={Colors.background} />
                <Text style={styles.comboBadgeText}>DEALS</Text>
              </LinearGradient>
            </View>
            <Text style={styles.comboTitle}>Combo Offers</Text>
            <Text style={styles.comboSubtitle}>Save more with bundles</Text>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.comboScroll}
          >
            {COMBO_DEALS.map((combo) => (
              <TouchableOpacity 
                key={combo.id} 
                style={styles.comboCard}
                activeOpacity={0.85}
                onPress={() => {
                  // Add combo items to cart
                  combo.items.forEach(itemId => {
                    const menuItem = RESTAURANT_MENU.flatMap(c => c.data).find(i => i.id === itemId);
                    if (menuItem && !cart.some(c => c.id === menuItem.id)) {
                      addToCart(menuItem, { quantity: 1 });
                    }
                  });
                }}
              >
                <Image source={{ uri: combo.image }} style={styles.comboImg} contentFit="cover" />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.85)']}
                  style={styles.comboOverlay}
                >
                  <View style={styles.comboSaveBadge}>
                    <Text style={styles.comboSaveText}>{combo.badge}</Text>
                  </View>
                  <Text style={styles.comboName}>{combo.name}</Text>
                  <Text style={styles.comboDesc} numberOfLines={1}>{combo.description}</Text>
                  <View style={styles.comboPriceRow}>
                    <Text style={styles.comboOldPrice}>${combo.originalPrice.toFixed(2)}</Text>
                    <Text style={styles.comboNewPrice}>${combo.comboPrice.toFixed(2)}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ─── PAIRS WELL SUGGESTIONS ─────────────────────── */}
        {suggestions.length > 0 && (
          <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.suggestSection}>
            <View style={styles.suggestHeaderRow}>
              <Ionicons name="sparkles" size={16} color={Colors.primary} />
              <Text style={styles.suggestTitle}>Pairs well with your order</Text>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.suggestScroll}
            >
              {suggestions.map(item => (
                <View key={item.id} style={styles.suggestCard}>
                  <Image source={{ uri: item.image }} style={styles.suggestImg} contentFit="cover" />
                  <View style={styles.suggestInfo}>
                    <Text style={styles.suggestName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.suggestPrice}>${item.price.toFixed(2)}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.suggestAddBtn}
                    onPress={() => handleAddSuggestion(item)}
                  >
                    <LinearGradient 
                      colors={[Colors.primary, '#FEA42B']} 
                      style={styles.suggestAddGradient}
                    >
                      <Ionicons name="add" size={18} color={Colors.background} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* ─── ORDER TYPE SELECTOR ────────────────────────── */}
        <View style={styles.typeSection}>
          <Text style={styles.sectionHeader}>{t('cart.auth.order_type_label')}</Text>
          <View style={styles.typeToggleMain}>
            <TouchableOpacity 
              style={[styles.typeBtn, orderType === 'dine-in' && styles.typeBtnActive]}
              onPress={() => setOrderType('dine-in')}
            >
              <Ionicons name="restaurant" size={22} color={orderType === 'dine-in' ? Colors.background : Colors.primary} />
              <View style={styles.typeBtnTextWrap}>
                <Text style={[styles.typeBtnMain, orderType === 'dine-in' && styles.typeBtnTextActive]}>{t('cart.dine_in')}</Text>
                <Text style={[styles.typeBtnSub, orderType === 'dine-in' && styles.typeBtnTextActive]}>Table service</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.typeBtn, orderType === 'delivery' && styles.typeBtnActive]}
              onPress={() => setOrderType('delivery')}
            >
              <Ionicons name="bag-handle" size={22} color={orderType === 'delivery' ? Colors.background : Colors.primary} />
              <View style={styles.typeBtnTextWrap}>
                <Text style={[styles.typeBtnMain, orderType === 'delivery' && styles.typeBtnTextActive]}>{t('cart.delivery')}</Text>
                <Text style={[styles.typeBtnSub, orderType === 'delivery' && styles.typeBtnTextActive]}>Pickup order</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─── BILL SUMMARY ───────────────────────────────── */}
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>{t('cart.bill_summary')}</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>{t('cart.item_total')}</Text>
            <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
          </View>
          {addonsTotal > 0 && (
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Add-ons</Text>
              <Text style={styles.billValue}>${addonsTotal.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>{t('cart.gst')}</Text>
            <Text style={styles.billValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>{t('cart.total_payable')}</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={{ height: 180 }} />
      </ScrollView>

      {/* ─── STICKY CHECKOUT CTA ──────────────────────────── */}
      <View style={styles.cartFooter}>
        <BlurView intensity={Platform.OS === 'ios' ? 60 : 100} tint="dark" style={styles.footerBlur}>
          <View style={styles.footerContent}>
            <View style={styles.footerInfo}>
              <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
              <Text style={styles.footerItemCount}>{cart.reduce((s, i) => s + i.quantity, 0)} items + tax</Text>
            </View>
            <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckoutPress}>
              <LinearGradient
                colors={[Colors.primary, '#FEA42B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.checkoutGradient}
              >
                <Text style={styles.checkoutText}>{t('cart.proceed_whatsapp')}</Text>
                <Ionicons name="logo-whatsapp" size={18} color={Colors.background} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>

      {/* ─── LOGIN MODAL ──────────────────────────────────── */}
      <Modal visible={isLoginVisible} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalFull}
        >
          <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalLine} />
              
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {loginStep === 1 ? t('cart.auth.get_started') : loginStep === 2 ? t('cart.auth.verify') : t('cart.auth.personalize')}
                </Text>
                <TouchableOpacity onPress={() => setIsLoginVisible(false)}>
                  <Ionicons name="close-circle-outline" size={28} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
              </View>

              {loginStep === 1 && (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepSubtitle}>{t('cart.auth.phone_subtitle')}</Text>
                  <View style={styles.minimalInputWrap}>
                    <Text style={styles.phonePrefix}>+225</Text>
                    <TextInput 
                      placeholder={t('cart.auth.phone_placeholder')} 
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      keyboardType="numeric"
                      style={styles.minimalInput}
                      value={inputPhone}
                      onChangeText={setInputPhone}
                      autoFocus
                    />
                  </View>
                  <TouchableOpacity style={styles.primaryBtn} onPress={handlePhoneSubmit}>
                    <LinearGradient colors={[Colors.primary, '#FEA42B']} style={styles.btnGradient}>
                      <Text style={styles.btnText}>{t('cart.auth.send_otp')}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}

              {loginStep === 2 && (
                <View style={styles.stepContainer}>
                  <Text style={styles.stepSubtitle}>{t('cart.auth.otp_subtitle')}</Text>
                  <View style={styles.otpInputWrap}>
                    <TextInput 
                      placeholder="0   0   0   0" 
                      placeholderTextColor="rgba(255,255,255,0.2)"
                      keyboardType="numeric"
                      maxLength={4}
                      style={styles.otpInput}
                      value={inputOtp}
                      onChangeText={(val) => {
                        setInputOtp(val);
                        if (val.length === 4) setOtpError(false);
                      }}
                      autoFocus
                    />
                  </View>
                  {otpError && <Text style={styles.errorText}>{t('cart.auth.invalid_otp')}</Text>}
                  <TouchableOpacity style={styles.primaryBtn} onPress={handleVerifyOtp}>
                    <LinearGradient colors={[Colors.primary, '#FEA42B']} style={styles.btnGradient}>
                      <Text style={styles.btnText}>{t('cart.auth.verify_otp')}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setLoginStep(1)}>
                    <Text style={styles.backText}>{t('common.back')}</Text>
                  </TouchableOpacity>
                </View>
              )}

              {loginStep === 3 && (
                <View style={styles.stepContainer}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.stepSubtitle}>{t('cart.auth.know_you_better')}</Text>
                    
                    <View style={styles.fieldWrap}>
                      <Text style={styles.fieldLabel}>{t('cart.auth.your_name_label')}</Text>
                      <TextInput 
                        placeholder={t('cart.auth.name_placeholder')} 
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        style={styles.formInput}
                        value={inputName}
                        onChangeText={setInputName}
                      />
                    </View>

                    {orderType === 'delivery' ? (
                      <View style={styles.fieldWrap}>
                        <Text style={styles.fieldLabel}>{t('cart.auth.address_label')}</Text>
                        <TextInput 
                          placeholder={t('cart.auth.address_placeholder')} 
                          placeholderTextColor="rgba(255,255,255,0.3)"
                          style={styles.formInput}
                          multiline
                          numberOfLines={2}
                          value={inputAddress}
                          onChangeText={setInputAddress}
                        />
                      </View>
                    ) : (
                      <View style={styles.fieldWrap}>
                        <Text style={styles.fieldLabel}>{t('cart.auth.guests_label')}</Text>
                        <TextInput 
                          placeholder={t('cart.auth.guests_placeholder')} 
                          placeholderTextColor="rgba(255,255,255,0.3)"
                          keyboardType="numeric"
                          style={styles.formInput}
                          value={inputGuestCount}
                          onChangeText={setInputGuestCount}
                        />
                      </View>
                    )}

                    <TouchableOpacity style={styles.primaryBtn} onPress={handleCompleteLogin}>
                      <LinearGradient colors={[Colors.primary, '#FEA42B']} style={styles.btnGradient}>
                        <Text style={styles.btnText}>{t('cart.auth.continue_preview')}</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                      <Text style={styles.skipText}>{t('common.skip')}</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              )}
            </View>
          </BlurView>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── WHATSAPP PREVIEW MODAL ───────────────────────── */}
      <Modal visible={isPreviewVisible} animationType="fade" transparent>
        <View style={styles.previewOverlay}>
          <View style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <View style={styles.previewHeaderLeft}>
                <TouchableOpacity onPress={() => setIsPreviewVisible(false)}>
                  <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.previewAvatar}>
                  <Ionicons name="restaurant" size={20} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.previewName}>{t('cart.preview.skyline_title')}</Text>
                  <Text style={styles.previewStatus}>{t('cart.preview.concierge')}</Text>
                </View>
              </View>
              <View style={styles.previewIcons}>
                <Ionicons name="videocam" size={22} color="#FFF" />
                <Ionicons name="call" size={20} color="#FFF" />
              </View>
            </View>

            <View style={styles.previewChatArea}>
              <View style={styles.chatBubble}>
                <Text style={styles.chatHeader}>{t('cart.preview.order_request')}</Text>
                <Text style={styles.chatUser}>{userName} • {phoneNumber}</Text>
                <View style={styles.divider} />
                <Text style={styles.chatOrderType}>{t('cart.preview.type')}: {orderType === 'delivery' ? t('cart.delivery') : t('cart.dine_in').toUpperCase()}</Text>
                {orderType === 'delivery' ? (
                  <Text style={styles.chatDetail}>{t('cart.preview.addr')}: {inputAddress || 'N/A'}</Text>
                ) : (
                  <Text style={styles.chatDetail}>{t('cart.preview.guests')}: {inputGuestCount}</Text>
                )}
                <View style={[styles.divider, { marginVertical: 8 }]} />
                {cart.map((item, i) => (
                  <Text key={i} style={styles.chatItem}>
                    • {item.name} x{item.quantity}
                  </Text>
                ))}
                <View style={[styles.divider, { marginTop: 12, marginBottom: 6 }]} />
                <Text style={styles.chatTotal}>{t('cart.preview.payable')}: ${total.toFixed(2)}</Text>
                <Text style={styles.chatTime}>{t('cart.preview.just_now')} ✓✓</Text>
              </View>
            </View>

            <View style={styles.previewFooter}>
              <TouchableOpacity style={styles.whatsappAction} onPress={sendToWhatsApp}>
                <LinearGradient 
                  colors={[Colors.primary, '#FEA42B']}
                  style={styles.whatsappActionGradient}
                >
                  <Ionicons name="logo-whatsapp" size={24} color={Colors.background} />
                  <Text style={styles.whatsappActionText}>{t('cart.preview.send_button')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ─── SUCCESS OVERLAY ──────────────────────────────── */}
      {showSuccess && (
        <Animated.View 
          entering={FadeIn} 
          exiting={FadeOut} 
          style={styles.successOverlay}
        >
          <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill}>
            <View style={styles.successContent}>
              <Animated.View 
                entering={ZoomIn.delay(300)} 
                style={styles.successIconCircle}
              >
                <Ionicons name="checkmark-circle" size={120} color={Colors.primary} />
              </Animated.View>
              <Text style={styles.successTitle}>{t('cart.order_sent')}</Text>
              <Text style={styles.successSubtitle}>{t('cart.order_sent_subtitle')}</Text>
            </View>
          </BlurView>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

// ─── STYLES ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'android' ? 10 : 15,
  },
  headerTitle: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 27,
  },
  headerSubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 102, 102, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  clearAll: {
    color: '#FF6666',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },

  // ── Category Groups ──
  categoryGroup: {
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  categoryTitle: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  categoryLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(254, 161, 22, 0.15)',
  },

  // ── Cart Item ──
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 22,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  itemImg: {
    width: 85,
    height: 85,
    borderRadius: 16,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
  },
  itemHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    ...Typography.bodyBold,
    color: '#FFF',
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 102, 102, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spiceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  spiceBadgeText: {
    fontSize: 10,
    color: '#FF5722',
    fontWeight: '700',
  },
  priceQtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  itemPrice: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '900',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    padding: 2,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
    minWidth: 16,
    textAlign: 'center',
  },

  // ── Add-ons ──
  addonsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,
  },
  addonChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  addonChipActive: {
    backgroundColor: 'rgba(254, 161, 22, 0.12)',
    borderColor: 'rgba(254, 161, 22, 0.3)',
  },
  addonIcon: {
    fontSize: 12,
  },
  addonLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
  },
  addonLabelActive: {
    color: Colors.primary,
  },

  // ── Combo Deals ──
  comboSection: {
    marginBottom: 28,
    marginTop: 8,
  },
  comboHeaderRow: {
    marginBottom: 16,
  },
  comboBadgeWrap: {
    marginBottom: 8,
  },
  comboBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  comboBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: Colors.background,
    letterSpacing: 1,
  },
  comboTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '800',
  },
  comboSubtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    marginTop: 3,
  },
  comboScroll: {
    gap: 14,
  },
  comboCard: {
    width: 200,
    height: 240,
    borderRadius: 22,
    overflow: 'hidden',
  },
  comboImg: {
    width: '100%',
    height: '100%',
  },
  comboOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: 'flex-end',
  },
  comboSaveBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  comboSaveText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  comboName: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '800',
  },
  comboDesc: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 3,
  },
  comboPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  comboOldPrice: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  comboNewPrice: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },

  // ── Suggestions ──
  suggestSection: {
    marginBottom: 28,
  },
  suggestHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  suggestTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  suggestScroll: {
    gap: 12,
  },
  suggestCard: {
    width: 140,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  suggestImg: {
    width: '100%',
    height: 100,
  },
  suggestInfo: {
    padding: 10,
    paddingBottom: 6,
  },
  suggestName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  suggestPrice: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '800',
    marginTop: 2,
  },
  suggestAddBtn: {
    position: 'absolute',
    top: 80,
    right: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  suggestAddGradient: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Order Type ──
  typeSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    ...Typography.h3,
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.5,
    marginBottom: 14,
  },
  typeToggleMain: {
    flexDirection: 'row',
    gap: 12,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 12,
  },
  typeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  typeBtnTextWrap: {
    flex: 1,
  },
  typeBtnMain: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  typeBtnSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  typeBtnTextActive: {
    color: Colors.background,
  },

  // ── Bill Summary ──
  billCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  billTitle: {
    ...Typography.h3,
    color: '#FFF',
    marginBottom: 15,
    fontSize: 16,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  billValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    marginBottom: 0,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '900',
  },
  totalValue: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: '900',
  },

  // ── Sticky Checkout ──
  cartFooter: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 85,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  footerBlur: {
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.12)',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  footerInfo: {
    gap: 2,
  },
  footerTotal: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
  },
  footerItemCount: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '600',
  },
  checkoutBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 8,
  },
  checkoutText: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // ── Modals ──
  modalFull: { flex: 1 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#053B40',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 30,
    paddingBottom: 60,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  modalLine: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  modalTitle: {
    ...Typography.h2,
    fontSize: 24,
    color: '#FFF',
  },
  stepContainer: { gap: 10 },
  stepSubtitle: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 20,
  },
  minimalInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    height: 65,
    borderRadius: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  phonePrefix: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '800',
    marginRight: 10,
  },
  minimalInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  otpInputWrap: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    height: 70,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  otpInput: {
    color: Colors.primary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 10,
    width: '100%',
    textAlign: 'center',
  },
  errorText: {
    color: '#FF6666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  primaryBtn: {
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 20,
  },
  btnGradient: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  backText: {
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
  },
  fieldWrap: { marginBottom: 20 },
  fieldLabel: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  formInput: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 15,
    padding: 15,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  skipBtn: {
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
  },
  skipText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  // ── WhatsApp Preview ──
  previewOverlay: { flex: 1, backgroundColor: '#000' },
  previewContainer: { flex: 1, backgroundColor: '#042D31' },
  previewHeader: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#053B40',
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  previewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  previewStatus: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  previewIcons: {
    flexDirection: 'row',
    gap: 18,
  },
  previewChatArea: {
    flex: 1,
    padding: 20,
  },
  chatBubble: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    maxWidth: '85%',
    padding: 18,
    borderRadius: 20,
    borderTopRightRadius: 2,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  chatHeader: {
    color: Colors.background,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 2,
  },
  chatUser: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 13,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 12,
  },
  chatOrderType: {
    color: Colors.background,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  chatDetail: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 13,
    fontStyle: 'italic',
  },
  chatItem: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  chatTotal: {
    color: Colors.background,
    fontSize: 20,
    fontWeight: '900',
  },
  chatTime: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 8,
    fontWeight: '600',
  },
  previewFooter: {
    padding: 25,
    paddingBottom: 40,
  },
  whatsappAction: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  whatsappActionGradient: {
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  whatsappActionText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // ── Success ──
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  successIconCircle: {
    marginBottom: 30,
  },
  successTitle: {
    ...Typography.h1,
    color: '#FFF',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '900',
  },
  successSubtitle: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});
