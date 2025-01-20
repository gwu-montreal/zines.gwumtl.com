import React from "react";
import Head from "next/head";
import App from "next/app";

import Header from "~/components/Header";
import { SiteDataProvider, DEFAULT_LANG } from "~/lib/site-data";

import "~/styles/index.css";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const { lang, currentPage } = pageProps;

    const main = (
      <>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          {/* <script async src="/fathom.js" /> */}
        </Head>
        <SiteDataProvider value={{ lang: lang || DEFAULT_LANG, currentPage }}>
          <Header />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </SiteDataProvider>
      </>
    );

    return lang ? main : <Component {...pageProps} />;
  }
}

export default MyApp;
