import { defineConfig } from '@tanstack/start/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  tsconfigPath: './tsconfig.json',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
  },
})