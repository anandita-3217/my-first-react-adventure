import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/no", async (req, res) => {
  try {
    const response = await fetch("https://naas.isalman.dev/no");
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching from NaaS:", err);
    res.status(500).json({ error: "Failed to fetch from NaaS" });
  }
});

app.listen(5000, () => console.log("Proxy running on http://localhost:5000"));
