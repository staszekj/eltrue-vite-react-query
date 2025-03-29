import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "client",
			remotes: {
				navbarReact: "http://localhost:3001/assets/remoteEntry.js",
				navbarWebComponent: "http://localhost:3002/assets/remoteEntry.js",
			},
			shared: ["react", "react-dom"],
		}),
	],
	server: {
		port: 5173,
		strictPort: true,
	},
	preview: {
		port: 3000,
		strictPort: true,
	},
	build: {
		modulePreload: false,
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
