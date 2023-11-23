import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { InsertArticle } from "@/components/InsertArtile";
import { InsertUser } from "../components/InsertUser";
import { ShowUsers } from "../components/ShowUsers";
import { useRouter } from "next/router";

export default function Admin() {
  const [showInsertArticle, setShowInsertArticle] = useState(false);
  const [showInsertUser, setShowInsertUser] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const aux = sessionStorage.getItem("login");
    if (!aux) {
      router.push("/");
    }
  }, []);

  const toggleInsertArticle = () => {
    setShowInsertArticle(!showInsertArticle);
    setShowInsertUser(false);
    setShowUserList(false);
  }

  const toggleInsertUser = () => {
    setShowInsertUser(!showInsertUser);
    setShowInsertArticle(false);
    setShowUserList(false);
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
    setShowInsertArticle(false);
    setShowInsertUser(false);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="menu">
          <button className="menu-button" onClick={toggleInsertArticle}>
            Cadastrar Artigo
          </button>
          <button className="menu-button" onClick={toggleInsertUser}>
            Cadastrar Usuário
          </button>
          <button className="menu-button">Listar Artigo</button>
          <button className="menu-button" onClick={toggleUserList}>
            Listar Usuário
          </button>
        </div>

        {showInsertArticle && <InsertArticle/>}
        {showInsertUser && <InsertUser />}
        {showUserList && <ShowUsers />}
      </div>
    </>
  );
}
