const sharedConfig = require("@delhidarbar/config/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Extend the shared design tokens
  ...sharedConfig,
  // NativeWind v4 preset
  presets: [require("nativewind/preset")],
  // Content paths for the mobile app + shared packages
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    ...sharedConfig.theme,
    extend: {
      // Only keep color tokens from the shared extend (skip backgroundImage — not relevant for RN)
    },
  },
  plugins: [],
};
