/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mickey: {
          red: '#E52521',
          'red-dark': '#C51916',
          'red-light': '#FEE2E2',
          yellow: '#FDB813',
          'yellow-light': '#FEF3C7',
          black: '#191A23',
          onyx: '#272935',
          cream: '#FFFDF9',
          surface: '#F8F9FC',
          border: '#E8ECF2'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'playful': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'playful-red': '0 10px 25px -3px rgba(229, 37, 33, 0.25)',
        'playful-yellow': '0 10px 25px -3px rgba(253, 184, 19, 0.3)',
      }
    },
  },
  plugins: [],
}
