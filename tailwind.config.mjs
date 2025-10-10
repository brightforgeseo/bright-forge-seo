/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-accent': '#f97316',
        'brand-accent-light': '#fed7aa',
        'brand-dark': '#1E2022',
        'brand-soft': '#52575D',
        'brand-bg': '#FFF6F5',
      },
      fontFamily: {
        'dm-sans': ['"DM Sans"', 'sans-serif'],
        'sans': ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
