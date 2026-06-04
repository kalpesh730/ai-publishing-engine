const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  sourceUrl: { type: String },

  // Blog-specific schema data structure
  blog: {
    title: { type: String },
    slug: { type: String, unique: true },
    htmlContent: { type: String },
    seoDescription: { type: String },
  },

  // Twitter-specific schema data structure
  twitter: {
    thread: [{ type: String }],
    hashtags: [{ type: String }],
  },

  // State workflow engine
  status: {
    type: String,
    enum: ["draft", "approved", "published", "failed"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
  publishedAt: { type: Date },
});

module.exports = mongoose.model("Article", ArticleSchema);
