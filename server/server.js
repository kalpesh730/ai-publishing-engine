require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // <-- ADD THIS
const Article = require("./models/Article");

const app = express();

// Allow frontend to talk to backend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// --- NEW ROUTE: Fetch the latest draft for your dashboard ---
app.get("/api/drafts/latest", async (req, res) => {
  try {
    // Find the newest article that is still a 'draft'
    const draft = await Article.findOne({ status: "draft" }).sort({
      createdAt: -1,
    });
    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
