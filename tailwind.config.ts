import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0C09",
        "ink-2": "#15120D",
        "ink-3": "#1C1812",
        paper: "#F7F3EA",
        cream: "#EBE3D2",
        gold: "#B8A45A",
        "gold-2": "#CBB668",
        "gold-deep": "#8C7A3E",
        muted: "#9C927E",
      },
      fontFamily: {
        mont: ["var(--font-montserrat)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: { content: "1180px" },
    },
  },
  plugins: [],
};

export default config;
