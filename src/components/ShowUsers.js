import React, { useState, useEffect } from "react";

export function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users");

        if (!response.ok) {
          throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleSaveClick = async (editedUser) => {
    const userConfirmation = window.confirm(
      "Tem certeza que deseja salvar as alterações?"
    );

    if (!userConfirmation) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${editedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao salvar usuário: ${response.statusText}`);
      }

      setEditingUserId(null);

      const updatedUsers = users.map((user) =>
        user._id === editedUser._id ? editedUser : user
      );
      setUsers(updatedUsers);

      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error.message);

      alert(`Erro ao salvar usuário: ${error.message}`);
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleDeleteClick = async (userId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este usuário?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao excluir usuário: ${response.statusText}`);
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error.message);
    }
  };

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Usuário</th>
          <th>Nível</th>
          <th>Status</th>
          <th>Data de Criação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              {editingUserId === user._id ? (
                <input
                  className="input-field"
                  type="text"
                  value={user.author_name || ""}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u._id === user._id
                          ? { ...u, author_name: e.target.value }
                          : u
                      )
                    )
                  }
                />
              ) : (
                user.author_name
              )}
            </td>
            <td>
              {editingUserId === user._id ? (
                <input
                  className="input-field"
                  type="text"
                  value={user.author_email}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u._id === user._id
                          ? { ...u, author_email: e.target.value }
                          : u
                      )
                    )
                  }
                />
              ) : (
                user.author_email
              )}
            </td>
            <td>
            {user.author_user}
            </td>
            <td>
              {editingUserId === user._id ? (
                <select
                  className="input-field"
                  value={user.author_level}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u._id === user._id
                          ? { ...u, author_level: e.target.value }
                          : u
                      )
                    )
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="default">Default</option>
                </select>
              ) : (
                user.author_level
              )}
            </td>
            <td>
              {editingUserId === user._id ? (
                <select
                  className="input-field"
                  value={user.author_status ? "ativo" : "inativo"}
                  onChange={(e) =>
                    setUsers((prevUsers) =>
                      prevUsers.map((u) =>
                        u._id === user._id
                          ? { ...u, author_status: e.target.value === "ativo" }
                          : u
                      )
                    )
                  }
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              ) : user.author_status ? (
                "Ativo"
              ) : (
                "Inativo"
              )}
            </td>
            <td>{new Date(user.author_create_date).toLocaleDateString()}</td>
            <td className="action-buttons">
              {editingUserId === user._id ? (
                <>
                  <button
                    className="save-button"
                    onClick={() => handleSaveClick(user)}
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
                  onClick={() => handleEditClick(user._id)}
                >
                  Editar
                </button>
              )}
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(user._id)}
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
