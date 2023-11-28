import React from "react";

export function ArticleDialog({ article, onClose }) {

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="article-dialog-overlay" onClick={onClose}>
      <div className="article-dialog" onClick={handleDialogClick}>
        <div id="dialog-header">
          <h2>{article.kb_title}</h2>
          <button id="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <p>{article.kb_body}</p>
      </div>
    </div>
  );
}
