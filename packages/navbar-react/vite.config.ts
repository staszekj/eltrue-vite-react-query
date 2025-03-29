import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "navbar-react",
			filename: "remoteEntry.js",
			exposes: {
				"./NavBar": "./src/NavBar.tsx",
			},
			shared: ["react", "react-dom"],
		}),
	],
	preview: {
		port: 3001,
		strictPort: true,
	},
	build: {
		modulePreload: false,
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
