// tailwind.config.js
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
  colors: {
    brand: {
      DEFAULT: '#111111', // 主色：近乎黑
      dark: '#000000',     // 深一階
      soft: '#e5e5e5',     // 很淺的灰（需要時用）
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.06)',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [forms, typography, lineClamp],
}

