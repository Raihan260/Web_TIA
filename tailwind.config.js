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
        ink: '#3a2f36',
        paper: '#fff9f7',
        blush: { DEFAULT: '#f6d5db', soft: '#fcebee' },
        sage: { DEFAULT: '#557560', deep: '#3f5a49', light: '#cfe0d1', soft: '#e7f0e8' },
        rose: { DEFAULT: '#b5566f', deep: '#9a4259' },
        thread: '#dcb48c',
      },
    },
  },
  plugins: [],
}
