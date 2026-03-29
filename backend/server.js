import express from "express";
import cors from "cors";
import { processNews, askAI } from "../workflow/index.js";

const app = express();
app.use(cors());
app.use(express.json());

// Summary + timeline + script
app.post("/process", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await processNews(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ask AI
app.post("/ask", async (req, res) => {
  try {
    const { question, context } = req.body;
    const result = await askAI(question, context);
    res.json({ answer: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});