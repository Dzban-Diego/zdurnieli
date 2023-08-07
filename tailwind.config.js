/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#f5f5f5",
        primary: "#111f90",
        secondary: "#cf2116",
        liked: "#c395e0",
        textColor: "#6a6a6a",
        gray: "#6a6a6a",
        loading: "#5a5a5a",
        orange: "#fa0",

        dark_background: "#272930",
        primary: "#111f90",
        secondary: "#cf2116",
        liked: "#c395e0",
        dark_textColor: "#ebecf0",
        gray: "#6a6a6a",
        loading: "#5a5a5a",
        orange: "#fa0",
        black: "#000",
        white: "#fff",
      },
    },
    keyframes: {
      drive: {
        "0%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(2px)" },
        "100%": { transform: "translateY(0px)" },
      },
      ground: {
        "0%": { transform: "translateX(0px)" },
        "100%": { transform: "translateX(-400px)" },
      },
    },
    animation: {
      drive: "drive 1s ease-in-out infinite",
      ground: "ground 10s linear infinite",
    },
  },
  plugins: [],
};
