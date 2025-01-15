/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2150e6', 
        myAccent: '#91ee4c',
        secondary: '#f4c685',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

