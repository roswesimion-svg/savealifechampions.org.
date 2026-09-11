/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070B14",
        panel: "#0E1526",
        panel2: "#121B31",
        gold: "#E8B34C",
        goldSoft: "#F4D68B",
        ember: "#FF4B5C",
        savanna: "#1B8C6B",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        goldGlow: "0 0 40px rgba(232,179,76,0.25)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
        riseIn: "riseIn 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
