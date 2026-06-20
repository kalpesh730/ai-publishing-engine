import React from "react";
import "./BlogPreview.css";

const BlogPreview = ({ blogData }) => {
  if (!blogData) return null;

  return (
    <div className="blog-container">
      <h3 className="section-title">Blog Post Ready</h3>

      <article className="blog-card">
        <h1 className="blog-title">{blogData.title}</h1>
        <div className="seo-meta">
          <strong>SEO Meta:</strong> {blogData.seoDescription}
        </div>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: blogData.htmlContent || blogData.content || "",
          }}
        />
      </article>
    </div>
  );
};

export default BlogPreview;
