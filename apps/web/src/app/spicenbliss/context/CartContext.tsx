"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products } from "../data/products";

export type { Product };
export { products };

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  items: CartItem[];
  date: string;
  status: "Pending" | "Shipped" | "Delivered";
}

export interface Subscriber {
  email: string;
  date: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  
  // Dynamic Product Management
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  
  // Order Management
  orders: Order[];
  addOrder: (orderData: Omit<Order, "id" | "date" | "status">) => string;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;

  // Subscriber Management
  subscribers: Subscriber[];
  addSubscriber: (email: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsState, setProductsState] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // Load state on component mount
  useEffect(() => {
    // 1. Cart load
    const savedCart = localStorage.getItem("spicenbliss_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart storage:", e);
      }
    }

    // 2. Products load
    const savedProducts = localStorage.getItem("spicenbliss_products");
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts) as Product[];
        const synced = parsed;

        // Add any missing default products
        products.forEach(defaultP => {
          if (!synced.some(p => p.id === defaultP.id)) {
            synced.push(defaultP);
          }
        });

        setProductsState(synced);
        localStorage.setItem("spicenbliss_products", JSON.stringify(synced));
      } catch (e) {
        console.error("Error parsing products storage:", e);
        setProductsState(products);
      }
    } else {
      setProductsState(products);
      localStorage.setItem("spicenbliss_products", JSON.stringify(products));
    }

    // 3. Orders load
    const savedOrders = localStorage.getItem("spicenbliss_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Error parsing orders storage:", e);
      }
    } else {
      const initialOrders: Order[] = [
        {
          id: "SB-582914",
          customerName: "Amina Touré",
          email: "amina.toure@example.com",
          address: "Rue des Jardins, Cocody",
          city: "Abidjan",
          zip: "00100",
          country: "Cote d'Ivoire",
          items: [
            {
              product: products[0],
              quantity: 2,
            },
            {
              product: products[1],
              quantity: 1,
            }
          ],
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString(),
          status: "Shipped",
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem("spicenbliss_orders", JSON.stringify(initialOrders));
    }

    // 4. Subscribers load
    const savedSubscribers = localStorage.getItem("spicenbliss_subscribers");
    if (savedSubscribers) {
      try {
        setSubscribers(JSON.parse(savedSubscribers));
      } catch (e) {
        console.error("Error parsing subscribers storage:", e);
      }
    } else {
      const initialSubscribers: Subscriber[] = [
        { email: "collector1@luxury.com", date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString() },
        { email: "artisan.love@craft.org", date: new Date(Date.now() - 12 * 60 * 60 * 1000).toLocaleString() }
      ];
      setSubscribers(initialSubscribers);
      localStorage.setItem("spicenbliss_subscribers", JSON.stringify(initialSubscribers));
    }
  }, []);

  // Save cart to local storage when changed
  useEffect(() => {
    localStorage.setItem("spicenbliss_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (newProduct: Product) => {
    setProductsState((prev) => {
      const updated = [...prev, newProduct];
      localStorage.setItem("spicenbliss_products", JSON.stringify(updated));
      return updated;
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setProductsState((prev) => {
      const updated = prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
      localStorage.setItem("spicenbliss_products", JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProduct = (productId: string) => {
    setProductsState((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      localStorage.setItem("spicenbliss_products", JSON.stringify(updated));
      return updated;
    });
  };

  const addOrder = (orderData: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...orderData,
      id: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      status: "Pending",
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem("spicenbliss_orders", JSON.stringify(updated));
      return updated;
    });
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status } : o));
      localStorage.setItem("spicenbliss_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const addSubscriber = (email: string) => {
    setSubscribers((prev) => {
      if (prev.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
        return prev;
      }
      const updated = [{ email, date: new Date().toLocaleString() }, ...prev];
      localStorage.setItem("spicenbliss_subscribers", JSON.stringify(updated));
      return updated;
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        products: productsState,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        addOrder,
        updateOrderStatus,
        subscribers,
        addSubscriber,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
