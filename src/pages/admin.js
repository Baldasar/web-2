import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { InsertArticle } from "@/components/InsertArtile";
import { ShowArticles } from "../components/ShowArticle";
import { InsertUser } from "../components/InsertUser";
import { ShowUsers } from "../components/ShowUsers";
import { useRouter } from "next/router";

export default function Admin() {
  const [showInsertArticle, setShowInsertArticle] = useState(false);
  const [showArticleList, setShowArticleList] = useState(false);
  const [showInsertUser, setShowInsertUser] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const aux = sessionStorage.getItem("login");
    if (!aux) {
      router.push("/");
    }
  }, []);

  const toggleView = (view) => {
    setShowInsertArticle(view === 'insertArticle');
    setShowArticleList(view === 'articleList');
    setShowInsertUser(view === 'insertUser');
    setShowUserList(view === 'userList');
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="menu">
          <button className="menu-button" onClick={() => toggleView('insertArticle')}>
            Cadastrar Artigo
          </button>
          <button className="menu-button" onClick={() => toggleView('insertUser')}>
            Cadastrar Usuário
          </button>
          <button className="menu-button" onClick={() => toggleView('articleList')}>
            Listar Artigo
          </button>
          <button className="menu-button" onClick={() => toggleView('userList')}>
            Listar Usuário
          </button>
        </div>

        {showInsertArticle && <InsertArticle/>}
        {showArticleList && <ShowArticles/>}
        {showInsertUser && <InsertUser />}
        {showUserList && <ShowUsers />}
      </div>
    </>
  );
}
