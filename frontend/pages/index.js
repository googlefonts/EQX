/* /pages/index.js */

// import ProjectList from "../components/ProjectList";
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import Test from "../components/Test";
import SharedTest from "../components/SharedTest";
import Section from "../components/Section";
import Project from "../components/Project";
import {Cell, Row} from '@material/react-layout-grid';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography} from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost:1337';

import "../styles/main.scss";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      projects: [],
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl+'/projects?owners.id='+Cookies.get("id")+'&archived_eq=false', { 
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        this.setState({ projects: response.data });

      }).catch(error => { console.log(error); }); // Handle error 
  }

  render() {
    return (
      <Layout page={this.state.page} {...this.props}>

        <Section bgcolor="none">
          {this.state.projects.map((project, i1) => 
            project.tests.map((test, i2) =>
              <Test key={"test-"+i2} testId={test.id} project={project} update={this.update}/>
            )
          )}
        </Section>
     
        <Section bgcolor="background.paper2">
          {this.state.projects.map((project, i1) => 
            project.tests.map((test, i2) =>
              <SharedTest key={"test-"+i2} testId={test.id} project={project} update={this.update}/>
            )
          )}
        </Section>

        <Section>
          {(this.state.projects && this.state.projects.length) ?    
            this.state.projects.map((project, i) =>
              <Project key={"project-"+i+"-"+project.id} projectId={project.id} update={this.update} pageUpdate={this.pageUpdate}/>
            )
          : 
            <Typography align="center" variant="body1">We couldn’t find any projects. Try making one.</Typography>
          }
        </Section>

      </Layout>
    );
  }
}

export default defaultPage(Index);
