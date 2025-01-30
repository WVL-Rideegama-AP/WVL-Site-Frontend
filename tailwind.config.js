/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#A6D5FA",
          DEFAULT: "#2D9CDB",
          dark: "#1B6CA8",
        },
        secondary: {
          light: "#FCD34D",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
        accent: {
          light: "#FFB3C1",
          DEFAULT: "#F472B6",
          dark: "#BE185D",
        },
        neutral: {
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#1F2937",
        },
        // Add more custom colors as needed
      },
      fontFamily: {
        "josefin-sans": ['"Josefin Sans"', "sans-serif"],
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".josefin-sans-100": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "100",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
        ".josefin-sans-200": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "200",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
        ".josefin-sans-300": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "300",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
        ".josefin-sans-400": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "400",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
        ".josefin-sans-500": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "500",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
        ".josefin-sans-600": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "600",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
        ".josefin-sans-700": {
          fontFamily: '"Josefin Sans", sans-serif',
          fontWeight: "700",
          fontStyle: "normal",
          fontOpticalSizing: "auto",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
