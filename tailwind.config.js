/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-white',
    'bg-black',
    'text-white',
    'text-black',
    'border-white',
    'border-black',
    'dark:bg-white',
    'dark:bg-black',
    'dark:text-white',
    'dark:text-black',
    'dark:border-white',
    'dark:border-black',
    {
      pattern: /bg-(white|black)\/\d+/,
    },
    {
      pattern: /border-(white|black)\/\d+/,
    },
    {
      pattern: /text-(white|black)\/\d+/,
    },
    {
      pattern: /dark:bg-(white|black)\/\d+/,
      variants: ['dark'],
    },
    {
      pattern: /dark:text-(white|black)\/\d+/,
      variants: ['dark'],
    },
    {
      pattern: /dark:border-(white|black)\/\d+/,
      variants: ['dark'],
    }
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
} 