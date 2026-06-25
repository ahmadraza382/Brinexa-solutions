/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6C3FD4",
          cyan: "#00C9A7",
          dark: "#0D0D0D",
          navy: "#1A1A2E",
          border: "#2E2E4A",
          lavender: "#F5F0FF",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#AAAAAA",
          muted: "#888888",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "Poppins", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #6C3FD4 0%, #00C9A7 100%)",
        "gradient-dark": "linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 100%)",
      },
      borderRadius: {
        card: "16px",
        button: "50px",
      },
      boxShadow: {
        "glow-purple": "0 0 30px rgba(108, 63, 212, 0.5)",
        "card-hover": "0 20px 60px rgba(108, 63, 212, 0.25)",
        "glow-cyan": "0 0 30px rgba(0, 201, 167, 0.4)",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "infinite-scroll": {
          to: { transform: "translate(calc(-50% - 0.75rem))" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "scroll-x": "scroll-x 30s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "infinite-scroll":
          "infinite-scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [],
};
