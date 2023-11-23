import React, { useState } from "react";

export function InsertUser() {
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    author_user: "",
    author_pwd: "",
    author_level: "default",
    author_status: false,
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

      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: formData }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      const data = await response.json();
      console.log("Usuário cadastrado com sucesso:", data);

      alert("Usuário cadastrado com sucesso");

      setFormData({
        author_name: "",
        author_email: "",
        author_user: "",
        author_pwd: "",
        author_level: "",
        author_status: false,
      });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">Nome:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="text"
            name="author_name"
            value={formData.author_name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Email:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="email"
            name="author_email"
            value={formData.author_email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Usuário:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="text"
            name="author_user"
            value={formData.author_user}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Senha:</label>
        <div className="form-input-container">
          <input
            className="form-input"
            type="password"
            name="author_pwd"
            value={formData.author_pwd}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <label className="form-label">Nível:</label>
        <div className="form-input-container">
          <select
            className="form-select"
            name="author_level"
            value={formData.author_level}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="default">Default</option>
          </select>
        </div>
      </div>

      <div className="form-row checkbox-row">
        <label className="form-label">Status:</label>
        <div className="checkbox-label">
          <input
            className="checkbox-input"
            type="checkbox"
            name="author_status"
            checked={formData.author_status}
            onChange={handleChange}
          />
          Ativo
        </div>
      </div>

      <button className="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? "Aguarde..." : "Cadastrar"}
      </button>
    </form>
  );
}
