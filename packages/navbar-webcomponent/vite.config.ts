import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		federation({
			name: "navbar-webcomponent",
			filename: "remoteEntry.js",
			exposes: {
				"./NavBar": "./src/NavBar.ts",
			},
		}),
	],
	preview: {
		port: 3002,
		strictPort: true,
	},
	build: {
		modulePreload: false,
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
	},
});
