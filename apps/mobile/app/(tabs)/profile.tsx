import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Colors, Typography } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useRestaurantCart } from '@/contexts/RestaurantCartContext';
import { RESTAURANT_MENU, MenuItem } from '@/constants/menuItems';
import { PAST_ORDERS, RESERVATIONS } from '@/constants/mockData';
import LanguageToggle from '@/components/LanguageToggle';
import { useRouter } from 'expo-router';
import EmptyState from '@/components/EmptyState';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated, phoneNumber, userName, logout } = useAuth();
  const { addToCart } = useRestaurantCart();
  
  // Reorder States
  const [isReorderModalVisible, setIsReorderModalVisible] = useState(false);
  const [reorderItems, setReorderItems] = useState<any[]>([]);

  const handleReorder = (order: typeof PAST_ORDERS[0]) => {
    // Clone items into local state for editing
    setReorderItems(order.items.map(item => ({ ...item })));
    setIsReorderModalVisible(true);
  };

  const updateReorderQty = (id: string, delta: number) => {
    setReorderItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const finalizeReorder = () => {
    reorderItems.forEach(item => {
      const allMenuItems = RESTAURANT_MENU.flatMap(cat => cat.data);
      const menuItem = allMenuItems.find((mi: MenuItem) => mi.id === item.id);
      if (menuItem) {
        addToCart(menuItem, { quantity: item.quantity });
      }
    });
    setIsReorderModalVisible(false);
    router.push('/(tabs)/cart');
  };

  const renderOption = (icon: any, title: string, subtitle: string, onPress?: () => void, isDestructive = false) => (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
      <View style={[styles.optionIconWrap, isDestructive && styles.destructiveIconWrap]}>
        <Ionicons name={icon} size={20} color={isDestructive ? '#FF6666' : Colors.primary} />
      </View>
      <View style={styles.optionTextWrap}>
        <Text style={[styles.optionTitle, isDestructive && styles.destructiveText]}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.15)" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Accent */}
      <LinearGradient 
        colors={[Colors.primary, 'transparent']} 
        style={styles.headerGlow} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header (Lightweight) */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <LinearGradient colors={[Colors.primary, '#FEA42B']} style={styles.avatarGradient}>
              <Text style={styles.avatarText}>{userName ? userName[0].toUpperCase() : 'G'}</Text>
            </LinearGradient>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userName || t('profile.not_identified')}</Text>
            <Text style={styles.userPhone}>{phoneNumber || t('profile.identify_prompt')}</Text>
          </View>
        </View>

        {isAuthenticated ? (
          <>
            {/* Section: Reservations */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{t('profile.reservations_header')}</Text>
              {RESERVATIONS.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
                  {RESERVATIONS.map(res => (
                    <TouchableOpacity 
                      key={res.id} 
                      style={styles.resCard}
                      onPress={() => router.push({ pathname: '/(tabs)/reservation/[id]', params: { id: res.id } })}
                    >
                      <View style={styles.resHeader}>
                        <View style={[
                          styles.statusBadge, 
                          res.status === 'Confirmed' ? styles.statusConfirmed : 
                          res.status === 'Pending' ? styles.statusPending : 
                          styles.statusCompleted
                        ]}>
                          <Text style={[
                            styles.statusText, 
                            res.status === 'Pending' && { color: Colors.primary }
                          ]}>
                            {res.status === 'Confirmed' ? t('profile.status_confirmed') : 
                             res.status === 'Pending' ? t('profile.status_pending') : 
                             t('profile.status_completed')}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.resDate}>{res.date}</Text>
                      <View style={styles.resMeta}>
                        <View style={styles.metaItemSmall}>
                          <Ionicons name="time-outline" size={14} color={Colors.primary} />
                          <Text style={styles.metaTextSmall}>{res.time}</Text>
                        </View>
                        <View style={styles.metaItemSmall}>
                          <Ionicons name="people-outline" size={14} color={Colors.primary} />
                          <Text style={styles.metaTextSmall}>{res.guests} Pax</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <EmptyState 
                  variant="compact"
                  icon="calendar-outline"
                  title={t('profile.no_reservations_title')}
                  subtitle={t('profile.no_reservations_subtitle')}
                />
              )}
            </View>

            {/* Section: Past Orders */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>{t('profile.past_orders').toUpperCase()}</Text>
              {PAST_ORDERS.length > 0 ? (
                PAST_ORDERS.map(order => (
                  <View key={order.id} style={styles.orderCard}>
                    <View style={styles.orderMain}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.orderDate}>{order.date}</Text>
                        <Text style={styles.orderItems} numberOfLines={1}>
                          {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                        </Text>
                        <View style={styles.orderMeta}>
                          <Text style={styles.orderType}>{order.type === 'Dine-in' ? t('profile.type_dinein') : t('profile.type_takeaway')}</Text>
                          <View style={styles.dot} />
                          <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.reorderBtn} onPress={() => handleReorder(order)}>
                        <Ionicons name="repeat" size={18} color={Colors.primary} />
                        <Text style={styles.reorderText}>{t('profile.reorder_btn')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <EmptyState 
                  variant="compact"
                  icon="receipt-outline"
                  title={t('profile.no_orders_title')}
                  subtitle={t('profile.no_orders_subtitle')}
                  actionLabel={t('profile.browse_menu')}
                  onAction={() => router.push('/(tabs)/menu')}
                />
              )}
            </View>
          </>
        ) : (
          /* Profile Empty State for Guests */
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>{t('profile.past_orders').toUpperCase()}</Text>
            <EmptyState 
              variant="compact"
              icon="receipt-outline"
              title={t('profile.no_orders_title')}
              subtitle={t('profile.identify_prompt')}
            />
          </View>
        )}

        {/* Section: Services & Support */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>{t('profile.account_support_header')}</Text>
          <View style={styles.optionsList}>
            {renderOption(
              "swap-horizontal-outline", 
              t('profile.switch_experience', 'Switch Experience'), 
              t('profile.switch_experience_subtitle', 'Skyline · Spice and Bliss'),
              () => router.replace('/selection')
            )}
            {renderOption("notifications-outline", t('profile.notifications'), t('profile.notifications_subtitle'))}
            {renderOption("help-circle-outline", t('profile.support'), t('profile.support_subtitle'))}
            
            {/* Language Setting Row */}
            <View style={styles.optionItem}>
              <View style={styles.optionIconWrap}>
                <Ionicons name="language-outline" size={20} color={Colors.primary} />
              </View>
              <View style={styles.optionTextWrap}>
                <Text style={styles.optionTitle}>{t('language_selection.title')}</Text>
                <Text style={styles.optionSubtitle}>{t('language_selection.subtitle')}</Text>
              </View>
              <LanguageToggle />
            </View>
            
            {isAuthenticated && renderOption(
               "log-out-outline", 
               t('profile.logout'), 
               "Clear session & logout", 
               logout, 
               true
            )}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 3. Reorder Preview Modal (NEW) */}

      {/* 3. Reorder Preview Modal (NEW) */}
      <Modal visible={isReorderModalVisible} animationType="slide" transparent>
        <BlurView intensity={90} tint="dark" style={styles.modalOverlay}>
          <View style={styles.reorderModal}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{t('profile.reorder_summary')}</Text>
                <Text style={styles.modalSubtitle}>{t('profile.items_to_reorder')}</Text>
              </View>
              <TouchableOpacity onPress={() => setIsReorderModalVisible(false)}>
                <Ionicons name="close-circle-outline" size={30} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: height * 0.45 }}>
              {reorderItems.map((item) => (
                <View key={item.id} style={styles.reorderItemRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reorderItemName}>{item.name}</Text>
                    <Text style={styles.reorderItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                  </View>
                  <View style={styles.stepperMini}>
                    <TouchableOpacity onPress={() => updateReorderQty(item.id, -1)} style={styles.stepBtnMini}>
                      <Ionicons name="remove" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.reorderQty}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateReorderQty(item.id, 1)} style={styles.stepBtnMini}>
                      <Ionicons name="add" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.reorderFooter}>
              <View style={styles.reorderTotalRow}>
                <Text style={styles.totalLabel}>{t('preview.payable')}</Text>
                <Text style={styles.totalAmount}>
                  ${reorderItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity style={styles.reorderFinalBtn} onPress={finalizeReorder}>
                <LinearGradient colors={[Colors.primary, '#FEA42B']} style={styles.btnGradient}>
                  <Text style={styles.btnText}>{t('profile.add_all_to_cart')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    opacity: 0.1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    paddingTop: 40,
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  avatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.background,
    fontSize: 30,
    fontWeight: '900',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  userName: {
    ...Typography.h2,
    fontSize: 24,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  userPhone: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 25,
    marginTop: 35,
  },
  sectionHeader: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.5,
    marginBottom: 20,
    opacity: 0.8,
  },
  emptyActivityCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emptyActivityBlur: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyActivityText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 14,
    fontWeight: '600',
  },
  optionsList: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  optionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(254, 161, 22, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  destructiveIconWrap: {
    backgroundColor: 'rgba(255, 102, 102, 0.08)',
  },
  optionTextWrap: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  destructiveText: {
    color: '#FF6666',
  },
  optionSubtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 3,
  },
  // Modal & Steps
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalTitle: {
    ...Typography.h2,
    color: '#FFF',
    fontSize: 22,
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
  // Authenticated Activity Styles
  horizontalScroll: {
    paddingBottom: 15,
    gap: 15,
  },
  resCard: {
    width: 200,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  resHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusConfirmed: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
  },
  statusCompleted: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statusPending: {
    backgroundColor: 'rgba(254, 161, 22, 0.1)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  resDate: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  resMeta: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItemSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaTextSmall: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  orderMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  orderDate: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 6,
  },
  orderItems: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  orderMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderType: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  orderTotal: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  // Reorder Modal
  reorderModal: {
    backgroundColor: '#053B40',
    width: '100%',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 30,
    maxHeight: height * 0.8,
  },
  modalSubtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 13,
    marginTop: 4,
  },
  reorderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  reorderItemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  reorderItemPrice: {
    color: Colors.primary,
    fontSize: 13,
    marginTop: 2,
    fontWeight: '700',
  },
  stepperMini: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    padding: 2,
  },
  stepBtnMini: {
    padding: 6,
  },
  reorderQty: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
  },
  reorderFooter: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  reorderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '600',
  },
  totalAmount: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
  },
  reorderFinalBtn: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 20,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 161, 22, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
  },
  reorderText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '800',
  },
});
