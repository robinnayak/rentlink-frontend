/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#f7f8fa',
        'primary-text': '#333',
        'primary-btn': '#1D4ED8',
        'primary-btn-dark': '#1E40AF',
      },
      animation: {
        flash: 'flash 0.3s ease-in-out', // Define flash animation here
      },
      keyframes: {
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
