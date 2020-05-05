/* /lib/auth.js */

import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import Strapi from "strapi-sdk-javascript/build/main";
import axios from 'axios';
import Router from "next/router";

import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

export const strapiRegister = (username, email, password) => {
  if (!process.browser) {
    return undefined;
  }
  strapi.register(username, email, password).then(res => {
    setToken(res);
  });
  return Promise.resolve();
};

//use strapi to get a JWT and token object, save
//to approriate cookie for future requests
export const strapiLogin = (email, password) => {
  if (!process.browser) {
    return;
  }
  // Get a token
  axios
    .post(apiUrl + "/auth/local", {
      identifier: email,
      password: password,
    }).then(response => {
      // Handle success.
      // console.log('Well done!');
      // console.log('User profile', response.data.user);
      // console.log('User token', response.data.jwt);
      setToken(response.data);
      return Promise.resolve();
    }).catch(error => {
      // Handle error.
      console.log('An error occurred:', error);
      return Promise.resolve();
    });
};

// Authenticate the user
// export const checkAuth = () => {
//   if (!process.browser) {
//     return;
//   }
//   if  (Cookies.get("jwt")){
//     axios
//     .get(apiUrl+"/organizations/count", {
//       headers: {
//         Authorization: 'Bearer ' + Cookies.get("jwt")
//       },
//     }).then(response => {
//       // Handle success.
//       return true;
//     }).catch(error => {
//       // Handle error.
//       console.log('An error occurred:', error);
//       return false;
//     });
//   } else {
//     return false;
//   }
// };

export const setToken = token => {
  if (!process.browser) {
    return;
  }
  Cookies.set("username", token.user.username);
  Cookies.set("id", token.user.id);
  Cookies.set("jwt", token.jwt);
  if (Cookies.get("username")) {
    Router.push("/");
  }
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookies.remove("jwt");
  Cookies.remove("username")
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie || "") {
    return undefined;
  }

  let username = req.headers.cookie
    .split(";")
    .find(user => user.trim().startsWith("username="));
  if (username) {
    username = username.split("=")[1];
  }

  const jwtCookie = req.headers.cookie
    .split(";")
    .find(c => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwtDecode(jwt), username;
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};

//these will be used if you expand to a provider such as Auth0
const getQueryParams = () => {
  const params = {};
  window.location.href.replace(
    /([^(?|#)=&]+)(=([^&]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = $3;
    }
  );
  return params;
};
export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};