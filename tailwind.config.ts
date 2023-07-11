import { type Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "-sm": { max: "639px" }
      }
    }
  },
  plugins: []
} satisfies Config
