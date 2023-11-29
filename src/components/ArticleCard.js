import React from "react";

export function ArticleCard({ article, userLogged, askLogin, likeArticle, onOpen }) {
  return (
    <div key={article._id} className="article-card">
      <h3>{article.kb_title}</h3>
      <br />
      <div id="interact">
        <p id="like-count">Likes: {article.kb_liked_count}</p>
        {!userLogged ? (
          <button id="like-button-disabled" onClick={() => askLogin()}>
            Like
          </button>
        ) : (
          <button id="like-button" onClick={() => likeArticle(article._id)}>
            Like
          </button>
        )}
        <button id="open-button" onClick={() => onOpen(article)}>
          Abrir
        </button>
      </div>
    </div>
  );
};