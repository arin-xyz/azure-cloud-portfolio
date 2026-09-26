/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07101d",
        panel: "#0d1828",
        line: "#1b2a3d",
        accent: "#38bdf8",
        cyan: "#22d3ee",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,.22)",
      },
    },
  },
  plugins: [],
};
