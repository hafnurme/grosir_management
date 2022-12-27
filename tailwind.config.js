/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      coolor: {
        palete: {
          50: "#FF9E00",
          100: "#FF9100",
          200: "#FF8500",
          300: "#FF6D00",
          400: "#FF5400",
          500: "#00B4D8",
          600: "#0096C7",
          700: "#0077B6",
          800: "#023E8A",
          900: "#03045E",
        },
      },
    },
  },
  plugins: [],
});
