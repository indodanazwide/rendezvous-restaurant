/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        trendypink: '#9A669B', // Custom color
        mirage: '#1D1F33',     // Custom color
        mentis: '#7DB95B',     // Custom color
      },
    },
  },
  plugins: [],
};