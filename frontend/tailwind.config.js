/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: '#3490dc',
        secondary: '#f1c40f',
        success: '#2ecc71',
        success2 : '#45FFCA',
        danger: '#e74c3c',
        warning: '#f39c12',
        info: '#34495e',
        light: '#ecf0f1',
        dark: '#34495e',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}