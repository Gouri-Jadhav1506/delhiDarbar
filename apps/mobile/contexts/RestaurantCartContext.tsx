import React, { createContext, useState, useContext } from 'react';
import { MenuItem } from '../constants/menuItems';

export interface CartItem extends MenuItem {
  cartItemId: string; // Unique ID for this specific configured line item
  quantity: number;
  selectedSpice?: string;
  selectedAddOns?: { id: string; name: string; price: number }[];
  unitTotal: number; // Base price + add-ons
  lineTotal: number; // unitTotal * quantity
}

interface AddToCartOptions {
  quantity: number;
  selectedSpice?: string;
  selectedAddOns?: { id: string; name: string; price: number }[];
}

interface RestaurantCartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: AddToCartOptions) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const RestaurantCartContext = createContext<RestaurantCartContextType | undefined>(undefined);

export function RestaurantCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, options?: AddToCartOptions) => {
    setCart(prev => {
      const quantityToAdd = options?.quantity || 1;
      const spice = options?.selectedSpice;
      const addons = options?.selectedAddOns || [];
      
      // Calculate unit total
      const addonsPrice = addons.reduce((sum, ao) => sum + ao.price, 0);
      const unitTotal = item.price + addonsPrice;

      // Ensure stable string for addons comparison
      const addonsSignature = addons.map(a => a.id).sort().join(',');

      // Check if exact configuration exists
      const existingIndex = prev.findIndex(i => 
        i.id === item.id && 
        i.selectedSpice === spice && 
        (i.selectedAddOns || []).map(a => a.id).sort().join(',') === addonsSignature
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        const updatedItem = { ...updated[existingIndex] };
        updatedItem.quantity += quantityToAdd;
        updatedItem.lineTotal = updatedItem.unitTotal * updatedItem.quantity;
        updated[existingIndex] = updatedItem;
        return updated;
      }

      // Add as new line item
      const newItem: CartItem = {
        ...item,
        cartItemId: Math.random().toString(36).substring(2, 11),
        quantity: quantityToAdd,
        selectedSpice: spice,
        selectedAddOns: addons,
        unitTotal,
        lineTotal: unitTotal * quantityToAdd
      };
      
      return [...prev, newItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(i => {
      if (i.cartItemId === cartItemId) {
        return { ...i, quantity, lineTotal: i.unitTotal * quantity };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <RestaurantCartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount
    }}>
      {children}
    </RestaurantCartContext.Provider>
  );
}

export const useRestaurantCart = () => {
  const context = useContext(RestaurantCartContext);
  if (context === undefined) {
    throw new Error('useRestaurantCart must be used within a RestaurantCartProvider');
  }
  return context;
};
