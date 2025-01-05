/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',   // Include all files in the pages folder
    './src/components/**/*.{js,ts,jsx,tsx}', // Include all files in the components folder
    './src/styles/**/*.{css}', // Include custom styles folder if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',    // Primary brand color (Blue)
        secondary: '#9333EA',  // Secondary brand color (Purple)
        accent: '#FACC15',     // Accent color (Yellow)
        background: '#F3F4F6', // Light background color
        textLight: '#6B7280',  // Light text color
        textDark: '#1F2937',   // Dark text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Inter font for clean UI
        display: ['Poppins', 'sans-serif'], // Poppins for headings
      },
      spacing: {
        128: '32rem',
        144: '36rem',
        192: '48rem', // Additional spacing for larger components
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Slow spinning animation
        'fade-in': 'fadeIn 1s ease-in-out', // Fade-in animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        soft: '0 2px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for cards
        strong: '0 4px 16px rgba(0, 0, 0, 0.25)', // Strong shadow for modals
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
