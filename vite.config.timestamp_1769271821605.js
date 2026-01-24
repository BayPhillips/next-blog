// vite.config.ts
import { defineConfig } from "@tanstack/start/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
var vite_config_default = defineConfig({
  tsconfigPath: "./src/tsconfig.json",
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
