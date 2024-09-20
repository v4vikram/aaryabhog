/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",      // Keeps scanning files inside the src folder
    "./public/**/*.{html,js}",   // Add this if you have a public folder
    "./*.{html,js}",             // This will scan files in the root directory
    "./other-folder/**/*.{html,js}", // Scan files in another folder outside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
