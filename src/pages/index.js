import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";

const ArticleCard = ({ article }) => (
  <div className="article-card" key={article.kb_id}>
    <h3>{article.kb_title}</h3>
    <br/>
    <p id='body'>{article.kb_body}</p>
    <br/>
    <div id='interact'>
      <p id='like-count'>Likes: {article.kb_liked_count}</p>
      <button id='like-button'>Like</button>
      <button id='open-button'>Abrir</button>
    </div>
  </div>
);

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [mostLikedArticles, setMostLikedArticles] = useState([]);
  const [searchedArticles, setSearchedArticles] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/articles");

        if (!response.ok) {
          throw new Error(`Erro ao buscar artigos: ${response.statusText}`);
        }

        const data = await response.json();
        setArticles(data);

        const featured = data.filter((article) => article.kb_featured);
        setFeaturedArticles(featured);

        const sortedByLikes = data.sort(
          (a, b) => b.kb_liked_count - a.kb_liked_count
        );
        const mostLiked = sortedByLikes.slice(0, 10);
        setMostLikedArticles(mostLiked);
      } catch (error) {
        console.error("Erro ao buscar artigos:", error.message);
      }
    };

    fetchData();
  }, []);

  const searchByKeyword = async (keyword) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/articles?keyword=${keyword}`
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar artigos por palavra-chave: ${response.statusText}`
        );
      }

      const data = await response.json();
      setSearchedArticles(data);
    } catch (error) {
      console.error("Erro ao buscar artigos por palavra-chave:", error.message);
    }
  };

  const handleSearch = () => {
    searchByKeyword(searchKeyword);
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
        <h2 className="subtitle">Artigos</h2>
        <div id="articles">
          {searchedArticles.length > 0
            ? searchedArticles.map((article) => (
                <ArticleCard key={article.kb_id} article={article} />
              ))
            : articles.map((article) => (
                <ArticleCard key={article.kb_id} article={article} />
              ))}
        </div>        
        <h2 className="subtitle">Artigos em Destaque</h2>
        <div id="featured-articles">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.kb_id} article={article} />
          ))}
        </div>
        <h2 className="subtitle">Artigos Mais Curtidos</h2>
        <div id="most-liked-articles">
          {mostLikedArticles.map((article) => (
            <ArticleCard key={article.kb_id} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}