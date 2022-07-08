import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Table from "../Table";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>קופות</title>
        <meta name="description" content="השוואת קופות גמל והשתלמות בקלות" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <header style={{ padding: 16 }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>🏦 קופות</h1>
          <p style={{ marginBottom: 0 }}>השוואת קופות גמל והשתלמות בקלות</p>
        </header>
        <main>
          <Table />
        </main>

        <footer style={{ padding: 16 }}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            מידע: גמלנט, פיתוח: עידן אהרנסון
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
