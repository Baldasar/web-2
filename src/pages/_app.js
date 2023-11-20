import Head from "next/head";
import "../styles/header.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        
      </Head>
      <Component {...pageProps} />
    </>
  );
};