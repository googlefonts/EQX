/* hocs/defaultPage.js */

import React from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";
import Cookies from "js-cookie";
import SignUp from "../components/SignUp";
import { Grid, Box, Typography} from '@material-ui/core';


import { getUserFromServerCookie, getUserFromLocalCookie } from "../lib/auth";

const Page = Page => (
  class DefaultPage extends React.Component {
    static async getInitialProps({ req }) {
      const loggedUser = process.browser ? getUserFromLocalCookie() : getUserFromServerCookie(req);
      const pageProps = Page.getInitialProps && Page.getInitialProps(req);
      return { ...pageProps, loggedUser, isAuthenticated: !!loggedUser };
    }
    
    logout = eve => {
      if (eve.key === "logout") {
        Router.push(`/?logout=${eve.newValue}`);
      }
    };

    componentDidMount() {
      window.addEventListener("storage", this.logout, false);
      if(Router.router.asPath !== "/" && !this.props.isAuthenticated){
        Router.push("/");
      }
    }

    componentWillUnmount() {
      window.removeEventListener("storage", this.logout, false);
    }
    render() {
      return(
        <>
          
          { this.props.isAuthenticated ? 
            <Page {...this.props} />
          :
            <Layout >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box style={{margin: "8vw auto 0", maxWidth: "1000px" }}>
                    <Typography className="text-900" style={{ textShadow: "0px 0px 10vw rgba(255,255,255, 0.25)", fontWeight: "900", fontSize: "9vw", lineHeight: "1"}} paragraph={true} variant="h1">Visually Evaluate Font Quality</Typography>
                  </Box>
                  <Box style={{margin: "4rem auto", maxWidth: "700px" }}>
                    <Typography style={{ color: "white"}} paragraph={true} variant="h4">On average, type designers spend more time testing typefaces than drawing them. It's time that tests become democratized. EQX organizes the Q&A process, allows you to repeat it, track progress, and work with remote teams all in one place.</Typography>
                  </Box>
                </Grid>
                
					      <Grid item xs={12}>
                  <Box style={{margin: "0 auto", maxWidth: "700px" }}>
                    <SignUp/>
                  </Box>
                </Grid>

					      <Grid item xs={12}>
                  <Box style={{margin: "16vw auto 8vw", maxWidth: "700px" }}>
                    <Typography style={{color: "white"}} paragraph={true} variant="h5">EQX was made to replace the typical type design workflow: web searches, ad-hoc testing strings, and reaching for things on our bookshelves. In its place is something faster and more useful for type designers, their collaborators, managers, and consulting experts.</Typography>
                    <Typography style={{color: "white"}} paragraph={true} variant="h5">We are excited about EQX because it already does a great deal, and it's libre license empowers anyone to use it and build on it.</Typography>
 
                    <Box style={{margin: "2rem auto 0.5rem", width: "100%", paddingBottom: "56.25%", height: "0", position: "relative"}}>
                      <iframe style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}} width="560" height="315"  src="https://www.youtube.com/embed/L61M-rU43ec" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Box>
                    <Typography style={{color: "white"}} paragraph={true} variant="body1">22 minute introduction presentation at ATypI 2020</Typography>

                  </Box>
                </Grid>
              </Grid>
            </Layout>
          }
          
       </>
      );
    }
  }
);
export default Page;