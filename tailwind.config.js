/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins' : ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

