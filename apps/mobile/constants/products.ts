// Shared product data for the e-commerce app
import incense from '../assets/images/products/incense.png';
import statue from '../assets/images/products/statue.png';
import seasonal_decor from '../assets/images/products/seasonal_decor.png';
import stone_bracelet from '../assets/images/products/stone_bracelet.png';
import dry_fruits from '../assets/images/products/dry_fruits.png';
import spices from '../assets/images/products/spices.png';
import essential_oils from '../assets/images/products/essential_oils.png';
import indian_attire from '../assets/images/products/indian_attire.png';
import artificial_jewellery from '../assets/images/products/artificial_jewellery.png';

// Angle 2
import incense_angle2 from '../assets/images/products/incense_angle2.png';
import statue_angle2 from '../assets/images/products/statue_angle2.png';
import seasonal_decor_angle2 from '../assets/images/products/seasonal_decor_angle2.png';
import stone_bracelet_angle2 from '../assets/images/products/stone_bracelet_angle2.png';
import dry_fruits_angle2 from '../assets/images/products/dry_fruits_angle2.png';
import spices_angle2 from '../assets/images/products/spices_angle2.png';
import essential_oils_angle2 from '../assets/images/products/essential_oils_angle2.png';
import indian_attire_angle2 from '../assets/images/products/indian_attire_angle2.png';
import artificial_jewellery_angle2 from '../assets/images/products/artificial_jewellery_angle2.png';

// Angle 3
import incense_angle3 from '../assets/images/products/incense_angle3.png';
import statue_angle3 from '../assets/images/products/statue_angle3.png';
import seasonal_decor_angle3 from '../assets/images/products/seasonal_decor_angle3.png';
import stone_bracelet_angle3 from '../assets/images/products/stone_bracelet_angle3.png';
import dry_fruits_angle3 from '../assets/images/products/dry_fruits_angle3.png';
import spices_angle3 from '../assets/images/products/spices_angle3.png';
import essential_oils_angle3 from '../assets/images/products/essential_oils_angle3.png';
import indian_attire_angle3 from '../assets/images/products/indian_attire_angle3.png';
import artificial_jewellery_angle3 from '../assets/images/products/artificial_jewellery_angle3.png';

export const productImages: Record<string, any> = {
  incense,
  statue,
  seasonal_decor,
  stone_bracelet,
  dry_fruits,
  spices,
  essential_oils,
  indian_attire,
  artificial_jewellery,
  incense_angle2,
  statue_angle2,
  seasonal_decor_angle2,
  stone_bracelet_angle2,
  dry_fruits_angle2,
  spices_angle2,
  essential_oils_angle2,
  indian_attire_angle2,
  artificial_jewellery_angle2,
  incense_angle3,
  statue_angle3,
  seasonal_decor_angle3,
  stone_bracelet_angle3,
  dry_fruits_angle3,
  spices_angle3,
  essential_oils_angle3,
  indian_attire_angle3,
  artificial_jewellery_angle3,
};

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;               // main image key
  images: string[];            // all image keys for gallery
  description: string;
  rating: number;
  reviewCount: number;
}

