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
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useRetailCart } from '../../../contexts/RetailCartContext';
import { useAuth } from '../../../contexts/AuthContext';
import { productImages } from '../../../constants/products';
import { generateRetailWhatsAppMessage, ShippingDetails } from '../../../utils/whatsappHelper';
import Animated, {
  FadeIn,
  FadeOut,
  FadeInDown,
  ZoomIn,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function RetailCartScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, itemCount } = useRetailCart();
  const { isAuthenticated, phoneNumber, userName } = useAuth();

  const [isShippingVisible, setIsShippingVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Shipping form
  const [shipName, setShipName] = useState('');
  const [shipPhone, setShipPhone] = useState('');
  const [shipAddress, setShipAddress] = useState('');
  const [shipCity, setShipCity] = useState('');
  const [shipNotes, setShipNotes] = useState('');

  const estimatedShipping = cartTotal > 50 ? 0 : 5.99;
  const total = cartTotal + estimatedShipping;

  // Pre-fill from auth
  const prefillShipping = () => {
    if (userName && !shipName) setShipName(userName);
    if (phoneNumber && !shipPhone) setShipPhone(phoneNumber);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push(`/ecommerce/login?returnUrl=/ecommerce/(tabs)/cart` as any);
      return;
    }
    prefillShipping();
    setIsShippingVisible(true);
  };

  const handleSendInquiry = () => {
    const shipping: ShippingDetails = {
      name: shipName || 'Guest',
      phone: shipPhone || 'N/A',
      address: shipAddress || 'N/A',
      city: shipCity || 'N/A',
      notes: shipNotes || undefined,
    };

    const items = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      lineTotal: item.lineTotal,
    }));

    const url = generateRetailWhatsAppMessage(items, total, shipping);

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        const webUrl = url.replace('whatsapp://send', 'https://wa.me');
        Linking.openURL(webUrl);
      }
      setIsShippingVisible(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        clearCart();
        router.replace('/ecommerce/(tabs)/home' as any);
      }, 4000);
    });
  };

  const isFormValid = shipName.length > 0 && shipPhone.length >= 7 && shipAddress.length > 0 && shipCity.length > 0;

  // ─── EMPTY STATE ─────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topAccent} />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="bag-outline" size={64} color="rgba(254, 161, 22, 0.3)" />
          </View>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySubtitle}>
            Discover our curated collection of authentic Indian goods
          </Text>
          <TouchableOpacity
            style={styles.emptyBtn}
            activeOpacity={0.85}
            onPress={() => router.push('/ecommerce/(tabs)/home' as any)}
          >
            <Text style={styles.emptyBtnText}>BROWSE PRODUCTS</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ─── MAIN RENDER ─────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topAccent} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Shopping Bag</Text>
          <Text style={styles.headerSub}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <Ionicons name="trash-outline" size={16} color="#FF6666" />
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cart Items */}
        {cart.map((item, index) => (
          <Animated.View
            key={item.cartItemId}
            entering={FadeInDown.delay(index * 80).duration(350)}
            style={styles.cartItem}
          >
            <Image
              source={productImages[item.image]}
              style={styles.itemImg}
              resizeMode="cover"
            />
            <View style={styles.itemInfo}>
              <View style={styles.itemTopRow}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.cartItemId)}
                >
                  <Ionicons name="close" size={16} color="#FF6666" />
                </TouchableOpacity>
              </View>

              <Text style={styles.itemCategory}>{item.category}</Text>

              <View style={styles.itemBottomRow}>
                <Text style={styles.itemPrice}>${item.lineTotal.toFixed(2)}</Text>
                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                  >
                    <Ionicons name="remove" size={16} color="#FEA116" />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={16} color="#FEA116" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        ))}

        {/* Free Shipping Note */}
        {cartTotal < 50 && (
          <View style={styles.shippingNote}>
            <Ionicons name="car-outline" size={16} color="#FEA116" />
            <Text style={styles.shippingNoteText}>
              Add <Text style={styles.shippingHighlight}>${(50 - cartTotal).toFixed(2)}</Text> more for free shipping
            </Text>
          </View>
        )}
        {cartTotal >= 50 && (
          <View style={styles.shippingNoteFree}>
            <Ionicons name="checkmark-circle" size={16} color="#66BB6A" />
            <Text style={styles.shippingFreeText}>You qualify for free shipping! 🎉</Text>
          </View>
        )}

        {/* Bill Summary */}
        <View style={styles.billCard}>
          <Text style={styles.billTitle}>Order Summary</Text>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Subtotal ({itemCount} items)</Text>
            <Text style={styles.billValue}>${cartTotal.toFixed(2)}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Estimated Shipping</Text>
            <Text style={[styles.billValue, estimatedShipping === 0 && styles.freeTag]}>
              {estimatedShipping === 0 ? 'FREE' : `$${estimatedShipping.toFixed(2)}`}
            </Text>
          </View>

          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Trust Badges */}
        <View style={styles.trustRow}>
          <View style={styles.trustBadge}>
            <Ionicons name="shield-checkmark" size={18} color="#FEA116" />
            <Text style={styles.trustText}>Quality{'\n'}Assured</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="lock-closed" size={18} color="#FEA116" />
            <Text style={styles.trustText}>Secure{'\n'}Checkout</Text>
          </View>
          <View style={styles.trustBadge}>
            <Ionicons name="refresh" size={18} color="#FEA116" />
            <Text style={styles.trustText}>Easy{'\n'}Returns</Text>
          </View>
        </View>

        <View style={{ height: 160 }} />
      </ScrollView>

      {/* Sticky Checkout CTA */}
      <View style={styles.footerWrap}>
        <View style={styles.footerContent}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
            <Text style={styles.footerSub}>{itemCount} items • incl. shipping</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            activeOpacity={0.85}
            onPress={handleCheckout}
          >
            <View style={styles.checkoutInner}>
              <Text style={styles.checkoutText}>INQUIRE / CHECKOUT</Text>
              <Ionicons name="arrow-forward" size={16} color="#042D31" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── SHIPPING DETAILS MODAL ──────────────────────── */}
      <Modal visible={isShippingVisible} animationType="slide" transparent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalFull}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalLine} />

              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Shipping Details</Text>
                  <Text style={styles.modalSub}>We'll arrange delivery via WhatsApp</Text>
                </View>
                <TouchableOpacity onPress={() => setIsShippingVisible(false)}>
                  <Ionicons name="close-circle-outline" size={28} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldLabel}>FULL NAME</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="person-outline" size={16} color="rgba(255,255,255,0.3)" />
                    <TextInput
                      style={styles.formInput}
                      placeholder="Your name"
                      placeholderTextColor="rgba(255,255,255,0.25)"
                      value={shipName}
                      onChangeText={setShipName}
                    />
                  </View>
                </View>

                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="call-outline" size={16} color="rgba(255,255,255,0.3)" />
                    <TextInput
                      style={styles.formInput}
                      placeholder="+1 (xxx) xxx-xxxx"
                      placeholderTextColor="rgba(255,255,255,0.25)"
                      keyboardType="phone-pad"
                      value={shipPhone}
                      onChangeText={setShipPhone}
                    />
                  </View>
                </View>

                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldLabel}>SHIPPING ADDRESS</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.3)" />
                    <TextInput
                      style={[styles.formInput, { height: 56 }]}
                      placeholder="Street address, suite, building..."
                      placeholderTextColor="rgba(255,255,255,0.25)"
                      multiline
                      value={shipAddress}
                      onChangeText={setShipAddress}
                    />
                  </View>
                </View>

                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldLabel}>CITY / STATE</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="business-outline" size={16} color="rgba(255,255,255,0.3)" />
                    <TextInput
                      style={styles.formInput}
                      placeholder="City, State, ZIP"
                      placeholderTextColor="rgba(255,255,255,0.25)"
                      value={shipCity}
                      onChangeText={setShipCity}
                    />
                  </View>
                </View>

                <View style={styles.fieldWrap}>
                  <Text style={styles.fieldLabel}>ORDER NOTES (OPTIONAL)</Text>
                  <View style={styles.inputRow}>
                    <Ionicons name="chatbubble-outline" size={16} color="rgba(255,255,255,0.3)" />
                    <TextInput
                      style={styles.formInput}
                      placeholder="Gift wrap, specific instructions..."
                      placeholderTextColor="rgba(255,255,255,0.25)"
                      value={shipNotes}
                      onChangeText={setShipNotes}
                    />
                  </View>
                </View>

                {/* Order Preview */}
                <View style={styles.orderPreview}>
                  <Text style={styles.previewLabel}>ORDER PREVIEW</Text>
                  {cart.map(item => (
                    <View key={item.cartItemId} style={styles.previewItem}>
                      <Text style={styles.previewName} numberOfLines={1}>
                        {item.name} × {item.quantity}
                      </Text>
                      <Text style={styles.previewPrice}>${item.lineTotal.toFixed(2)}</Text>
                    </View>
                  ))}
                  <View style={styles.previewDivider} />
                  <View style={styles.previewItem}>
                    <Text style={styles.previewTotal}>Total</Text>
                    <Text style={styles.previewTotalValue}>${total.toFixed(2)}</Text>
                  </View>
                </View>

                {/* Send Inquiry Button */}
                <TouchableOpacity
                  style={[styles.sendBtn, !isFormValid && styles.sendBtnDisabled]}
                  activeOpacity={0.85}
                  onPress={handleSendInquiry}
                  disabled={!isFormValid}
                >
                  <Ionicons name="logo-whatsapp" size={22} color="#042D31" />
                  <Text style={styles.sendBtnText}>SEND ORDER INQUIRY</Text>
                </TouchableOpacity>

                <Text style={styles.whatsappNote}>
                  Your order will be sent as a WhatsApp message to our retail team who will confirm availability and arrange payment.
                </Text>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── SUCCESS OVERLAY ─────────────────────────────── */}
      {showSuccess && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.successOverlay}
        >
          <View style={styles.successContent}>
            <Animated.View entering={ZoomIn.delay(300)}>
              <Ionicons name="checkmark-circle" size={100} color="#FEA116" />
            </Animated.View>
            <Text style={styles.successTitle}>Inquiry Sent!</Text>
            <Text style={styles.successSub}>
              Our retail team will get back to you on WhatsApp shortly with availability and payment details.
            </Text>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  topAccent: {
    height: 3,
    backgroundColor: '#FEA116',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 14 : 50,
    paddingBottom: 14,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 102, 102, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  clearText: {
    color: '#FF6666',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 6,
  },

  // Cart Item
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  itemImg: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 102, 102, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCategory: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.3)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FEA116',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  qtyBtn: {
    width: 30,
    height: 30,
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

  // Shipping Note
  shippingNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(254, 161, 22, 0.06)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.1)',
  },
  shippingNoteText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    flex: 1,
  },
  shippingHighlight: {
    color: '#FEA116',
    fontWeight: '800',
  },
  shippingNoteFree: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(102, 187, 106, 0.06)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(102, 187, 106, 0.1)',
  },
  shippingFreeText: {
    color: '#66BB6A',
    fontSize: 13,
    fontWeight: '600',
  },

  // Bill Summary
  billCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  billTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billLabel: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 14,
  },
  billValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  freeTag: {
    color: '#66BB6A',
    fontWeight: '800',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    marginBottom: 0,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '900',
  },
  totalValue: {
    color: '#FEA116',
    fontSize: 22,
    fontWeight: '900',
  },

  // Trust Badges
  trustRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  trustBadge: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 6,
  },
  trustText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    lineHeight: 14,
  },

  // Sticky CTA
  footerWrap: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 95 : 75,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(4, 45, 49, 0.95)',
    borderRadius: 20,
    padding: 14,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.15)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: { elevation: 12 },
    }),
  },
  footerLeft: {
    gap: 2,
  },
  footerTotal: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
  },
  footerSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 11,
    fontWeight: '600',
  },
  checkoutBtn: {
    backgroundColor: '#FEA116',
    borderRadius: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#FEA116',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  checkoutInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  checkoutText: {
    color: '#042D31',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(254, 161, 22, 0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(254, 161, 22, 0.1)',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  emptyBtn: {
    backgroundColor: '#FEA116',
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#FEA116',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: { elevation: 6 },
    }),
  },
  emptyBtnText: {
    color: '#042D31',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  // Modal
  modalFull: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#042D31',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    maxHeight: '92%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
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
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
  },
  modalSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    marginTop: 3,
  },

  // Form Fields
  fieldWrap: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    gap: 10,
  },
  formInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 15,
    height: 50,
  },

  // Order Preview
  orderPreview: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FEA116',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  previewName: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },
  previewPrice: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '700',
  },
  previewDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 10,
  },
  previewTotal: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  previewTotalValue: {
    color: '#FEA116',
    fontSize: 18,
    fontWeight: '900',
  },

  // Send Button
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FEA116',
    borderRadius: 14,
    height: 58,
    ...Platform.select({
      ios: {
        shadowColor: '#FEA116',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: { elevation: 6 },
    }),
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
  sendBtnText: {
    color: '#042D31',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  whatsappNote: {
    color: 'rgba(255,255,255,0.25)',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 18,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  // Success
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 45, 49, 0.95)',
    zIndex: 9999,
  },
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFF',
    marginTop: 20,
  },
  successSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
});
