/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#241a2e',
        paper: '#fff8f9',
        denim: { DEFAULT: '#25325e', deep: '#192245', soft: '#e9ecf6' },
        thread: '#e8b04b',
        plum: '#5a2a4b',
      },
    },
  },
  plugins: [],
}
