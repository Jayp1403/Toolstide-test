/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all TS/TSX files in the app and components directories for class names.
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom wrapper class used in the layout for consistent width and padding.
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};