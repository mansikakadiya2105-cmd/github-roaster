/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        card: 'var(--card)',
        'border-color': 'var(--border)',
      },
      fontFamily: {
        bangers: ['Bangers', 'system-ui'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
