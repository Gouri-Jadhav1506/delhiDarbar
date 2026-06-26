import { Linking } from 'react-native';
import { CartItem } from '../contexts/RestaurantCartContext';

export const generateWhatsAppMessage = (
  cart: CartItem[], 
  total: number, 
  userName?: string, 
  tableNumber?: string
) => {
  const businessNumber = '1234567890'; // Replace with actual resto-bar WhatsApp number
  
  let message = `*New Order from Skyline* \uD83C\uDF78\n\n`;
  
  if (userName) message += `*Customer:* ${userName}\n`;
  if (tableNumber) message += `*Table:* ${tableNumber}\n`;
  message += `--------------------------\n`;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* x ${item.quantity}\n`;
    if (item.selectedSpice) message += `   - Spice: ${item.selectedSpice}\n`;
    if (item.selectedAddOns && item.selectedAddOns.length > 0) {
      message += `   - Add-ons: ${item.selectedAddOns.map(a => a.name).join(', ')}\n`;
    }
    message += `   Price: $${item.lineTotal.toFixed(2)}\n\n`;
  });

  message += `--------------------------\n`;
  message += `*Total Amount: $${total.toFixed(2)}*\n\n`;
  message += `Please confirm my order. Thank you!`;

  const url = `whatsapp://send?phone=${businessNumber}&text=${encodeURIComponent(message)}`;
  
  return url;
};

export const openWhatsApp = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      // Fallback to web link if app not installed
      const webUrl = url.replace('whatsapp://send', 'https://wa.me');
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    console.error('Error opening WhatsApp:', error);
  }
};

// ─── Retail / E-Commerce Order Inquiry ────────────────────────
export interface RetailOrderItem {
  name: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface ShippingDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}

export const generateRetailWhatsAppMessage = (
  items: RetailOrderItem[],
  total: number,
  shipping: ShippingDetails
): string => {
  const retailPhone = '919000000000'; // Dedicated retail WhatsApp number

  let message = `*🛍️ Retail Order Inquiry — Spice and Bliss*\n\n`;
  message += `*Customer:* ${shipping.name}\n`;
  message += `*Phone:* ${shipping.phone}\n`;
  message += `*Shipping Address:* ${shipping.address}, ${shipping.city}\n`;
  if (shipping.notes) message += `*Notes:* ${shipping.notes}\n`;
  message += `\n--------------------------\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* x ${item.quantity}\n`;
    message += `   $${item.price.toFixed(2)} each — $${item.lineTotal.toFixed(2)}\n\n`;
  });

  message += `--------------------------\n`;
  message += `*Estimated Total: $${total.toFixed(2)}*\n\n`;
  message += `Please confirm availability, shipping cost, and payment details. Thank you!`;

  return `whatsapp://send?phone=${retailPhone}&text=${encodeURIComponent(message)}`;
};
