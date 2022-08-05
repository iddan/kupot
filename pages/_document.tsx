/* eslint-disable @next/next/no-img-element */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render = () => (
    <Html dir="rtl" lang="he-IL">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script async src="//static.getclicky.com/101375866.js"></script>
        <noscript>
          <p>
            <img
              alt="Clicky"
              width="1"
              height="1"
              src="//in.getclicky.com/101375866ns.gif"
            />
          </p>
        </noscript>
      </body>
    </Html>
  );
}

export default MyDocument;
