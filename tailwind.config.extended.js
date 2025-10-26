/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          // Existing colors (maintain compatibility)
          sand: '#E9D7B2',
          jaggery: '#4E3620',
          gold: '#D6A65E',
          cream: '#F6EBD5',
          dark: '#2E1C10',
          offwhite: '#F8F5ED',
          // New design system colors
          primary: {
            DEFAULT: '#C6862E',
            dark: '#A66F25',
            light: '#D89D4A',
          },
          secondary: {
            DEFAULT: '#4B2E2A',
            dark: '#3A2321',
            light: '#5C3935',
          },
          accent: {
            DEFAULT: '#B8860B',
            dark: '#9A7009',
            light: '#D4A020',
          },
          natural: {
            DEFAULT: '#6B8E23',
            dark: '#56721C',
            light: '#7FA62E',
          },
        },
        // Semantic colors
        success: '#6B8E23',
        error: '#D32F2F',
        warning: '#F57C00',
        info: '#1976D2',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'brand': '0 10px 15px -3px rgb(198 134 46 / 0.1), 0 4px 6px -4px rgb(198 134 46 / 0.1)',
        'brand-lg': '0 20px 25px -5px rgb(198 134 46 / 0.1), 0 8px 10px -6px rgb(198 134 46 / 0.1)',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideIn': 'slideIn 0.3s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },
  plugins: [],
};
