import Head from "next/head";
import "../styles/login.css";
import "../styles/admin.css";
import "../styles/index.css";

import "../styles/header.css";
import "../styles/showArticle.css";
import "../styles/insertUser.css";
import "../styles/showUsers.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      <Component {...pageProps} />
    </>
  );
}
