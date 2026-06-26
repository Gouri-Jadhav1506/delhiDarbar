import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { RESTAURANT_MENU } from '../../constants/menuItems';
import { useRestaurantCart } from '../../contexts/RestaurantCartContext';

export default function CustomizeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { t } = useTranslation();
  const itemId = params.itemId as string;
  const { addToCart } = useRestaurantCart();

  // Find item
  const item = useMemo(() => {
    for (const cat of RESTAURANT_MENU) {
      const found = cat.data.find(i => i.id === itemId);
      if (found) return found;
    }
    return null;
  }, [itemId]);

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState<string | undefined>(item?.spiceLevels?.[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(ao => ao !== id) : [...prev, id]
    );
  };

  const calculatedTotal = useMemo(() => {
    if (!item) return 0;
    let adTotal = 0;
    if (item.addOns) {
      adTotal = selectedAddOns.reduce((sum, aoId) => {
        const addon = item.addOns!.find(a => a.id === aoId);
        return sum + (addon ? addon.price : 0);
      }, 0);
    }
    return (item.price + adTotal) * quantity;
  }, [item, quantity, selectedAddOns]);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: '#fff', padding: 20 }}>{t('customize.notFound', 'Item not found.')}</Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    // resolve actual addon objects
    const resolvedAddOns = item.addOns 
      ? item.addOns.filter(ao => selectedAddOns.includes(ao.id))
      : [];

    addToCart(item, {
      quantity,
      selectedSpice,
      selectedAddOns: resolvedAddOns
    });

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('customize.header', 'Customize Item')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: item.image }} style={styles.bannerImg} />
        
        <View style={styles.content}>
          <View style={styles.itemTitleRow}>
            <Text style={styles.itemName}>{t(`menu.item_${item.id}_name`, item.name)}</Text>
            <Text style={styles.itemBasePrice}>${item.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.itemDesc}>{t(`menu.item_${item.id}_desc`, item.description)}</Text>

          {/* Spice Levels */}
          {item.spiceLevels && item.spiceLevels.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeaderWrap}>
                <Text style={styles.sectionTitle}>{t('customize.spiceLevel', 'Spice Level')}</Text>
                <View style={styles.reqBadge}><Text style={styles.reqText}>{t('customize.required', 'REQUIRED')}</Text></View>
              </View>
              {item.spiceLevels.map((spice) => (
                <TouchableOpacity 
                  key={spice} 
                  style={styles.radioRow}
                  activeOpacity={0.7}
                  onPress={() => setSelectedSpice(spice)}
                >
                  <View style={styles.radioBorder}>
                    {selectedSpice === spice && <View style={styles.radioDot} />}
                  </View>
                  <Text style={styles.radioLabel}>{t(`customize.spice_${spice.replace(/ /g, '')}`, spice)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Add-ons */}
          {item.addOns && item.addOns.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeaderWrap}>
                <Text style={styles.sectionTitle}>{t('customize.addons', 'Add-ons')}</Text>
                <Text style={styles.optText}>{t('customize.optional', 'OPTIONAL')}</Text>
              </View>
              {item.addOns.map((ao) => {
                const isSelected = selectedAddOns.includes(ao.id);
                return (
                  <TouchableOpacity 
                    key={ao.id} 
                    style={styles.checkRow}
                    activeOpacity={0.7}
                    onPress={() => toggleAddOn(ao.id)}
                  >
                    <View style={styles.checkLeft}>
                      <View style={[styles.checkBox, isSelected && styles.checkBoxActive]}>
                        {isSelected && <Ionicons name="checkmark" size={16} color="#042D31" />}
                      </View>
                      <Text style={styles.checkLabel}>{t(`customize.addon_${ao.id}`, ao.name)}</Text>
                    </View>
                    <Text style={styles.addonPrice}>+${ao.price.toFixed(2)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.qtyControls}>
          <TouchableOpacity 
            style={[styles.qtyBtn, quantity <= 1 && styles.qtyDisabled]} 
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Ionicons name="remove" size={24} color={quantity <= 1 ? "rgba(255,255,255,0.2)" : "#FEA116"} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={24} color="#FEA116" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addCartBtnText}>{t('customize.addItem', 'Add Item')}</Text>
          <Text style={styles.addCartBtnTotal}>${calculatedTotal.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#042D31',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 16 : 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    zIndex: 10,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  bannerImg: {
    width: '100%',
    height: 220,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  content: {
    padding: 24,
  },
  itemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    paddingRight: 16,
  },
  itemBasePrice: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FEA116',
  },
  itemDesc: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 22,
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  reqBadge: {
    backgroundColor: 'rgba(254, 161, 22, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  reqText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FEA116',
  },
  optText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.4)',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  radioBorder: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#FEA116',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FEA116',
  },
  radioLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  checkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkBoxActive: {
    backgroundColor: '#FEA116',
    borderColor: '#FEA116',
  },
  checkLabel: {
    fontSize: 16,
    color: '#FFF',
  },
  addonPrice: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#042D31',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    gap: 16,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  qtyBtn: {
    padding: 12,
  },
  qtyDisabled: {
    opacity: 0.5,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    width: 30,
    textAlign: 'center',
  },
  addCartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEA116',
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  addCartBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#042D31',
  },
  addCartBtnTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#042D31',
  },
});
