import React from "react";
import "./ThreadPreview.css";

const ThreadPreview = ({ twitterData }) => {
  if (!twitterData || !twitterData.thread) return null;

  return (
    <div className="thread-container">
      <h3 className="section-title">X (Twitter) Thread Ready</h3>

      <div className="thread-list">
        {twitterData.thread.map((tweet, index) => (
          <div key={index} className="tweet-card">
            <div className="tweet-header">
              <div className="avatar-placeholder"></div>
              <div className="author-info">
                <strong>Your Brand</strong>{" "}
                <span className="handle">@yourhandle</span>
              </div>
            </div>
            <p className="tweet-text">{tweet}</p>
          </div>
        ))}
      </div>

      <div className="hashtags-container">
        {twitterData.hashtags?.map((tag, idx) => (
          <span key={idx} className="hashtag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ThreadPreview;
