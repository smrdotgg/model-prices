import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { fileURLToPath } from "url";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
// const { resolve } = await import("path");
// import { resolve } from "node:path";

// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define resolve helper
const resolve = (...segments: string[]) => path.resolve(__dirname, ...segments);

export default defineConfig({
	plugins: [
		TanStackRouterVite({ autoCodeSplitting: true }),
		viteReact(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@": resolve("./src"),
		},
	},
});
