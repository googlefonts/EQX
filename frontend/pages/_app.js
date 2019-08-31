/* _app.js */
import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";


export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <Head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,400i,700,700i,900&display=swap" rel="stylesheet" />
        </Head>

        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    );
  }
}