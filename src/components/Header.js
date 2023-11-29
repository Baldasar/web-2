import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Header() {
  const [title, setTitle] = useState("");
  const [userLogged, setUserLogged] = useState(null);
  const [currentPath, setCurrentPath] = useState("");

  const router = useRouter();

  useEffect(() => {
    setPageName();
    getUserLogged();
    setCurrentPath(router.pathname);
  }, [router.pathname]);

  const getUserLogged = () => {
    const aux = sessionStorage.getItem("login");
    if (aux) {
      const parsed = JSON.parse(aux);
      setUserLogged(parsed);
    }
  };

  const setPageName = () => {
    const rotaAtual = router.pathname;

    if (rotaAtual === "/admin") {
      setTitle("Administração");
    } else if (rotaAtual === "/" || rotaAtual === "/home") {
      setTitle("Home");
    }
  };

  const showAdmin = () => {
    return (
      userLogged &&
      userLogged.author_level === "admin" &&
      currentPath !== "/admin"
    );
  };

  const showHome = () => {
    return currentPath !== "/" && currentPath !== "/home";
  };

  const logout = () => {
    sessionStorage.removeItem("login");
    setUserLogged(null);
    router.push("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <h1 className="title">{title}</h1>
      {showAdmin() && (
        <Link href="/admin" className="adminButton">
          Administrador
        </Link>
      )}

      {showHome() && (
        <Link href="/" className="loginLink">
          Home
        </Link>
      )}

      {!userLogged ? (
        <Link className="loginLink" href="/login">
          Login
        </Link>
      ) : (
        <button className="logoutButton" onClick={logout}>
          Logout
        </button>
      )}
    </header>
  );
}
