import type { NextPage } from "next";
import Head from "next/head";
import Table from "../Table";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>קופות</title>
        <meta
          name="description"
          content="השוואת קופות גמל וקרנות השתלמות בקלות"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <header style={{ padding: "16px 8px" }}>
          <h1 style={{ fontSize: 24, margin: 0 }}>🏦 קופות</h1>
          <p style={{ marginBottom: 0 }}>
            השוואת קופות גמל וקרנות השתלמות בקלות
          </p>
        </header>
        <Table />
        <footer
          style={{
            padding: "8px",
            backgroundColor: "#F7F7F7",
            marginTop: "auto",
          }}
        >
          מידע:{" "}
          <a
            style={{ color: "#6A4E2C", textDecoration: "underline" }}
            href="https://data.gov.il/dataset/gemelnet"
          >
            גמלנט
          </a>
          , פיתוח:{" "}
          <a
            style={{ color: "#6A4E2C", textDecoration: "underline" }}
            href="https://aniddan.com"
          >
            עידן אהרנסון
          </a>
        </footer>
      </div>
    </>
  );
};

export default Home;
