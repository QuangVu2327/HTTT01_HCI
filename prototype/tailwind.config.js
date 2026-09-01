/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atlassian: {
          blue: "#0052CC",
          blueHover: "#0065FF",
          bg: "#F7F8F9",
          card: "#FFFFFF",
          border: "#DFE1E6",
          text: "#172B4D",
          textSub: "#6B778C",
        },
        status: {
          todoBg: "#DFE1E6",
          todoText: "#42526E",
          doingBg: "#FFF0B3",
          doingText: "#974F0C",
          doneBg: "#E3FCEF",
          doneText: "#006644",
          overdueBg: "#FFEBE6",
          overdueText: "#BF2600",
        },
        score: {
          high: "#00875A",
          med: "#FFAB00",
          low: "#DE350B",
        }
      },
      fontFamily: {
        sans: ["Inter", "Be Vietnam Pro", "system-ui", "-apple-system", "sans-serif"],
      }
    },
  },
  plugins: [],
}
