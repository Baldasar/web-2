import React from "react";

export default function Login() {
  return (
    <>
      <form action="/login" method="POST">
        <input type="hidden" name="action" value="login" />
        <h2>Login</h2>
        <div class="form-group">
          <label for="username">Usuário:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div class="button-container">
          <button type="submit" class="custom-button login-button">
            Entrar
          </button>
        </div>
      </form>
    </>
  );
}
