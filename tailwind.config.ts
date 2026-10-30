import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F1117",
        panel: "#1A1C26",
        line: "#2A2D3D",
        paper: "#E6E8EE",
        muted: "#8A8F9E",
        coral: "#FF5C4D",
        beige: "#F5E6D3",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 70px rgba(255, 92, 77, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;