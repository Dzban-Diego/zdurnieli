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
        secondary: "#fff",
        primary: "#111f90",

        accent: "#c395e0",
        font: "#6a6a6a",
        gray: "#6a6a6a",
        loading: "#5a5a5a",

        dark_background: "#272930",
        dark_secondary: "#191a1e",
        dark_font: "#ebecf0",

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
