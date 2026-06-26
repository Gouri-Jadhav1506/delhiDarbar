import React, { createContext, useState, useContext } from 'react';
import { Product } from '../constants/products';

export interface RetailCartItem extends Product {
  cartItemId: string;
  quantity: number;
  lineTotal: number;
}

interface RetailCartContextType {
  cart: RetailCartItem[];
  addToCart: (item: Product, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => RetailCartItem | undefined;
}

const RetailCartContext = createContext<RetailCartContextType | undefined>(undefined);

export function RetailCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<RetailCartItem[]>([]);

  const addToCart = (item: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const updatedItem = { ...updated[existingIndex] };
        updatedItem.quantity += quantity;
        updatedItem.lineTotal = updatedItem.price * updatedItem.quantity;
        updated[existingIndex] = updatedItem;
        return updated;
      }
      const newItem: RetailCartItem = {
        ...item,
        cartItemId: Math.random().toString(36).substring(2, 11),
        quantity,
        lineTotal: item.price * quantity,
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
        return { ...i, quantity, lineTotal: i.price * quantity };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isInCart = (productId: string) => cart.some(i => i.id === productId);
  const getCartItem = (productId: string) => cart.find(i => i.id === productId);

  return (
    <RetailCartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount, isInCart, getCartItem
    }}>
      {children}
    </RetailCartContext.Provider>
  );
}

export const useRetailCart = () => {
  const context = useContext(RetailCartContext);
  if (context === undefined) {
    throw new Error('useRetailCart must be used within a RetailCartProvider');
  }
  return context;
};
