/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        bg2: "#111111",
        card: "#161616",
        border: "#262626",
        primary: "#FFFFFF",
        secondary: "#A1A1AA",
        accent: "#6366F1",
        accent2: "#22C55E",
        highlight: "#38BDF8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
