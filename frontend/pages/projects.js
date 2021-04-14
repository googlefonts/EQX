/* /pages/projects.js */

// import ProjectList from "../components/ProjectList";
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import Project from "../components/Project";
import Section from "../components/Section";
import NewProject from "../components/NewProject";
import { TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
// import "../styles/main.scss";
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


//////////////////////////////
// Search Archived Projects

class SearchProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      projects: this.props.projects,
      searchedProjects: this.props.projects,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.projects !== this.props.projects) {
      this.setState({ projects: this.props.projects, searchedProjects: this.props.projects });
    }
  }

  onChange(e) {
    this.setState({
      query: e.target.value.toLowerCase(),
      searchedProjects: this.props.projects.filter(project => project.name.toLowerCase().includes(e.target.value.toLowerCase()))
    });
  }

  pageUpdate = () => {
    this.props.pageUpdate();
  }

  render() {
    return (
      <>
        <Box className="search" mb={4}>
          <TextField onChange={this.handleChange} autoFocus margin="dense" onChange={this.onChange.bind(this)} label="Search archived projects" type="text" fullWidth />
        </Box>

        {(this.state.searchedProjects && this.state.searchedProjects.length) ?
          this.state.searchedProjects.map((project, i) =>
            <Project key={"archived-project-" + i + "-" + project.id} projectId={project.id} pageUpdate={this.pageUpdate} />
          )
          :
          <Typography align="center" style={{color: "rgba(0,0,0,.25)", margin: "2rem auto", maxWidth: "700px" }} variant="h4">We couldn’t find any archived projects.</Typography>
        }
      </>
    );
  }
}


//////////////////////////////
// Create Project Page

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "projects",
      projects: [],
      archivedProjects: [],
    };
  }

  componentDidMount = () => {
    this.update();
  }

  pageUpdate = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl + '/projects/?owners.id=' + Cookies.get("id") + '&archived_eq=false', {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
      }).then(response => { // Handle success
        if (typeof response !== "undefined" && typeof response.data !== "undefined"){
          this.setState({ projects: response.data });
        }
      });
    axios
      .get(apiUrl + '/projects/?owners.id=' + Cookies.get("id") + '&archived_eq=true', {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).catch(error => { console.error(error); // Handle error
      }).then(response => { // Handle success
        if (typeof response !== "undefined" && typeof response.data !== "undefined"){
          this.setState({ archivedProjects: response.data });
        }
      });
  }

  render() {
    return (
      <Layout page={this.state.page} {...this.props}>
        {(this.state.projects && this.state.projects.length) ?
          <Section>
            {this.state.projects.map((project, i) =>
              <Project key={"project-" + i + "-" + project.id} projectId={project.id} update={this.update} pageUpdate={this.pageUpdate} />
            )}
          </Section>
        :
          null
        }
        <Section>
          <NewProject update={this.update} />
        </Section>
        {(this.state.archivedProjects && this.state.archivedProjects.length) ?
          <Section bgcolor="background.paper2">
            <SearchProjects projects={this.state.archivedProjects} pageUpdate={this.pageUpdate} />
          </Section>
        :
          null
        }
      </Layout>
    );
  }
}

export default defaultPage(ProjectPage);
