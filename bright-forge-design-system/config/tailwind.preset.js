/**
 * Bright Forge Tailwind CSS Preset
 *
 * Import this preset into your tailwind.config.js to use Bright Forge brand colors
 *
 * Usage in your tailwind.config.js:
 * module.exports = {
 *   presets: [require('./path/to/tailwind.preset.js')],
 *   // ... your other config
 * }
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          hover: '#ea580c',
        },
        accent: {
          pink: '#fdf2f8',
          green: '#22c55e',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
      },
      boxShadow: {
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
