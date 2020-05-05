/* /pages/_app.js */

// import Layout from "../components/Layout";
import App, { Container } from "next/app";
import React from "react";
// import Head from "next/head";
// import { ApolloProvider } from 'react-apollo';
// import withApollo from '../lib/apollo';
global.fetch = require('node-fetch'); // for Apollo Fetch issue (future fix with node update)
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';

const client = new ApolloClient({
  uri: apiUrl + "/graphql"
});

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    // const { Component, pageProps, apollo, isAuthenticated, ctx } = this.props;
    const { Component, pageProps, isAuthenticated, ctx } = this.props;
    return (
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <>
            <Component {...pageProps} />
          </>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

// export default withApollo(MyApp);
export default MyApp;


