import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { InsertUser } from "../components/InsertUser";
import { ShowUsers } from "../components/ShowUsers";
import { useRouter } from "next/router";

export default function Admin() {
  const [showInsertUser, setShowInsertUser] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const aux = sessionStorage.getItem("login");
    if (!aux) {
      router.push("/");
    }
  }, []);

  const toggleInsertUser = () => {
    setShowInsertUser(!showInsertUser);
    setShowUserList(false);
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
    setShowInsertUser(false);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="menu">
          <button className="menu-button">Cadastrar Artigo</button>
          <button className="menu-button" onClick={toggleInsertUser}>
            Cadastrar Usuário
          </button>
          <button className="menu-button">Listar Artigo</button>
          <button className="menu-button" onClick={toggleUserList}>
            Listar Usuário
          </button>
        </div>

        {showInsertUser && <InsertUser />}
        {showUserList && <ShowUsers />}
      </div>
    </>
  );
}
