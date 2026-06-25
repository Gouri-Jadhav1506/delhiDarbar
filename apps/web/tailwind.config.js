/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const sharedConfig = require("@delhidarbar/config/tailwind");

module.exports = {
  // Spread the shared theme (colors, fonts, spacing, etc.)
  ...sharedConfig,
  // Content paths are local to this app
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    ...sharedConfig.theme,
    // Override container padding for mobile responsiveness
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        sm: '20px',
        md: '24px',
        lg: '32px',
        xl: '40px',
      },
    },
    extend: {
      ...sharedConfig.theme.extend,
    },
  },
  plugins: [
    flowbite.plugin(),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-stroke-1": {
            "-webkit-text-stroke": "1px #DF3F01",
          },
          ".text-stroke-2": {
            "-webkit-text-stroke": "1px #fff",
          },
          ".dashed-border": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            border: "1px dashed #DF3F01",
            width: "100%",
          },
          ".dashed-border2": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            border: "1px dashed #FB9015",
            width: "100%",
          },
          ".dashed-border3": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "0",
            border: "1px dashed #DD5903",
            width: "100%",
          },
        },
        ["before"]
      );
    },
  ],
};
