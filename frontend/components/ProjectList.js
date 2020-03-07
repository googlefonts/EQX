/* components/ProjectList/index.js */
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { useQuery } from '@apollo/react-hooks';
import withApollo from '../lib/apollo';
import { CardText, CardTitle, Col, Row } from "reactstrap";
import Project from "../components/Project";

const query = gql`
  {
    projects( where: {
      archived: true
    }) {
      id
      name
    }
  }
`;

// axios
//   .post('http://localhost:1337/graphql', { 
//     headers: { Authorization: 'Bearer ' + Cookies.get("jwt") },
//     data: {
//       query: `
//         query {
//           projects {
//             name
//           }
//         }
//       `
//     }
//   }).catch(error => { console.log(error); // Handle error 
//   }).then(response => { // Handle success
//     console.log(response)
//   });


// const ProjectList = () => {
//   const { loading, data } = useQuery(query);

//   if (loading || !data) {
//     return <h1>loading...</h1>;
//   }
//   return <h1>{data.title}</h1>;
// };



const ProjectList = (
  { data: { loading, error, projects }, search },
  req
) => {
  if (error) return "Error loading projects";
  //if projects are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  // const { loading, data } = useQuery(query);

  if (projects && projects.length) {
    const searchQuery = projects.filter( query => query.name.toLowerCase().includes(search) );
    if (searchQuery.length != 0) {
      return (
        <>
          {searchQuery.map((project, i) => (
            <Project key={"project-"+i} projectId={project.id}/>
          ))}
        </>
      );
    }
  }
  return <h1>Loading</h1>;
};

// ProjectList.getInitialProps = async ({ req }) => {
//   const res = await fetch("https://api.github.com/repos/zeit/next.js");
//   const json = await res.json();
//   return { stars: json.stargazers_count };
// };
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (ProjectList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(ProjectList);

// export default withApollo(ProjectList);



// // pages/index.js
// import gql from 'graphql-tag';
// import { useQuery } from '@apollo/react-hooks';
// import withApollo from '../lib/withApollo';
// // import { getDataFromTree } from '@apollo/react-ssr';

// const query = gql`
//   {
//     title
//   }
// `;

// const Index = () => {
//   const { loading, data } = useQuery(query);

//   if (loading || !data) {
//     return <h1>loading...</h1>;
//   }
//   return <h1>{data.title}</h1>;
// };

// export default withApollo(Index);

// // You can also override the configs for withApollo here, so if you want
// // this page to have SSR (and to be a lambda) for SEO purposes and remove
// // the loading state, uncomment the import at the beginning and this:
// //
// // export default withApollo(Index, { getDataFromTree });
