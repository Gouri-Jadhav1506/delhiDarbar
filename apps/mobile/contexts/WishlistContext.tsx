import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistContextType {
  wishlistItems: string[];
  wishlistCount: number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const wishlistCount = wishlistItems.length;

  const addToWishlist = (productId: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId));
  };

  const toggleWishlist = (productId: string) => {
    setWishlistItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use the wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
