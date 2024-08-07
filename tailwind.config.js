/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path based on your project structure
  ],
  theme: {
    extend: {
      // You can add custom configurations here
    },
  },
  plugins: [
    require('autoprefixer'), // Ensure correct plugin registration
  ],
};
