import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      colors: {
        black: "#0A0A0A",
        gold: {
          100: "#F3E5AB",
          200: "#E6C17A",
          500: "#D4AF37",
        },
        ivory: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;
