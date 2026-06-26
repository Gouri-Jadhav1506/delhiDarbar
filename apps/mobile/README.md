# Delhi Darbar — Multi-Experience Mobile App

A premium **React Native** mobile application built with **Expo SDK 54**, serving as the unified digital platform for the **Delhi Darbar Group**. From a single app, customers can dine at **Skyline** restaurant, book tables, attend events, or shop on the **Spice & Bliss** e-commerce store.

---

## ✨ Highlights

- 🎨 **Premium dark-theme UI** with glassmorphism, smooth animations (Reanimated), and micro-interactions
- 🌐 **Bilingual** — full English & French support via i18next
- 📱 **Expo Router** file-based navigation with typed routes
- 💾 **Persistent state** using AsyncStorage
- 📷 **QR code scanning** for dine-in table ordering
- 💬 **WhatsApp integration** for order inquiries & event RSVPs
- 🔐 **Guest authentication** with OTP verification modal

---

## 🍽️ Skyline — Restaurant & Events

| Feature | Description |
|---|---|
| **Menu Browsing** | Full restaurant menu with category-based filtering and item customization |
| **Dine-In Ordering** | Scan a QR code at your table to browse and place orders |
| **Takeaway** | Place a takeaway order with a streamlined checkout |
| **Table Reservations** | Book a table by selecting date, time, guest count & seating preferences |
| **Booking Management** | View, modify, or cancel upcoming reservations |
| **Events** | Browse live events, view details, and RSVP via WhatsApp |
| **Ambience** | Explore the restaurant's atmosphere and venues |

---

## 🛍️ Spice & Bliss — E-Commerce

| Feature | Description |
|---|---|
| **Product Catalog** | Browse products across categories (spices, attires & more) |
| **Product Details** | View detailed descriptions, pricing, and imagery |
| **Wishlist** | Save items for later |
| **Cart & Checkout** | Full cart management with bill summary and WhatsApp order inquiry |
| **User Accounts** | Register, login, and manage your profile |

---

## 🏗️ Project Structure

```
app/
├── (tabs)/                  # Skyline restaurant tabs
│   ├── index.tsx            #   Home
│   ├── menu.tsx             #   Menu
│   ├── events.tsx           #   Events listing
│   ├── explore.tsx          #   Explore / Ambience
│   ├── cart.tsx             #   Restaurant cart
│   ├── profile.tsx          #   User profile
│   └── event/[id].tsx       #   Event detail
│   └── reservation/[id].tsx #   Reservation detail
├── restaurant/              # Restaurant-specific flows
│   ├── menu.tsx             #   Full menu with table context
│   ├── book-table.tsx       #   Table reservation form
│   ├── booking-success.tsx  #   Confirmation screen
│   ├── my-bookings.tsx      #   Booking history
│   ├── order-type.tsx       #   Dine-in vs takeaway
│   └── customize.tsx        #   Item customization
├── ecommerce/               # Spice & Bliss e-commerce
│   ├── (tabs)/              #   E-commerce tabs
│   │   ├── home.tsx         #     Shop home
│   │   ├── categories.tsx   #     Category browser
│   │   ├── cart.tsx         #     Shopping cart
│   │   ├── wishlist.tsx     #     Wishlist
│   │   ├── contact.tsx      #     Contact & directions
│   │   └── profile.tsx      #     Account profile
│   ├── product/             #   Product detail pages
│   ├── category/            #   Category listing pages
│   ├── login.tsx            #   E-commerce login
│   └── register.tsx         #   E-commerce registration
├── selection.tsx             # App entry — choose experience
├── fulfillment.tsx           # Dine-in / Takeaway selector
├── scanner.tsx               # QR code table scanner
├── language-selection.tsx    # Language picker
└── premium-splash.tsx        # Animated splash screen

components/                   # Shared UI components
├── AnimatedPressable.tsx     # Pressable with scale animation
├── LoginModal.tsx            # OTP verification modal
├── LanguageToggle.tsx        # EN/FR language switcher
├── EmptyState.tsx            # Empty state illustrations
└── SkeletonLoader.tsx        # Loading skeleton placeholders

contexts/                     # React Context providers
├── AuthContext.tsx            # Authentication state
├── BookingContext.tsx          # Table reservation state
├── RestaurantCartContext.tsx   # Restaurant cart state
├── RetailCartContext.tsx       # E-commerce cart state
├── TableContext.tsx            # Active table (QR scan) state
└── WishlistContext.tsx         # E-commerce wishlist state

src/i18n/                     # Internationalization
├── translations/
│   ├── en.json               # English translations
│   └── fr.json               # French translations
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator / Android Emulator or [Expo Go](https://expo.dev/go) on a physical device

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/delhi-darbar-app.git
cd delhi-darbar-app

# Install dependencies
npm install

# Start the development server
npx expo start
```

Scan the QR code with Expo Go (Android) or use the Camera app (iOS) to open the app on your device.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) | Cross-platform mobile framework |
| [Expo SDK 54](https://expo.dev/) | Managed workflow & native APIs |
| [Expo Router](https://docs.expo.dev/router/) | File-based routing with typed routes |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Performant animations |
| [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) | Internationalization (EN/FR) |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistent local storage |
| [Expo Camera](https://docs.expo.dev/versions/latest/sdk/camera/) | QR code scanning |
| [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) | Glassmorphism effects |
| TypeScript | Type-safe development |

---

## 📄 License

This project is private and proprietary to the Delhi Darbar Group.

---

<p align="center">
  <b>DELHI DARBAR GROUP</b><br/>
  <sub>EST. 1999 · A World of Flavors & Scents</sub>
</p>
