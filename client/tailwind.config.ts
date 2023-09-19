import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "background-primary": "var(--background-primary)",
        accent: "var(--accent)",
      },
      textColor: {
        "text-color": "var(--text)",
        accent: "var(--accent)",
      },
      borderColor: {
        accent: "var(--accent)",
        "border-color": "var(--input-border)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadowColor: {
        "shadow-color": "rgba(0,0,0,0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
