import { defineConfig } from '@tanstack/start/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 3000,
  },
})