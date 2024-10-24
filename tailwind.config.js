/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Bao gồm cả các file React và TypeScript
  ],
  theme: {
    extend: {
      // Thêm style customize
      colors: {
        bgMainColor: "#011627",
        bgProfile: "#F9F9F9",
        bgMainBlur: "#344552",
        bgMainHover: "#52616C",
        hoverYellow: "#FFD253",
        mainYellow: "#F5BA13",
        mainCyan: "#20BEC6",
        gray100: "#9F9FA0",
        gray150: "#B1B1B3",
        gray200: "#5A5A5A",
        gray250: "#E7E7E7",
        gray300: "#202020",
        gray350: "#CCCCCC",
        gray400: "#353539",
        grayBorder: "#444444",
        textType: "rgba(255, 255, 255, 0.65)",
        textSidebar: "rgba(20, 20, 20, 0.72)",
        bgCheckBox: "rgba(255, 255, 255, 0.15)",
        borderSubdued: "rgba(255, 255, 255, 0.1)",
      },
      boxShadow: {
        navBoxshadow:
          "0 32px 16px #0000001a, 0 16px 8px #0000001a, 0 8px 4px #0000001a, 0 4px 2px #0000001a, 0 2px 1px #0000001a",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
