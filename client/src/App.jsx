import { useState, useEffect } from "react";
import axios from "axios";

// 1. Naye Modular Components Import Kiye Hain
import BlogPreview from "./component/BlogPreview/BlogPreview";
import ThreadPreview from "./component/ThreadPreview/ThreadPreview";

function App() {
  const [draft, setDraft] = useState(null);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initial load par purana draft fetch karne ke liye
  const fetchDraft = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/drafts/latest");
      setDraft(res.data);
    } catch (err) {
      console.error("No previous draft found or DB error.");
    }
  };

  useEffect(() => {
    fetchDraft();
  }, []);

  // Main Generation Function
  const handleGenerate = async () => {
    // 1. Frontend Validation
    if (!topic.trim()) {
      setError("Please enter a valid topic before generating.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 2. Send Request
      const response = await axios.post("http://localhost:5000/api/generate", {
        topic: topic.trim(),
      });

      // 3. Update State
      setDraft(response.data);
      setTopic("");
    } catch (err) {
      console.error("Generation Error:", err);
      setError(
        err.response?.data?.error ||
          "Error generating content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        maxWidth: "900px", // Thoda width badha diya taaki cards achhe dikhein
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <header
        style={{
          borderBottom: "2px solid #eaeaea",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ margin: 0, color: "#111827" }}>
          FinTech AI Pipeline Control
        </h1>
        <p style={{ color: "#6b7280", margin: "5px 0 0 0" }}>
          Automated content engine for SaaS and Wealth Tech.
        </p>
      </header>

      {/* Control Panel UI */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
            if (error) setError(null);
          }}
          placeholder="e.g., Why AI agents are the future of FinTech"
          disabled={loading}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px",
            border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: loading ? "#9ca3af" : "#2563eb",
            color: "white",
            border: "none",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "Generating Engine..." : "Generate Pipeline"}
        </button>
      </div>

      {/* Error Message Display */}
      {error && (
        <div
          style={{
            color: "#b91c1c",
            backgroundColor: "#fef2f2",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* 2. REFACTORED: Naya Modular Preview Area */}
      <div style={{ marginTop: "40px" }}>
        
        {draft ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {/* ThreadPreview Component: X/Twitter ka data pass kiya */}
            {draft.twitter && <ThreadPreview twitterData={draft.twitter} />}
            
            {/* BlogPreview Component: Blog ka data pass kiya */}
            {draft.blog && <BlogPreview blogData={draft.blog} />}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af", border: "2px dashed #e5e7eb", borderRadius: "12px" }}>
            No drafts generated yet. Enter a topic above to start the engine.
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;