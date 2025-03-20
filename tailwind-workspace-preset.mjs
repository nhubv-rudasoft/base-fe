import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

export default {
  content: [
    './src/**/*.{ts,tsx}',
    '../../libs/ui/**/*.{ts,tsx}',
    '../../libs/features/auth/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.5rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      colors: {
        // Base colors
        primary: '#646CFF',
        secondary: '#FFD62E',
        accent: '#BD34FE',

        // Background colors
        background: '#FFFFFF',
        backgroundAlt: '#F8F9FA',
        backgroundDark: '#1A1B1E',
        backgroundDarkAlt: '#2C2D31',

        // Text colors
        text: '#1A1B1E',
        textSecondary: '#6C757D',
        textLight: '#FFFFFF',
        textLightSecondary: '#CED4DA',

        // Neutral/gray scale
        neutral50: '#F8F9FA',
        neutral100: '#E9ECEF',
        neutral200: '#DEE2E6',
        neutral300: '#CED4DA',
        neutral400: '#ADB5BD',
        neutral500: '#6C757D',
        neutral600: '#495057',
        neutral700: '#343A40',
        neutral800: '#212529',
        neutral900: '#121416',

        // Semantic/feedback colors
        success: '#10B981',
        warning: '#FBBF24',
        error: '#EF4444',
        info: '#3B82F6',

        // Border colors
        border: '#DEE2E6',
        borderFocus: '#FFD62E',

        // Shadow
        shadowLight: '0 2px 10px rgba(0, 0, 0, 0.05)',
        shadowMedium: '0 4px 20px rgba(0, 0, 0, 0.1)',
        shadowDark: '0 10px 30px rgba(0, 0, 0, 0.2)',
         
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
  plugins: [typography, forms], // Use the imported plugin
}
