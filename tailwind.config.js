/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Bao gồm cả các file React và TypeScript
  ],
  theme: {
    extend: {
      colors: {
        bgMainColor: "#011627",
        mainYello: "#F5BA13",
        mainCyan: "#20BEC6",
        gray300: "#202020",
        grayBorder: "#444444",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
