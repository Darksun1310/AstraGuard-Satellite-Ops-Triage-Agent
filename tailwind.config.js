/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#060913',
          900: '#0B1120',
          800: '#151F38',
          700: '#1E2D50',
          600: '#2C406E',
          cyan: '#00F0FF',
          amber: '#FFB800',
          rose: '#FF2A6D',
          emerald: '#00F5A0',
          purple: '#9D4EDD'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
