import type { Item } from "api/src/types";
import type { Request, Response } from "express";
import express from "express";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sampleDataJson = JSON.parse(
	readFileSync(join(__dirname, "./sample_data.json"), "utf-8"),
);

const data: Item[] = sampleDataJson;

app.get("/api/search", (req: Request, res: Response) => {
	const query = req.query.q?.toString().toLowerCase() ?? "";
	const results = data.filter((item) => {
		return item.name.toLowerCase().includes(query);
	});

	setTimeout(() => {
		res.json(results);
	}, 2000);
});

app
	.listen(PORT, "0.0.0.0", () => {
		console.info(`Server running on http://0.0.0.0:${PORT}`);
	})
	.on("error", (err: NodeJS.ErrnoException) => {
		if (err.code === "EADDRINUSE") {
			console.error(
				`Port ${PORT} is already in use. Please try a different port.`,
			);
			process.exit(1);
		} else {
			console.error("Server error:", err);
			process.exit(1);
		}
	});
