import React from "react";

export function ArticleDialog({ article, onClose }) {
  return (
    <div className="article-dialog-overlay">
      <div className="article-dialog">
        <h2>{article.kb_title}</h2>
        <br />
        <p>{article.kb_body}</p>
        <br />
        <div id="interact">
          <button id="close-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
