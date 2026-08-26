import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    typography,
  ],
} satisfies Config

export default config