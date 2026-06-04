import { useState } from "react";

function App() {
  const [draft, setDraft] = useState(null);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>INC Publishing Command Center</h1>
      <p>Status: Awaiting backend connection...</p>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Daily Draft Review</h2>
        {draft ? (
          <div>Draft loaded. Ready for review.</div>
        ) : (
          <p style={{ color: "#666" }}>No new articles generated today.</p>
        )}
      </div>
    </div>
  );
}

export default App;
