require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Article = require("./models/Article");

// AI Service import (Ye pehle missing tha)
const { generateOmnichannelContent } = require("./services/aiService");

const app = express();

// Allow frontend to talk to backend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// --- ROUTE 1: Fetch the latest draft for your dashboard ---
app.get("/api/drafts/latest", async (req, res) => {
  try {
    const draft = await Article.findOne({ status: "draft" }).sort({
      createdAt: -1,
    });
    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ROUTE 2: Generate Content via AI (Ye darwaza naya banaya hai!) ---
app.post("/api/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    console.log(
      `\n[Server] Received request to generate content for: "${topic}"`,
    );

    // AI service ko call lagayi
    const generatedData = await generateOmnichannelContent(topic);

    // Frontend ko mast JSON wapas bhej diya
    res.json(generatedData);
  } catch (error) {
    console.error("[Server] Backend Route Error:", error);
    res.status(500).json({ error: "Something went wrong in AI generation!" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
