import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    const aux = sessionStorage.getItem("login");
    if (aux) {
      router.push("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      author_user: username,
      author_pwd: password,
    };

    // try {
    //   const response = await fetch("http://localhost:8080/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     alert(result.message);
    //   } else {
    //     alert(result.message);
    //   }
    // } catch (error) {
    //   alert(error.message)
    // }
  };

  return (
    <div className="full-screen-container">
      <div className="container">
        <form onSubmit={handleLogin} className="login-form">
          <input className="input" type="hidden" name="action" value="login" />
          <h2>Login</h2>
          <div className="form-group">
            <label className="label" htmlFor="username">
              Usuário:
            </label>
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">
              Senha:
            </label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <Link className="custom-button home-button" href="/">
              Home
            </Link>
            <button type="submit" className="custom-button login-button">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
