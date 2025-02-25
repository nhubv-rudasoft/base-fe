// @ts-ignore
import type { Config } from 'tailwindcss';
// @ts-ignore
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1fb6ff',
        secondary: '#ff49db',
        accent: '#ff7849',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [typography], // Use the imported plugin
} satisfies Config;
