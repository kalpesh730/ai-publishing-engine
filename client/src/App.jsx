import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [draft, setDraft] = useState(null);
  const [topic, setTopic] = useState(""); // Naya: Topic store karne ke liye
  const [loading, setLoading] = useState(false);

  // Draft fetch karne ka code wahi rahega
  const fetchDraft = () => {
    axios
      .get("http://localhost:5000/api/drafts/latest")
      .then((res) => setDraft(res.data));
  };

  useEffect(() => {
    fetchDraft();
  }, []);

  // Naya: Generate button ka function
  const handleGenerate = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/generate", { topic });
      fetchDraft(); // Generate hote hi naya draft dikh jayega
    } catch (err) {
      alert("Error generating content!");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>FinTech AI Pipeline Control</h1>

      {/* Input aur Button UI */}
      <div style={{ margin: "20px 0" }}>
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter Fintech/AI Topic..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          onClick={handleGenerate}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>
      </div>

      {draft ? (
        <div style={{ border: "1px solid #ccc", padding: "20px" }}>
          <h2>{draft.blog.title}</h2>
          <p>{draft.blog.content}</p>
        </div>
      ) : (
        <p>No drafts yet.</p>
      )}
    </div>
  );
}

export default App;
