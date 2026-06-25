import type { Metadata } from "next";
import React from "react";
import BannerSlider2 from "@/components/banner/BannerSlider2";
import BestFoodMenu from "@/components/common/BestFoodMenu";
import ContactForm from "@/components/common/ContactForm";
import CustomerFeedback from "@/components/common/CustomerFeedback";
import FoodPlaySection from "@/components/common/FoodPlaySection";
import OurResturent from "@/components/common/OurResturent";
import SkylineIntroSection from "@/components/common/SkylineIntroSection";
import TheBestFood from "@/components/common/TheBestFood";

const skylinePagePath = "/skyline";
const skylinePageUrl = `https://delhidarbargroup.com${skylinePagePath}`;
const skylineImageUrl = "https://delhidarbargroup.com/assets/images/home-1/video-thumbnail.png";
const tripAdvisorUrl =
  "https://www.tripadvisor.com/Restaurant_Review-g297513-d1213994-Reviews-Delhi_Darbar-Abidjan_Lagunes_Region.html";

const skylineStructuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Skyline by Delhi Darbar",
  url: skylinePageUrl,
  image: skylineImageUrl,
  description:
    "Skyline by Delhi Darbar is a rooftop Indian restaurant in Abidjan offering dinner, cocktails, skyline views, and reservations.",
  servesCuisine: ["Indian", "Rooftop Dining", "Cocktails"],
  telephone: "+2250575413751",
  email: "delhidarbarabidjan@gmail.com",
  menu: "https://delhidarbargroup.com/skyline/our-menu",
  sameAs: [tripAdvisorUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 5.3467201,
    longitude: -3.9446299,
  },
  openingHoursSpecification: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ].flatMap((dayOfWeek) => [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens: "12:00",
      closes: "15:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek,
      opens: "18:00",
      closes: "23:00",
    },
  ]),
  hasMap: "https://www.google.com/maps?q=5.3467201%2C-3.9446299&z=16&hl=en&output=embed",
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Delhi Darbar Group",
      item: "https://delhidarbargroup.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Skyline",
      item: skylinePageUrl,
    },
  ],
};

export const metadata: Metadata = {
  title: "Skyline Rooftop Restaurant in Abidjan",
  description:
    "Discover Skyline by Delhi Darbar, a rooftop Indian restaurant in Abidjan with skyline views, signature dishes, dinner service, and table reservations.",
  keywords: [
    "Skyline Delhi Darbar",
    "rooftop restaurant Abidjan",
    "Indian restaurant Abidjan",
    "Skyline menu",
    "Delhi Darbar Group",
    "restaurant reservations Abidjan",
  ],
  alternates: {
    canonical: skylinePagePath,
  },
  openGraph: {
    type: "website",
    url: skylinePagePath,
    title: "Skyline Rooftop Restaurant in Abidjan",
    description:
      "Rooftop Indian dining in Abidjan with skyline views, signature dishes, cocktails, and table reservations.",
    images: [
      {
        url: skylineImageUrl,
        width: 1200,
        height: 630,
        alt: "Skyline by Delhi Darbar rooftop dining experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skyline Rooftop Restaurant in Abidjan",
    description:
      "Explore Skyline by Delhi Darbar for rooftop dining, skyline views, dinner service, and reservations in Abidjan.",
    images: [skylineImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "CI",
    "geo.placename": "Abidjan",
    "geo.position": "5.3467201;-3.9446299",
    ICBM: "5.3467201, -3.9446299",
  },
};

export default function Home() {
  return (
    <main>
      <h1 className="sr-only">
        Skyline by Delhi Darbar is a rooftop Indian restaurant in Abidjan for dinner, cocktails, city views, and reservations.
      </h1>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(skylineStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />

      <BannerSlider2 />
      <SkylineIntroSection />
      <OurResturent />
      <FoodPlaySection />
      <BestFoodMenu />
      <TheBestFood />
      <ContactForm />
      <CustomerFeedback />
    </main>
  );
}
