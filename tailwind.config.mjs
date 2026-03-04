/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-accent': '#f0622a',
        'brand-accent-light': '#ff9a62',
        'brand-dark': '#0d0f1a',
        'brand-surface': '#131627',
        'brand-surface2': '#1a1e32',
        'brand-soft': '#7a7f99',
        'brand-text': '#e8eaf2',
        'brand-bg': '#0d0f1a',
        'brand-border': 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        'syne': ['"Syne"', 'sans-serif'],
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'sans': ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.4), 0 2px 10px -2px rgba(0, 0, 0, 0.2)',
        'soft-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow': '0 0 40px -10px rgba(240, 98, 42, 0.3)',
        'glow-lg': '0 0 60px -15px rgba(240, 98, 42, 0.4)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #f0622a 0%, #ff9a62 25%, #fdba74 50%, #f0622a 75%, #d4510e 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
