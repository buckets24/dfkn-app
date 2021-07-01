import { ReactElement } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="de-DE">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="preload" href="/fonts/roboto-v20-latin-500.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/roboto-v20-latin-700.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/rubik-v9-latin-300.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/rubik-v9-latin-500.woff2" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/rubik-v9-latin-700.woff2" as="font" crossOrigin="anonymous" />

          {/* This fonts are not loaded on the start page, so we can just prefetch them */}
          <link rel="prefetch" href="/fonts/roboto-v20-latin-regular.woff2" as="font" crossOrigin="anonymous" />
          <link rel="prefetch" href="/fonts/rubik-v9-latin-regular.woff2" as="font" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
