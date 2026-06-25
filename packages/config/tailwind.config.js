/**
 * Shared Tailwind design tokens for the Delhi Darbar platform.
 * Both apps/web and apps/mobile extend this config to keep
 * colors, fonts, spacing, and breakpoints consistent.
 *
 * NOTE: This file only contains the THEME / DESIGN TOKENS.
 * Each consuming app adds its own `content`, `plugins`, and `presets`.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    backgroundSize: {
      customBgSize: "90% 110%",
      customBgSize2: "97% 109%",
      customBgSize3: "100% 100%",
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"],
      "plus-jakarta-sans": ["Plus Jakarta Sans", "sans-serif"],
      satisfy: ["Satisfy", "cursive"],
      manrope: ["Manrope", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      "Work-Sans": ["Work Sans", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
      "Playfair-Display": ["Playfair Display", "sans-serif"],
      Yantramanav: ["Yantramanav", "sans-serif"],
      josefinsans: ["Josefin Sans", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      CormorantInfant: ["Cormorant Infant", "sans-serif"],
    },
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1272px",
    },
    colors: {
      // ── Brand: Skyline ──
      Cyan: "#1B3030",
      "Dark-Cyan-Green": "#0F2727",
      "Deep-Teal": "#102B2A",
      "Dark-Cyan": "#0D2221",
      Charcoal: "#141414",

      // ── Brand: Accent Gold ──
      "International-Orange": "#FFD84D",
      Amber: "#FFD84D",
      "Bright-Orange": "#FFD84D",
      "light-coral": "#FFD84D",
      Beer: "#FFD84D",
      "Burnt-Orange": "#FFD84D",

      // ── Neutrals ──
      Gray: "#888888",
      "Light-Gray": "#D9D9D9",
      "Lime-Green": "#CCFF00",

      // ── Brand: Spice n Blish ──
      "spice-rose": "#e11d48",
      "spice-rose-light": "#fda4af",

      // ── Brand: Skyline blue (mobile tab accent) ──
      "skyline-blue": "#0284c7",

      // ── Standard ──
      white: "#ffffff",
      black: "#000000",
      transparent: "transparent",
    },
    container: {
      center: true,
      padding: "12px",
    },
    extend: {
      backgroundImage: {
        shape: "url('/assets/images/shape.png')",
        "home-1": "url('/assets/images/home-1/hero-slider.png')",
        "home-1-play-bg": "url('/assets/images/home-1/play-video.png')",
        texture: "url('/assets/images/home-1/texture.png')",
        texture2: "url('/assets/images/home-3/texture.png')",
        "contact-form": "url('/assets/images/home-1/contact-form-bg.png')",
        "contact-form2": "url('/assets/images/home-3/contact-form-bg.png')",
        "hero-2": "url('/assets/images/home-2/hero_area.png')",
        "best-burger-place":
          "url('/assets/images/home-3/best-burger-place.png')",
      },
    },
  },
};
