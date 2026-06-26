export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number; // Added rating
  categoryType: 'food' | 'drink' | 'combo'; // Added grouping
  tag?: string;
  dietary?: 'veg' | 'non-veg' | 'vegan' | 'gluten-free' | 'halal';
  customizable?: boolean;
  spiceLevels?: string[];
  cuisine?: string[];
  spiceLevel?: 'mild' | 'medium' | 'spicy';
  allergens?: string[];
  ingredients?: string[];
  videoUrl?: string;
  addOns?: { id: string; name: string; price: number }[];
}

export interface MenuCategory {
  title: string;
  data: MenuItem[];
}

export const RESTAURANT_MENU: MenuCategory[] = [
  {
    title: 'Starters', // Simplified key for reliable i18n lookup
    data: [
      {
        id: 'st_1',
        name: 'Mutton Seekh Kebab',
        description: 'Minced mutton infused with traditional spices, charcoal-grilled on skewers.',
        price: 35.00,
        rating: 4.9,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1599487405270-e555ed1345dc?auto=format&fit=crop&w=400&q=80',
        dietary: 'halal',
        tag: 'Popular',
        cuisine: ['Tandoori'],
        spiceLevel: 'medium',
        ingredients: ['Mutton', 'Traditional Spices', 'Mint Chutney'],
      },
      {
        id: 'st_2',
        name: 'Tangdi Kabab',
        description: 'Succulent chicken drumsticks marinated in yogurt and Mughlai spices, char-grilled.',
        price: 38.00,
        rating: 4.8,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1610057099443-fde6c869a813?auto=format&fit=crop&w=400&q=80',
        dietary: 'halal',
        cuisine: ['Tandoori', 'BBQ'],
        spiceLevel: 'medium',
        ingredients: ['Chicken Drumsticks', 'Yogurt', 'Mughlai Spices'],
      },
      {
        id: 'st_3',
        name: 'Paneer Tikka',
        description: 'Cubes of cottage cheese marinated in a spiced yogurt blend and grilled to perfection.',
        price: 30.00,
        rating: 4.7,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80',
        dietary: 'veg',
        cuisine: ['North Indian'],
        spiceLevel: 'medium',
        ingredients: ['Paneer', 'Bell Peppers', 'Spiced Yogurt'],
      }
    ]
  },
  {
    title: 'Main Course',
    data: [
      {
        id: 'mc_1',
        name: 'Mughlai Mutton',
        description: 'Slow-cooked mutton in a signature rich and aromatic spiced Mughlai gravy.',
        price: 48.00,
        rating: 5.0,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1545247181-516773cae754?auto=format&fit=crop&w=400&q=80',
        dietary: 'halal',
        tag: 'Chef Choice',
        cuisine: ['Mughlai', 'North Indian'],
        spiceLevel: 'medium',
        ingredients: ['Mutton', 'Mughlai Spices', 'Saffron'],
        videoUrl: 'https://v.ftmcdn.net/sample/BigBuckBunny.mp4',
      },
      {
        id: 'mc_2',
        name: 'Skyline Butter Chicken',
        description: 'Char-grilled chicken simmered in a rich, velvety tomato and butter gravy.',
        price: 45.00,
        rating: 4.9,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80',
        dietary: 'halal',
        tag: 'Bestseller',
        cuisine: ['North Indian', 'Mughlai'],
        spiceLevel: 'mild',
        ingredients: ['Chicken', 'Cream', 'Tomato Puree', 'Butter'],
      },
      {
        id: 'mc_3',
        name: 'Dal Makhani',
        description: 'Creamy black lentils slow-cooked overnight with butter, cream, and subtle spices.',
        price: 32.00,
        rating: 4.8,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
        dietary: 'veg',
        cuisine: ['North Indian'],
        spiceLevel: 'mild',
        ingredients: ['Black Lentils', 'Butter', 'Cream'],
      }
    ]
  },
  {
    title: 'Biryani & Rice',
    data: [
      {
        id: 'br_1',
        name: 'Special Chicken Biryani',
        description: 'Long-grain basmati rice layered with spiced chicken; the Skyline signature.',
        price: 35.00,
        rating: 5.0,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1563379091339-0ca4b403970b?auto=format&fit=crop&w=400&q=80',
        dietary: 'halal',
        tag: 'Signature',
        cuisine: ['Biryani'],
        spiceLevel: 'spicy',
        ingredients: ['Basmati Rice', 'Spiced Chicken', 'Aromatic Spices'],
      },
      {
        id: 'br_2',
        name: 'Mutton Biryani',
        description: 'Fragrant basmati rice slow-cooked with tender mutton and aromatic spices.',
        price: 40.00,
        rating: 4.9,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=400&q=80',
        dietary: 'halal',
        cuisine: ['Biryani'],
        spiceLevel: 'spicy',
        ingredients: ['Basmati Rice', 'Tender Mutton', 'Aromatic Spices'],
      }
    ]
  },
  {
    title: 'Breads',
    data: [
       {
        id: 'bd_1',
        name: 'Butter Naan',
        description: 'Traditional leavened clay-oven bread brushed with fresh butter.',
        price: 6.00,
        rating: 4.6,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80',
        dietary: 'veg',
        cuisine: ['North Indian'],
        ingredients: ['Refined Flour', 'Butter'],
      }
    ]
  },
  {
    title: 'Desserts',
    data: [
      {
        id: 'ds_1',
        name: 'Ras Malai',
        description: 'Delicate paneer patties soaked in cardamom-flavored, saffron-sweetened milk.',
        price: 18.00,
        rating: 4.9,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1666190073498-2e19b9dc5342?auto=format&fit=crop&w=400&q=80',
        dietary: 'veg',
        ingredients: ['Paneer Patties', 'Milk', 'Saffron', 'Pistachios'],
      },
      {
        id: 'ds_2',
        name: 'Firni',
        description: 'Traditional creamy rice pudding flavored with cardamom and garnished with nuts.',
        price: 15.00,
        rating: 4.7,
        categoryType: 'food',
        image: 'https://images.unsplash.com/photo-1571006838831-602e0e80e809?auto=format&fit=crop&w=400&q=80',
        dietary: 'veg',
        ingredients: ['Rice', 'Milk', 'Cardamom', 'Nuts'],
      }
    ]
  }
];

