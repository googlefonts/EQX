/* /pages/_app.js */

import Layout from "../components/Layout";
import App, { Container } from "next/app";
import React from "react";
import Head from "next/head";
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/apollo';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo, isAuthenticated, ctx } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <div>
          <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,400i,700,700i,900&display=swap" rel="stylesheet" />
          </Head>

          <Container isAuthenticated={isAuthenticated} {...pageProps}>
              <Component {...pageProps} />

          </Container>
        </div>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);


