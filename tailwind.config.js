/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scanLine: {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(0%)" },
        },
      },
      animation: {
        "scan-line": "scanLine 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
