
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        customOrange: '#DA4B26', // Custom color
      },
      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
        'sans-bold': ['Noto Sans', 'sans-serif'],
        'regular': ['Noto Serif', 'Regular 400'],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
