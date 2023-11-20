import { Header } from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <div id="articles">
          <h2>Artigos</h2>
        </div>
        <div id="featured-articles">
          <h2>Artigos em Destaque</h2>
        </div>
        <div id="most-liked-articles">
          <h2>Artigos Mais Curtidos</h2>
        </div>
      </div>
    </>
  );
}
