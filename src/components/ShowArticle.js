import React, { useState, useEffect } from "react";

export function ShowArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingArticleId, setEditingArticleId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/articles");

        if (!response.ok) {
          throw new Error(`Erro ao buscar artigos: ${response.statusText}`);
        }

        const data = await response.json();
        setArticles(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar artigos:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (articleId) => {
    setEditingArticleId(articleId);
  };

  const handleSaveClick = async (editedArticle) => {
    const confirmation = window.confirm(
      "Tem certeza que deseja salvar as alterações?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${editedArticle._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedArticle),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao salvar artigo: ${response.statusText}`);
      }

      setEditingArticleId(null);

      const updatedArticles = articles.map((article) =>
        article._id === editedArticle._id ? editedArticle : article
      );
      setArticles(updatedArticles);

      alert("Artigo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar artigo:", error.message);

      alert(`Erro ao salvar artigo: ${error.message}`);
    }
  };

  const handleCancelClick = () => {
    setEditingArticleId(null);
  };

  const handleDeleteClick = async (articleId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este artigo?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${articleId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao excluir artigo: ${response.statusText}`);
      }

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );

      alert("Artigo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir artigo:", error.message);
    }
  };

  return (
    <table className="article-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Conteúdo</th>
          <th>Palavras-chave</th>
          <th>Email do Autor</th>
          <th>Publicação</th>
          <th>Likes</th>
          <th>Publicado</th>
          <th>Destaque</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => (
          <tr key={article._id}>
            <td>
              {editingArticleId === article._id ? (
                <input
                  className="input-field"
                  type="text"
                  value={article.kb_title || ""}
                  onChange={(e) =>
                    setArticles((prevArticles) =>
                      prevArticles.map((a) =>
                        a._id === article._id
                          ? { ...a, kb_title: e.target.value }
                          : a
                      )
                    )
                  }
                />
              ) : (
                article.kb_title
              )}
            </td>
            <td>
              {editingArticleId === article._id ? (
                <textarea
                  className="input-field limited-height-textarea"
                  value={article.kb_body}
                  onChange={(e) =>
                    setArticles((prevArticles) =>
                      prevArticles.map((a) =>
                        a._id === article._id
                          ? { ...a, kb_body: e.target.value }
                          : a
                      )
                    )
                  }
                />
              ) : (
                <div className="limited-height-content">{article.kb_body}</div>
              )}
            </td>
            <td>
              {editingArticleId === article._id ? (
                <input
                  className="input-field"
                  type="text"
                  value={article.kb_keywords}
                  onChange={(e) =>
                    setArticles((prevArticles) =>
                      prevArticles.map((a) =>
                        a._id === article._id
                          ? { ...a, kb_keywords: e.target.value }
                          : a
                      )
                    )
                  }
                />
              ) : (
                article.kb_keywords
              )}
            </td>
            <td>
              {editingArticleId === article._id ? (
                <input
                  className="input-field"
                  type="text"
                  value={article.kb_author_email}
                  onChange={(e) =>
                    setArticles((prevArticles) =>
                      prevArticles.map((a) =>
                        a._id === article._id
                          ? { ...a, kb_author_email: e.target.value }
                          : a
                      )
                    )
                  }
                />
              ) : (
                article.kb_author_email
              )}
            </td>
            <td>{new Date(article.kb_published_date).toLocaleDateString()}</td>
            <td>{article.kb_liked_count}</td>
            <td>
              {editingArticleId === article._id ? (
                <select
                  className="input-field"
                  value={article.kb_published ? "published" : "not-published"}
                  onChange={(e) =>
                    setArticles((prevArticles) =>
                      prevArticles.map((a) =>
                        a._id === article._id
                          ? { ...a, kb_published: e.target.value === "published" }
                          : a
                      )
                    )
                  }
                >
                  <option value="published">Sim</option>
                  <option value="not-published">Não</option>
                </select>
              ) : (
                article.kb_published ? 'Sim' : 'Não'
              )}
            </td>
            <td>
              {editingArticleId === article._id ? (
                <select
                  className="input-field"
                  value={article.kb_featured ? "featured" : "not-featured"}
                  onChange={(e) =>
                    setArticles((prevArticles) =>
                      prevArticles.map((a) =>
                        a._id === article._id
                          ? { ...a, kb_featured: e.target.value === "featured" }
                          : a
                      )
                    )
                  }
                >
                  <option value="featured">Sim</option>
                  <option value="not-featured">Não</option>
                </select>
              ) : (
                article.kb_featured ? 'Sim' : 'Não'
              )}
            </td>
            <td className="action-buttons">
              {editingArticleId === article._id ? (
                <>
                  <button
                    className="save-button"
                    onClick={() => handleSaveClick(article)}
                  >
                    Salvar
                  </button>
                  <button className="cancel-button" onClick={handleCancelClick}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(article._id)}
                >
                  Editar
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(article._id)}
              >
                Apagar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}