/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a1627', // deep dark blue
        surface: '#101e36', // slightly lighter dark blue
        primary: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#3730a3', // indigo-800
          light: '#818cf8', // indigo-400
        },
        accent: '#38bdf8', // sky-400
        card: '#16213a',
        muted: '#64748b',
        border: '#334155',
        input: '#1e293b',
        // Additional dark theme colors
        dark: '#050e1a', // very dark blue
        darkAccent: '#60a5fa', // blue-400
      },
      textColor: {
        primary: '#e0e7ef', // light text
        secondary: '#a5b4fc', // indigo-300
        muted: '#64748b', // slate-500
        accent: '#93c5fd', // blue-300
      },
    },
  },
  plugins: [],
};
