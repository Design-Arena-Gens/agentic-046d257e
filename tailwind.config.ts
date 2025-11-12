import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5fbff",
          100: "#e0f2ff",
          200: "#b9e0ff",
          300: "#83c6ff",
          400: "#4da2ff",
          500: "#1f7fff",
          600: "#0e5ee6",
          700: "#0b49b4",
          800: "#0d3f8b",
          900: "#0f335f"
        }
      }
    }
  },
  plugins: []
};

export default config;
