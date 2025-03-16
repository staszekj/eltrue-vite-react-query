import express from "express";
import { Item } from "api/src/types";
import sampleDataJson from "./sample_data.json";

const app = express();
const PORT = 3000;

const data: Item[] = sampleDataJson;

app.get("/api/search", (req, res) => {
  const query = req.query.q?.toString().toLowerCase() || "";
  const results = data.filter((item) =>
    item.name.toLowerCase().includes(query),
  );

  setTimeout(() => {
    res.json(results);
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
