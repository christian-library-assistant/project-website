/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d7fe',
          300: '#a4bcfc',
          400: '#809af8',
          500: '#6078f1',
          600: '#4c59e5',
          700: '#4046cc',
          800: '#363ca4',
          900: '#303582',
          950: '#1e1f4b',
        },
        secondary: {
          50: '#f5f8fa',
          100: '#eef3f7',
          200: '#d8e5ed',
          300: '#b6cfdd',
          400: '#8db2c7',
          500: '#6d96b1',
          600: '#567c96',
          700: '#466478',
          800: '#3d5564',
          900: '#364756',
          950: '#232d38',
        },
        accent: {
          50: '#fff8ed',
          100: '#ffefd5',
          200: '#ffdaa9',
          300: '#ffbe71',
          400: '#fd9a38',
          500: '#fc7a12',
          600: '#ed5e08',
          700: '#c44508',
          800: '#9c380f',
          900: '#7d300f',
          950: '#431606',
        },
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}