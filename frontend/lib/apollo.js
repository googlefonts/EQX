/* /lib/apollo.js */

// import { withData } from 'next-with-apollo';
// import { HttpLink } from 'apollo-link-http';

// // can also be a function that accepts a `context` object (SSR only) and returns a config
// const config = {
//   link: new HttpLink({
//     credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//     uri: "http://localhost:1337/graphql", // Server URL (must be absolute)
//   })
// };

// export default withData(config)

// import { withData } from "next-apollo";
// import { HttpLink } from "apollo-boost";

// const config = {
//   link: new HttpLink({
//     uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn", // Server URL (must be absolute)
//     opts: {
//       credentials: "same-origin" // Additional fetch() options like `credentials` or `headers`
//     }
//   })
// };

// export default withData(config);
// 
// 
// 
// 

import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default withApollo(
  ({ ctx, headers, initialState }) =>
    new ApolloClient({
      uri: "http://localhost:1337/graphql",
      cache: new InMemoryCache().restore(initialState || {})
    })
);