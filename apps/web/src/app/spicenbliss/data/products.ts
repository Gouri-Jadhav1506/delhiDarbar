export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Bracelets" | "Earrings" | "Accessories";
  image: string;
  rating: number;
  reviews: number;
  desc: string;
  details: string[];
  materials: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Elysian Amber Bracelet",
    price: 120,
    category: "Bracelets",
    image: "/assets/images/spicenbliss/bracelet_1.jpg",
    rating: 4.8,
    reviews: 24,
    desc: "Handcrafted from genuine Baltic amber beads and 18k gold-plated accents, this bracelet exudes warmth and serenity.",
    materials: "Genuine Baltic Amber beads, 18k Gold-Plated Brass, High-elastic stretch cord.",
    details: [
      "Individually selected natural amber beads",
      "Stretches to fit most wrist sizes comfortably (7 - 7.5 inches)",
      "Comes in a luxurious, sustainable Linen Gift Pouch",
      "Handcrafted by local artisans"
    ]
  },
  {
    id: "2",
    name: "Ethnic Pink Stone Oxidized Earrings",
    price: 85,
    category: "Earrings",
    image: "/assets/images/spicenbliss/earrings_1.png",
    rating: 4.9,
    reviews: 18,
    desc: "A pair of oxidized silver-tone ethnic earrings featuring a pink stone centerpiece, intricate sunburst detailing, and dangling white pearl beads.",
    materials: "Oxidized Silver-tone Metal, Pink Stone Centerpiece, White Pearl Beads.",
    details: [
      "Pair of oxidized silver-tone ethnic earrings",
      "Pink stone centerpiece with intricate sunburst detailing",
      "Dangling white pearl beads",
      "Perfect for ethnic wear and special occasions"
    ]
  },
  {
    id: "3",
    name: "Solaris Aura Cuff",
    price: 150,
    category: "Accessories",
    image: "/assets/images/spicenbliss/cuff_1.jpg",
    rating: 4.7,
    reviews: 12,
    desc: "A bold, minimalist brass cuff with a hammered texture that catches the light like radiant solar rays.",
    materials: "Premium solid Brass with a tarnish-resistant protective coating.",
    details: [
      "Hand-hammered texture creates a unique reflective facade",
      "Slightly adjustable open design to fit most wrists",
      "Width: 1.2 inches",
      "Polished inside for maximum comfort"
    ]
  },
  {
    id: "4",
    name: "Celestial Moonstone Drop",
    price: 95,
    category: "Earrings",
    image: "/assets/images/spicenbliss/earrings_2.jpg",
    rating: 5.0,
    reviews: 31,
    desc: "Enchanting rose gold drop earrings showcasing natural rainbow moonstones that shimmer with ethereal blue hues.",
    materials: "14k Rose Gold-filled wire, Natural Cabochon Moonstone.",
    details: [
      "Genuine bezel-set rainbow moonstones",
      "Secure push-back posts",
      "Shimmers beautifully in direct sunlight",
      "Designed for sensitive ears"
    ]
  },
  {
    id: "5",
    name: "Zanzibar Spice Anklet",
    price: 75,
    category: "Accessories",
    image: "/assets/images/spicenbliss/anklet_1.jpg",
    rating: 4.6,
    reviews: 15,
    desc: "A vibrant, delicate anklet beaded with natural carnelian and agate stone beads, celebrating warmth and spice.",
    materials: "Natural Carnelian, Red Agate, 14k Gold-filled spacer beads.",
    details: [
      "9-inch length with a 1-inch extender chain",
      "Vibrant sunset hues that inspire confidence",
      "Water-resistant gold-filled clasp",
      "Perfect addition to summer outfits"
    ]
  },
  {
    id: "6",
    name: "Blissful Harmony Choker",
    price: 110,
    category: "Bracelets",
    image: "/assets/images/spicenbliss/choker_1.jpg",
    rating: 4.8,
    reviews: 20,
    desc: "A fine 14k gold-filled link chain choker featuring a singular, high-lustre freshwater pearl for absolute balance.",
    materials: "14k Gold-filled chain, AA+ Quality Freshwater Cultured Pearl.",
    details: [
      "Adjustable length: 14 to 16 inches",
      "Hand-selected 8mm freshwater pearl",
      "Ultra-fine minimalist chain",
      "Lobster-claw clasp closure"
    ]
  },
  {
    id: "7",
    name: "Oxidized Statement Ring",
    price: 65,
    category: "Accessories",
    image: "/assets/images/spicenbliss/ring_1.png",
    rating: 4.9,
    reviews: 42,
    desc: "An oxidized silver-tone adjustable statement ring featuring intricate elephant and peacock motifs, embellished with floral detailing, white bead accents, and colored stones for a traditional ethnic look.",
    materials: "Oxidized Silver-tone Metal, Colored Stones, White Bead Accents.",
    details: [
      "Adjustable design fits most ring sizes comfortably",
      "Intricate traditional elephant and peacock motifs",
      "Embellished with floral detailing and white bead accents",
      "A stunning fashion accessory for a traditional ethnic look"
    ]
  }
];
