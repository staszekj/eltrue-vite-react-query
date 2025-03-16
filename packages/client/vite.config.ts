import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	clearScreen: false,
	plugins: [react()],
	server: {
		host: true, // Listen on all addresses
		port: 5173,
		strictPort: true, // Don't try other ports if 5173 is taken
		proxy: {
			"/api": {
				target: "http://0.0.0.0:3000",
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
