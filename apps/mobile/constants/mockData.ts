import { MenuItem } from './menuItems';

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  image: string;
  discount: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  day: string;
  month: string;
  time: string;
  description: string;
  longDescription: string;
  highlights: string[];
  image: string;
  category: string;
  djName?: string;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface PastOrder {
  id: string;
  date: string;
  items: { id: string; name: string; quantity: number; price: number }[];
  total: number;
  type: 'Dine-in' | 'Takeaway';
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  status: 'Pending' | 'Confirmed' | 'Completed';
  specialRequests?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export const OFFERS: Offer[] = [
  {
    id: 'off_1',
    title: 'Happy Hours',
    description: 'Get 50% off on all cocktails and mocktails.',
    code: 'HAPPY50',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    discount: '50% OFF',
  },
  {
    id: 'off_2',
    title: 'Weekend Feast',
    description: 'Complimentary dessert with every main course.',
    code: 'FEASTFREE',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    discount: 'FREE DESSERT',
  },
  {
    id: 'off_3',
    title: 'DJ Night Spark',
    description: 'Glow in the dark party with complimentary drinks.',
    code: 'GLOW24',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    discount: 'GLOW PARTY',
  }
];

export const EVENTS: Event[] = [
  {
    id: 'ev_1',
    title: 'Retro DJ Night',
    date: 'Friday, Oct 27',
    day: '27',
    month: 'OCT',
    time: '9:00 PM onwards',
    description: 'Groove to the best of 80s and 90s with DJ Max.',
    longDescription: 'Transport yourself back in time to the golden era of music. DJ Max spins the greatest hits from the 80s and 90s, creating an electric atmosphere of nostalgia and high energy. Perfect for those who love to dance and relive the classics.',
    highlights: ['Complimentary Drink for Ladies', 'Special Retro Cocktail Menu', 'Prizes for Best Retro Outfit'],
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?auto=format&fit=crop&w=800&q=80',
    category: 'DJ Night',
    djName: 'DJ Max',
  },
  {
    id: 'ev_2',
    title: 'Live Jazz & Wine',
    date: 'Saturday, Oct 28',
    day: '28',
    month: 'OCT',
    time: '7:30 PM onwards',
    description: 'A sophisticated evening with the Blue Note Quartet.',
    longDescription: 'Experience the soul-stirring melodies of the Blue Note Quartet as they perform live jazz in our intimate lounge. Paired with a curated selection of international wines and artisanal cheese boards, this is the ultimate evening of sophistication.',
    highlights: ['Curated Wine Flights', 'Artisanal Cheese Boards', 'Acoustic Soul Sessions'],
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
    category: 'Live Music',
    djName: 'Blue Note Quartet',
  },
  {
    id: 'ev_3',
    title: 'Sunday Brunch & Mimosa',
    date: 'Sunday, Oct 29',
    day: '29',
    month: 'OCT',
    time: '11:00 AM - 4:00 PM',
    description: 'Unlimited mimosas and chef-special brunch menu.',
    longDescription: 'The perfect way to end your week. Enjoy a leisure-filled afternoon with our unlimited mimosa station, fresh seafood tower, and a diverse range of gourmet brunch favorites prepared by Chef Lorenzo. Live soft acoustic music ensures the perfect vibe.',
    highlights: ['Unlimited Mimosa Flow', 'Seafood & Oyster Bar', 'Live Acoustic Session'],
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=800&q=80',
    category: 'Brunch',
    djName: 'Chef Lorenzo',
  }
];

export const VENUES: Venue[] = [
  {
    id: 'v_1',
    name: 'Skyline Rooftop',
    description: 'Open-air rooftop with breathtaking city views.',
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5ea?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'v_2',
    name: 'The Indoor Bar',
    description: 'Classic mahogany bar with warm ambient lighting.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'v_3',
    name: 'Private Booths',
    description: 'Intimate seating for a specialized experience.',
    image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80',
  }
];

export const MENU_CATEGORIES: Category[] = [
  {
    id: 'cat_cocktails',
    name: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cat_starters',
    name: 'Starters',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cat_main',
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cat_desserts',
    name: 'Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
  }
];

export const TRENDING_ITEMS_IDS = ['st_2', 'mc_1', 'dr_3', 'ds_1'];

export const PAST_ORDERS: PastOrder[] = [];
/*
export const PAST_ORDERS: PastOrder[] = [
  ...
];
*/

export const RESERVATIONS: Reservation[] = [];
/*
export const RESERVATIONS: Reservation[] = [
  ...
];
*/
