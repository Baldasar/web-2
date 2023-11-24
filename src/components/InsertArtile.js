import React, { useState } from "react";

export function InsertArticle() {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    kb_id: "",
    kb_title: "",
    kb_body: "",
    kb_permalink: "",
    kb_keywords: "",
    kb_liked_count: 0,
    kb_published: true,
    kb_suggestion: false,
    kb_featured: false,
    kb_author_email: "",
    kb_published_date: getCurrentDate(),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
  
      const response = await fetch("http://localhost:8080/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: formData }),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao cadastrar artigo");
      }
  
      const data = await response.json();
      console.log("Artigo cadastrado com sucesso:", data);
  
      alert("Artigo cadastrado com sucesso");
  
      setFormData({
        kb_id: "",
        kb_title: "",
        kb_body: "",
        kb_permalink: "",
        kb_keywords: "",
        kb_liked_count: 0,
        kb_published: true,
        kb_suggestion: false,
        kb_featured: false,
        kb_author_email: "",
        kb_published_date: formData.kb_published_date,
      });
    } catch (error) {
      console.error("Erro ao cadastrar artigo:", error.message);
      alert("Erro ao cadastrar artigo. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">Título:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="text"
            name="kb_title"
            value={formData.kb_title}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Conteúdo:</label>
        <div className="form-input-container">
          <textarea
            className="form-input"
            name="kb_body"
            value={formData.kb_body}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Permalink:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="text"
            name="kb_permalink"
            value={formData.kb_permalink}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Palavras-chave:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="text"
            name="kb_keywords"
            value={formData.kb_keywords}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">E-mail do Autor:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="email"
            name="kb_author_email"
            value={formData.kb_author_email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Data de Publicação:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="date"
            name="kb_published_date"
            value={formData.kb_published_date}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-row checkbox-column">
          <label className="form-label">Sugestão</label>
          <div className="checkbox-label">
            <input
              className="checkbox-input"
              type="checkbox"
              name="kb_suggestion"
              checked={formData.kb_suggestion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row checkbox-column">
          <label className="form-label">Destaque</label>
          <div className="checkbox-label">
            <input
              className="checkbox-input"
              type="checkbox"
              name="kb_featured"
              checked={formData.kb_featured}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button className="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? "Aguarde..." : "Cadastrar Artigo"}
      </button>
    </form>
  );
}