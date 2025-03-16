import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    // Enable code-splitting
    rollupOptions: {
      input: {
        main: "index.html",
        sandbox: "packages/sandbox/src/index.ts",
      },
    },
  },
});
