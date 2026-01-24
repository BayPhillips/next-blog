// vite.config.ts
import { defineConfig } from "@tanstack/start/config";
import react from "@vitejs/plugin-react";
var vite_config_default = defineConfig({
  plugins: [
    react()
  ],
  server: {
    port: 3e3
  }
});
export {
  vite_config_default as default
};
