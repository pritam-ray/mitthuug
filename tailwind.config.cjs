/** @type {import('tailwindcss').Config} *//** @type {import('tailwindcss').Config} *//** @type {import('tailwindcss').Config} *//** @type {import('tailwindcss').Config} */

module.exports = {

  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],module.exports = {

  theme: {

    extend: {  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],export default {export default {

      colors: {

        primary: {  theme: {

          DEFAULT: '#de5510',

          50: '#fef5f0',    extend: {  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

          100: '#fde8dc',

          200: '#fbd1b9',      colors: {

          300: '#f9b18f',

          400: '#f78a5e',        primary: {  theme: {  theme: {

          500: '#de5510',

          600: '#c74a0e',          DEFAULT: '#de5510',

          700: '#b44209',

          800: '#8f3507',          50: '#fef5f0',    extend: {    extend: {

          900: '#6b2805',

        },          100: '#fde8dc',

        secondary: {

          DEFAULT: '#f59e0b',          200: '#fbd1b9',      colors: {      colors: {

          50: '#fffbeb',

          100: '#fef3c7',          300: '#f9b18f',

          200: '#fde68a',

          300: '#fcd34d',          400: '#f78a5e',        // Primary Brand Color - Vibrant Orange        primary: {

          400: '#fbbf24',

          500: '#f59e0b',          500: '#de5510',

          600: '#d97706',

          700: '#b45309',          600: '#c74a0e',        primary: {          50: '#fef7ee',

          800: '#92400e',

          900: '#78350f',          700: '#b44209',

        },

      },          800: '#8f3507',          DEFAULT: '#de5510',          100: '#fdecd6',

      fontFamily: {

        display: ['Playfair Display', 'Georgia', 'serif'],          900: '#6b2805',

        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],

      },          light: '#ff6b2b',          50: '#fef5f0',          200: '#fad5ac',

    },

  },          dark: '#b44209',

  plugins: [],

};        },          100: '#fde8dc',          300: '#f6b677',


        secondary: {

          DEFAULT: '#f59e0b',          200: '#fbd1b9',          400: '#f18d40',

          50: '#fffbeb',

          100: '#fef3c7',          300: '#f9b18f',          500: '#ed6f1a',

          200: '#fde68a',

          300: '#fcd34d',          400: '#f78a5e',          600: '#de5510',

          400: '#fbbf24',

          500: '#f59e0b',          500: '#de5510',          700: '#b83f10',

          600: '#d97706',

          700: '#b45309',          600: '#c74a0e',          800: '#923315',

          800: '#92400e',

          900: '#78350f',          700: '#b44209',          900: '#762c14',

          light: '#fbbf24',

          dark: '#d97706',          800: '#8f3507',          950: '#401408',

        },

        success: {          900: '#6b2805',          DEFAULT: '#de5510',

          DEFAULT: '#10b981',

          50: '#ecfdf5',          light: '#ff6b2b',        },

          100: '#d1fae5',

          200: '#a7f3d0',          dark: '#b44209',        secondary: {

          300: '#6ee7b7',

          400: '#34d399',        },          50: '#f5f7fa',

          500: '#10b981',

          600: '#059669',        // Secondary Color - Amber/Gold          100: '#eaeff4',

          700: '#047857',

          800: '#065f46',        secondary: {          200: '#d0dce6',

          900: '#064e3b',

        },          DEFAULT: '#f59e0b',          300: '#a7bfcf',

        warning: {

          DEFAULT: '#f59e0b',          50: '#fffbeb',          400: '#789db4',

          50: '#fffbeb',

          100: '#fef3c7',          100: '#fef3c7',          500: '#57819c',

          200: '#fde68a',

          300: '#fcd34d',          200: '#fde68a',          600: '#446782',

          400: '#fbbf24',

          500: '#f59e0b',          300: '#fcd34d',          700: '#38536a',

          600: '#d97706',

          700: '#b45309',          400: '#fbbf24',          800: '#314759',

          800: '#92400e',

          900: '#78350f',          500: '#f59e0b',          900: '#2c3d4c',

        },

        error: {          600: '#d97706',          950: '#1d2832',

          DEFAULT: '#ef4444',

          50: '#fef2f2',          700: '#b45309',          DEFAULT: '#446782',

          100: '#fee2e2',

          200: '#fecaca',          800: '#92400e',        },

          300: '#fca5a5',

          400: '#f87171',          900: '#78350f',        success: {

          500: '#ef4444',

          600: '#dc2626',          light: '#fbbf24',          50: '#f0fdf4',

          700: '#b91c1c',

          800: '#991b1b',          dark: '#d97706',          100: '#dcfce7',

          900: '#7f1d1d',

        },        },          200: '#bbf7d0',

        danger: {

          DEFAULT: '#ef4444',        // Utility Colors          300: '#86efac',

          50: '#fef2f2',

          100: '#fee2e2',        success: {          400: '#4ade80',

          200: '#fecaca',

          300: '#fca5a5',          DEFAULT: '#10b981',          500: '#22c55e',

          400: '#f87171',

          500: '#ef4444',          50: '#ecfdf5',          600: '#16a34a',

          600: '#dc2626',

          700: '#b91c1c',          100: '#d1fae5',          700: '#15803d',

          800: '#991b1b',

          900: '#7f1d1d',          200: '#a7f3d0',          800: '#166534',

        },

        gray: {          300: '#6ee7b7',          900: '#14532d',

          50: '#fafaf9',

          100: '#f5f5f4',          400: '#34d399',          950: '#052e16',

          200: '#e7e5e4',

          300: '#d6d3d1',          500: '#10b981',          DEFAULT: '#22c55e',

          400: '#a8a29e',

          500: '#78716c',          600: '#059669',        },

          600: '#57534e',

          700: '#44403c',          700: '#047857',        warning: {

          800: '#292524',

          900: '#1c1917',          800: '#065f46',          50: '#fffbeb',

        },

        background: {          900: '#064e3b',          100: '#fef3c7',

          DEFAULT: '#ffffff',

          light: '#fafaf9',        },          200: '#fde68a',

          dark: '#1c1917',

          cream: '#fef5f0',        warning: {          300: '#fcd34d',

        },

      },          DEFAULT: '#f59e0b',          400: '#fbbf24',

      fontFamily: {

        display: ['Playfair Display', 'Georgia', 'serif'],          50: '#fffbeb',          500: '#f59e0b',

        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],

        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],          100: '#fef3c7',          600: '#d97706',

      },

      fontSize: {          200: '#fde68a',          700: '#b45309',

        xs: ['0.75rem', { lineHeight: '1rem' }],

        sm: ['0.875rem', { lineHeight: '1.25rem' }],          300: '#fcd34d',          800: '#92400e',

        base: ['1rem', { lineHeight: '1.5rem' }],

        lg: ['1.125rem', { lineHeight: '1.75rem' }],          400: '#fbbf24',          900: '#78350f',

        xl: ['1.25rem', { lineHeight: '1.75rem' }],

        '2xl': ['1.5rem', { lineHeight: '2rem' }],          500: '#f59e0b',          950: '#451a03',

        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],

        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],          600: '#d97706',          DEFAULT: '#f59e0b',

        '5xl': ['3rem', { lineHeight: '1.2' }],

        '6xl': ['3.75rem', { lineHeight: '1' }],          700: '#b45309',        },

        '7xl': ['4.5rem', { lineHeight: '1' }],

        '8xl': ['6rem', { lineHeight: '1' }],          800: '#92400e',        danger: {

        '9xl': ['8rem', { lineHeight: '1' }],

      },          900: '#78350f',          50: '#fef2f2',

      spacing: {

        18: '4.5rem',        },          100: '#fee2e2',

        88: '22rem',

        112: '28rem',        error: {          200: '#fecaca',

        128: '32rem',

      },          DEFAULT: '#ef4444',          300: '#fca5a5',

      borderRadius: {

        '4xl': '2rem',          50: '#fef2f2',          400: '#f87171',

      },

      boxShadow: {          100: '#fee2e2',          500: '#ef4444',

        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',          200: '#fecaca',          600: '#dc2626',

        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',

        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',          300: '#fca5a5',          700: '#b91c1c',

        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',          400: '#f87171',          800: '#991b1b',

        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

        none: 'none',          500: '#ef4444',          900: '#7f1d1d',

      },

      zIndex: {          600: '#dc2626',          950: '#450a0a',

        0: '0',

        10: '10',          700: '#b91c1c',          DEFAULT: '#ef4444',

        20: '20',

        30: '30',          800: '#991b1b',        },

        40: '40',

        50: '50',          900: '#7f1d1d',        brand: {

        dropdown: '1000',

        sticky: '1020',        },          sand: '#E9D7B2',

        fixed: '1030',

        modal: '1040',        danger: {          jaggery: '#4E3620',

        popover: '1050',

        tooltip: '1060',          DEFAULT: '#ef4444',          gold: '#D6A65E',

      },

      transitionProperty: {          50: '#fef2f2',          cream: '#F6EBD5',

        height: 'height',

        spacing: 'margin, padding',          100: '#fee2e2',          dark: '#2E1C10',

      },

      animation: {          200: '#fecaca',          offwhite: '#F8F5ED',

        'fade-in': 'fadeIn 0.3s ease-in-out',

        'fade-out': 'fadeOut 0.3s ease-in-out',          300: '#fca5a5',        },

        'slide-in': 'slideIn 0.3s ease-out',

        'slide-out': 'slideOut 0.3s ease-out',          400: '#f87171',        background: {

        'bounce-slow': 'bounce 3s infinite',

      },          500: '#ef4444',          light: '#FAFAF9',

      keyframes: {

        fadeIn: {          600: '#dc2626',          DEFAULT: '#FFFFFF',

          '0%': { opacity: '0' },

          '100%': { opacity: '1' },          700: '#b91c1c',        },

        },

        fadeOut: {          800: '#991b1b',      },

          '0%': { opacity: '1' },

          '100%': { opacity: '0' },          900: '#7f1d1d',      fontFamily: {

        },

        slideIn: {        },        display: ['Playfair Display', 'Georgia', 'serif'],

          '0%': { transform: 'translateX(100%)' },

          '100%': { transform: 'translateX(0)' },        // Neutral Grays        sans: ['Inter', 'system-ui', 'sans-serif'],

        },

        slideOut: {        gray: {      },

          '0%': { transform: 'translateX(0)' },

          '100%': { transform: 'translateX(100%)' },          50: '#fafaf9',      borderRadius: {

        },

      },          100: '#f5f5f4',        '2xl': '1.5rem',

    },

  },          200: '#e7e5e4',        '3xl': '2rem',

  plugins: [],

};          300: '#d6d3d1',      },


          400: '#a8a29e',    },

          500: '#78716c',  },

          600: '#57534e',  plugins: [],

          700: '#44403c',};

          800: '#292524',
          900: '#1c1917',
        },
        // Background Colors
        background: {
          DEFAULT: '#ffffff',
          light: '#fafaf9',
          dark: '#1c1917',
          cream: '#fef5f0',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none': 'none',
      },
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal': '1040',
        'popover': '1050',
        'tooltip': '1060',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-out': 'slideOut 0.3s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
