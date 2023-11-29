import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArticleCard } from "../components/ArticleCard";
import { ArticleDialog } from "../components/ArticleDialog";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [userLogged, setUserLogged] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/articles");

        if (!response.ok) {
          throw new Error(`Erro ao buscar artigos: ${response.statusText}`);
        }

        const data = await response.json();
        const featured = data.filter((article) => article.kb_featured);
        setFeaturedArticles(featured);

        const newData = data.filter((article) => !article.kb_featured);
        const mostLiked = newData.slice(0, 10);
        setMostLikedArticles(mostLiked);

        const combinedArticles = [...featured, ...mostLiked];
        const restArticles = data.filter(
          (article) => !combinedArticles.includes(article)
        );
        setArticles(restArticles);
      } catch (error) {
        console.error("Erro ao buscar artigos:", error.message);
      }
    };

    fetchData();
    getUserLogged();
  }, []);

  const getUserLogged = () => {
    const aux = sessionStorage.getItem("login");
    if (aux) {
      const parsed = JSON.parse(aux);
      setUserLogged(parsed);
    }
  };

  const askLogin = () => {
    alert("Você precisa estar logado para curtir um artigo!");
  }

  const likeArticle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles/${id}/like`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao curtir o artigo: ${response.statusText}`);
      }

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === id
            ? { ...article, kb_liked_count: article.kb_liked_count + 1 }
            : article
        )
      );

      setFeaturedArticles((prevFeaturedArticles) =>
        prevFeaturedArticles.map((article) =>
          article._id === id
            ? { ...article, kb_liked_count: article.kb_liked_count + 1 }
            : article
        )
      );

      setMostLikedArticles((prevMostLikedArticles) =>
        prevMostLikedArticles.map((article) =>
          article._id === id
            ? { ...article, kb_liked_count: article.kb_liked_count + 1 }
            : article
        )
      );
    } catch (error) {
      console.error("Erro ao curtir o artigo:", error.message);
    }
  };

  const searchByKeyword = async (keyword) => {
    try {
    } catch (error) {
      console.error("Erro ao buscar artigos por palavra-chave:", error.message);
    }
  };

  const handleSearch = () => {
    searchByKeyword(searchKeyword);
  };

  const onOpen = (article) => {
    setSelectedArticle(article);
  };

  const onClose = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      <Header />
      <div>
        <div id="search-bar">
          <input
            type="text"
            placeholder="Buscar por palavras-chave"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        <h2 className="subtitle">Artigos em Destaque</h2>
        <div id="featured-articles">
          {featuredArticles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              userLogged={userLogged}
              askLogin={askLogin}
              likeArticle={likeArticle}
              onOpen={onOpen}
            />
          ))}
        </div>
        <h2 className="subtitle">Artigos Mais Curtidos</h2>
        <div id="most-liked-articles">
          {mostLikedArticles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              userLogged={userLogged}
              askLogin={askLogin}
              likeArticle={likeArticle}
              onOpen={onOpen}
            />
          ))}
        </div>
        <h2 className="subtitle">Artigos</h2>
        <div id="articles">
          {articles.map((article) => (
            <ArticleCard
              key={article._id}
              article={article}
              userLogged={userLogged}
              askLogin={askLogin}
              likeArticle={likeArticle}
              onOpen={onOpen}
            />
          ))}
        </div>
      </div>

      {selectedArticle && (
        <ArticleDialog article={selectedArticle} onClose={onClose} />
      )}

      <Footer />
    </>
  );
}
