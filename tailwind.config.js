/** @type {import('tailwindcss').Config} */
export default {
  // Указываем Tailwind, где искать классы для генерации CSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}