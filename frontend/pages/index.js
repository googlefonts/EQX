/* /pages/index.js */

// import ProjectList from "../components/ProjectList";
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import {Cell, Row} from '@material/react-layout-grid';
import { FormGroup, FormControl, FormLabel, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core';

import "../styles/main.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);
    //query state will be passed to ProjectList for the filter query
    this.state = {
      page: "dashboard",
      query: ""
    };
  }
  
  onChange(e) {
    //set the state = to the input typed in the search Input Component
    //this.state.query gets passed into ProjectList to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render() {
    return (
      <Layout page={this.state.page} {...this.props}>

        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* <div className="search">
                <FormGroup>
                  <InputLabel> Search </InputLabel>
                  <Input onChange={this.onChange.bind(this)} />
                </FormGroup>
              </div>
              <ProjectList search={this.state.query} /> */}
            </Grid>
          </Grid>

        </Container>      
      </Layout>
    );
  }
}

export default defaultPage(Index);
