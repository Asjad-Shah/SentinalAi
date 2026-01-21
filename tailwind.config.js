/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sardine-navy': '#0B1021',
        'sardine-dark-blue': '#1B2A4E',
        'sardine-blue-deep': '#0f172a',
        'midnight-deep': '#0B0C0E',
        'midnight-rich': '#0B0C0E',
        'sardine-purple': '#2D29D7',
        'sardine-purple-dark': '#070561',
        'sardine-purple-light': '#342BD5',
        'sardine-purple-bright': '#8521ED',
        'sardine-text': '#2E3238',
        'sardine-text-light': '#7E8DAA',
        'sardine-bg-light': '#F5F5FF',
        'sardine-footer': '#36B3E3',
        'sardine-light-blue': '#d9f1fc',
        'sardine-stats-blue': '#36B3E3',
        'sardine-bg-very-light': '#E6F5FC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      backgroundImage: {
        'gradient-sardine': 'linear-gradient(90deg, #36B3E3 -1.93%, #2D29D7 22.39%, #342BD5 66.64%, #8521ED 101.32%)',
        'gradient-sardine-2': 'linear-gradient(92deg, #36B3E3 -20.62%, #2D29D7 23.46%, #8521ED 132.67%)',
        'gradient-dark-purple': 'linear-gradient(135deg, #36B3E3 0%, #2D29D7 50%, #342BD5 100%)',
        'gradient-dark-card': 'linear-gradient(135deg, #36B3E3 0%, #2D29D7 50%, #342BD5 100%)',
        'gradient-footer': 'linear-gradient(180deg, #36B3E3 0%, #2D29D7 50%, #342BD5 100%)',
      },
    },
  },
  plugins: [],
}

