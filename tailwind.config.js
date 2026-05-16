/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px", // было 1024px
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        brand: ["Unbounded", "sans-serif"],
        poetic: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
