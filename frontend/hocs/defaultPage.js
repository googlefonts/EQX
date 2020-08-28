/* hocs/defaultPage.js */

import React from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';

import { getUserFromServerCookie, getUserFromLocalCookie } from "../lib/auth";

export default Page =>
  class DefaultPage extends React.Component {
    static async getInitialProps({ req }) {
        
      function assertAlive (decoded) { // Check if JWT still alive
        const now = Date.now().valueOf() / 1000
        if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
          throw new Error(`token expired: ${JSON.stringify(decoded)}`)
        }
        if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
          throw new Error(`token not yet valid: ${JSON.stringify(decoded)}`)
        }
      }
      try {
        assertAlive(jwtDecode(Cookies.get("jwt")))
      } catch (error) {
        console.error(error)
        Cookies.remove("username");
        Cookies.remove("id");
        Cookies.remove("jwt");
      }

      const loggedUser = process.browser
        ? getUserFromLocalCookie()
        : getUserFromServerCookie(req);
      const pageProps = Page.getInitialProps && Page.getInitialProps(req);
      return {
        ...pageProps,
        loggedUser,
        isAuthenticated: !!loggedUser
      };
    }
    
    logout = eve => {
      if (eve.key === "logout") {
        Router.push(`/?logout=${eve.newValue}`);
      }
    };

    componentDidMount() {
      window.addEventListener("storage", this.logout, false);
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.logout, false);
    }
    render() {
      return(
        <>
          {/* <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,400i,700,700i,900&display=swap" rel="stylesheet" />
          </Head> */}
          <Page {...this.props} />
       </>
      );
    }
  };