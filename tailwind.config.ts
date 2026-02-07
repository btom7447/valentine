/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        valentine: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
      },
      fontFamily: {
        handwriting: ["Gloria Hallelujah", "cursive"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-heart": "pulse-heart 1.5s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-heart": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-valentine":
          "linear-gradient(135deg, #fecaca 0%, #fca5a5 25%, #f87171 50%, #ef4444 75%, #dc2626 100%)",
      },
      dropShadow: {
        glow: "0 0 10px rgba(239, 68, 68, 0.5)",
        "glow-strong": "0 0 20px rgba(239, 68, 68, 0.8)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};