export const CATEGORIES = [
  { key: 'All', label: 'All', icon: 'grid' as const, color: '#FEA116' },
  { key: 'Incense', label: 'Incense', icon: 'flame' as const, color: '#FF8C42' },
  { key: 'Statues & Idols', label: 'Statues', icon: 'trophy' as const, color: '#E8B931' },
  { key: 'Seasonal Decor', label: 'Decor', icon: 'sparkles' as const, color: '#F06595' },
  { key: 'Stone Bracelets', label: 'Bracelets', icon: 'ellipse' as const, color: '#9775FA' },
  { key: 'Dry Fruits & Seeds', label: 'Dry Fruits', icon: 'nutrition' as const, color: '#66BB6A' },
  { key: 'Spices', label: 'Spices', icon: 'leaf' as const, color: '#FF7043' },
  { key: 'Essential Oils', label: 'Oils', icon: 'water' as const, color: '#42A5F5' },
  { key: 'Indian Attires', label: 'Attires', icon: 'shirt' as const, color: '#EC407A' },
  { key: 'Artificial Jewellery', label: 'Jewellery', icon: 'diamond' as const, color: '#FFD740' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Nag Champa Incense Sticks', price: 5.99, category: 'Incense',
    image: 'incense', images: ['incense', 'incense_angle2', 'incense_angle3'],
    description: 'Hand-rolled Nag Champa incense sticks made with natural herbs, resins, and essential oils. These premium sticks produce a calming, floral aroma that purifies your space and promotes relaxation during meditation and yoga.',
    rating: 4.7, reviewCount: 238,
  },
  {
    id: '2', name: 'Sandalwood Dhoop Cones', price: 7.49, category: 'Incense',
    image: 'incense', images: ['incense', 'incense_angle2', 'incense_angle3'],
    description: 'Premium sandalwood dhoop cones crafted from pure sandalwood powder. These cone-shaped incense pieces release a rich, woody fragrance that fills your home with warmth and serenity. Ideal for daily puja rituals.',
    rating: 4.5, reviewCount: 156,
  },
  {
    id: '3', name: 'Brass Ganesha Idol', price: 34.99, category: 'Statues & Idols',
    image: 'statue', images: ['statue', 'statue_angle2', 'statue_angle3'],
    description: 'Exquisitely handcrafted brass Ganesha idol with intricate detailing. This stunning murti features traditional motifs and a polished finish. Perfect for your home temple, office desk, or as a meaningful gift for auspicious occasions.',
    rating: 4.9, reviewCount: 312,
  },
  {
    id: '4', name: 'Marble Krishna Statue', price: 49.99, category: 'Statues & Idols',
    image: 'statue', images: ['statue', 'statue_angle2', 'statue_angle3'],
    description: 'Beautiful hand-carved marble Krishna statue depicting the divine flute-playing pose. Each piece is uniquely crafted by skilled artisans using premium white marble with hand-painted details in vibrant colors.',
    rating: 4.8, reviewCount: 189,
  },
  {
    id: '5', name: 'Diwali Diya Set', price: 14.99, category: 'Seasonal Decor',
    image: 'seasonal_decor', images: ['seasonal_decor', 'seasonal_decor_angle2', 'seasonal_decor_angle3'],
    description: 'Set of 12 beautifully hand-painted clay diyas for Diwali celebrations. Each diya features vibrant colors, mirror work, and traditional designs. Comes with cotton wicks — ready to light up your festivities.',
    rating: 4.6, reviewCount: 421,
  },
  {
    id: '6', name: 'Rangoli Stencil Kit', price: 9.99, category: 'Seasonal Decor',
    image: 'seasonal_decor', images: ['seasonal_decor', 'seasonal_decor_angle2', 'seasonal_decor_angle3'],
    description: 'Complete rangoli making kit with 8 reusable stencils in traditional Indian designs. Includes colored powder in 6 vibrant shades. Create stunning floor art effortlessly for festivals, pujas, and celebrations.',
    rating: 4.3, reviewCount: 167,
  },
  {
    id: '7', name: 'Tiger Eye Bracelet', price: 12.99, category: 'Stone Bracelets',
    image: 'stone_bracelet', images: ['stone_bracelet', 'stone_bracelet_angle2', 'stone_bracelet_angle3'],
    description: 'Natural tiger eye stone bead bracelet with stunning golden-brown chatoyancy. Known for boosting confidence and bringing clarity. Features 8mm polished beads on a durable elastic cord. One size fits most.',
    rating: 4.4, reviewCount: 284,
  },
  {
    id: '8', name: 'Amethyst Bead Bracelet', price: 15.99, category: 'Stone Bracelets',
    image: 'stone_bracelet', images: ['stone_bracelet', 'stone_bracelet_angle2', 'stone_bracelet_angle3'],
    description: 'Genuine amethyst crystal bead bracelet with deep purple hues. This healing stone bracelet promotes calm energy and spiritual awareness. Features premium 8mm beads strung on high-quality elastic for comfortable wear.',
    rating: 4.6, reviewCount: 197,
  },
  {
    id: '9', name: 'Premium Cashew Mix', price: 18.99, category: 'Dry Fruits & Seeds',
    image: 'dry_fruits', images: ['dry_fruits', 'dry_fruits_angle2', 'dry_fruits_angle3'],
    description: 'Premium roasted cashew assortment featuring whole W240 grade cashews, flavored in classic salted, pepper, and masala varieties. Sourced directly from Goa. Vacuum-sealed for maximum freshness. 500g pack.',
    rating: 4.8, reviewCount: 534,
  },
  {
    id: '10', name: 'Organic Chia Seeds', price: 8.99, category: 'Dry Fruits & Seeds',
    image: 'dry_fruits', images: ['dry_fruits', 'dry_fruits_angle2', 'dry_fruits_angle3'],
    description: 'Certified organic chia seeds packed with omega-3 fatty acids, fiber, and protein. These nutrient-dense superfoods are perfect for smoothies, yogurt bowls, puddings, and baking. 400g resealable pouch.',
    rating: 4.5, reviewCount: 312,
  },
  {
    id: '11', name: 'Kashmiri Saffron', price: 24.99, category: 'Spices',
    image: 'spices', images: ['spices', 'spices_angle2', 'spices_angle3'],
    description: 'Pure Kashmiri Mongra saffron — the world\'s finest. Hand-picked crimson threads with exceptional aroma, flavor, and color. Grade A1 certified. Perfect for biryani, desserts, and golden milk. 2g glass jar.',
    rating: 4.9, reviewCount: 678,
  },
  {
    id: '12', name: 'Garam Masala Blend', price: 6.99, category: 'Spices',
    image: 'spices', images: ['spices', 'spices_angle2', 'spices_angle3'],
    description: 'Authentic homestyle garam masala freshly ground from whole spices — cardamom, cinnamon, cloves, black pepper, and bay leaves. No preservatives or artificial colors. Brings rich warmth to any dish. 100g jar.',
    rating: 4.7, reviewCount: 445,
  },
  {
    id: '13', name: 'Lavender Essential Oil', price: 11.99, category: 'Essential Oils',
    image: 'essential_oils', images: ['essential_oils', 'essential_oils_angle2', 'essential_oils_angle3'],
    description: 'Pure lavender essential oil steam-distilled from fresh lavender flowers. Therapeutic grade for aromatherapy, relaxation, and better sleep. Can be used in diffusers, baths, and DIY skincare. 15ml amber bottle with dropper.',
    rating: 4.6, reviewCount: 389,
  },
  {
    id: '14', name: 'Tea Tree Oil Set', price: 16.99, category: 'Essential Oils',
    image: 'essential_oils', images: ['essential_oils', 'essential_oils_angle2', 'essential_oils_angle3'],
    description: 'Premium tea tree essential oil gift set with 3 bottles — pure tea tree, tea tree & eucalyptus blend, and tea tree & peppermint blend. 100% natural, perfect for skin care, hair care, and household cleaning. 3x 10ml.',
    rating: 4.5, reviewCount: 267,
  },
  {
    id: '15', name: 'Silk Embroidered Saree', price: 89.99, category: 'Indian Attires',
    image: 'indian_attire', images: ['indian_attire', 'indian_attire_angle2', 'indian_attire_angle3'],
    description: 'Luxurious Banarasi silk saree with intricate zari embroidery and golden border. Features traditional motifs woven with metallic threads. Comes with matching blouse piece. Perfect for weddings and festive occasions.',
    rating: 4.8, reviewCount: 156,
  },
  {
    id: '16', name: 'Cotton Kurta Pajama Set', price: 39.99, category: 'Indian Attires',
    image: 'indian_attire', images: ['indian_attire', 'indian_attire_angle2', 'indian_attire_angle3'],
    description: 'Comfortable pure cotton kurta pajama set with chikankari embroidery from Lucknow. Breathable fabric with elegant threadwork. Regular fit with side slits. Available in multiple sizes. Ideal for casual and semi-formal wear.',
    rating: 4.4, reviewCount: 203,
  },
  {
    id: '17', name: 'Kundan Necklace Set', price: 29.99, category: 'Artificial Jewellery',
    image: 'artificial_jewellery', images: ['artificial_jewellery', 'artificial_jewellery_angle2', 'artificial_jewellery_angle3'],
    description: 'Stunning kundan necklace set with matching jhumka earrings and maang tikka. Features polki-style glass stones set in a gold-plated base with meenakari work on the reverse. Hypoallergenic and tarnish-resistant.',
    rating: 4.7, reviewCount: 345,
  },
  {
    id: '18', name: 'Jhumka Earrings', price: 14.99, category: 'Artificial Jewellery',
    image: 'artificial_jewellery', images: ['artificial_jewellery', 'artificial_jewellery_angle2', 'artificial_jewellery_angle3'],
    description: 'Classic Indian jhumka earrings with dome-shaped bell design and pearl drops. Gold-plated with oxidized finish for an antique look. Lightweight and comfortable for all-day wear. Comes in a velvet pouch.',
    rating: 4.6, reviewCount: 412,
  },
];
