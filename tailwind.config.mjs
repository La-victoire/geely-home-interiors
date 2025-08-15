export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        'irregular-frame': 'url(#irregular-frame)'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.clip-irregular': { 'clip-path': 'url(#irregular-frame)' }
      })
    }
  ],
};
