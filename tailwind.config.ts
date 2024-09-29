import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          }
        }
      },
      fontFamily: {
        serif: ["Lora", "var(--font-lora)"],
        sans: ["Nunito", "var(--font-nunito-sans)"],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
