import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./apps/**/*.{ts,tsx}",
    "./packages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
