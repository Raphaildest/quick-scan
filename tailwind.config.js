/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ntt: {
          navy: '#071b33',
          dark: '#0c2340',
          blue: '#0a66c2',
          lightBlue: '#e8f2fc',
          cyan: '#16b8d4',
          emerald: '#16855b',
          amber: '#d97706',
          rose: '#c2413b'
        }
      }
    },
  },
  plugins: [],
}
