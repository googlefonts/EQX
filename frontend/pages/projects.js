/* /pages/projects.js */

// import ProjectList from "../components/ProjectList";
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import Project from "../components/Project";
import Section from "../components/Section";
import { TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/main.scss";
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


//////////////////////////////
// Create project

class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValueName: "",
      textFieldValueDesc: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ 
      open: false,
      textFieldValueName: "",
      textFieldValueDesc: "" 
    });
  }

  onSubmit = () => {
    let projectName = this.state.textFieldValueName;
    let projectDesc = this.state.textFieldValueDesc;
    axios
      .post(apiUrl + '/projects', {
        name: projectName,
        description: projectDesc,
        owners: [Cookies.get("id")],
        users: [Cookies.get("id")],
        major_version: 0,
        minor_version: 1,
        archived: false,
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => {
        console.log(error); // Handle error 
      }).then(response => { // Handle success
        this.handleClose();
        this.props.update();
      });
  }

  onChangeName = (e) => {
    this.setState({ textFieldValueName: e.target.value });
  }
  onChangeDesc = (e) => {
    this.setState({ textFieldValueDesc: e.target.value });
  }

  render() {
    return (
      <>
        <>
          <Typography color="primary" align="center" gutterBottom={true} variant="h2" >Time to start a project?</Typography>
          <Typography align="center" gutterBottom={true} variant="body1">Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur verear, ne ferae quidem faciunt, ut labore et dolorum fuga et dolore suo sanciret militaris.</Typography>
          <br />
          <Button onClick={this.handleOpen} className="align-center" color="primary" size="large" variant="contained">Create a New Project</Button>
          <br />
          <Typography align="center" gutterBottom={true} variant="body2" display="block">Don’t worry, we’ll help you through it.</Typography>
        </>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            <DialogContentText>Projects help you organize your tests to track your progress.</DialogContentText>
            <TextField value={this.state.textFieldValueName} 
              onChange={ this.onChangeName } 
              onFocus={() => this.setState({focus: true})}
              onBlur={() => (this.state.textFieldValueName === "") ? this.setState({focus: false}) : this.setState({focus: true})  }
              InputLabelProps={{ 
                style: {
                  fontSize: this.state.focus ? 'inherit' : '2.0243rem',
                }, 
              }} 
              InputProps={{ style: { fontSize: "2.0243rem" } }} 
              autoFocus margin="dense" id="name" label="Project Name" type="email" fullWidth />
            <TextField value={this.state.textFieldValueDesc} onChange={this.onChangeDesc} margin="dense" id="description" label="Project Description (Optional)" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.onSubmit} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}


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
          <Typography align="center" variant="body1">We couldn’t find any archived projects.</Typography>
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
        this.setState({ projects: response.data });

        axios
          .get(apiUrl + '/projects/?owners.id=' + Cookies.get("id") + '&archived_eq=true', {
            headers: { Authorization: "Bearer " + Cookies.get("jwt") }
          }).catch(error => {
            console.log(error); // Handle error
          }).then(response => { // Handle success
            this.setState({ archivedProjects: response.data });
          });

      })
  }

  render() {
    return (
      <Layout page={this.state.page} {...this.props}>
        <Section>
          {(this.state.projects && this.state.projects.length) ?
            this.state.projects.map((project, i) =>
              <Project key={"project-" + i + "-" + project.id} projectId={project.id} update={this.update} pageUpdate={this.pageUpdate} />
            )
            :
            <Typography align="center" variant="body1">We couldn’t find any projects. Try making one.</Typography>
          }
        </Section>
        <Section>
          <NewProject update={this.update} />
        </Section>
        <Section bgcolor="background.paper2">
          <SearchProjects projects={this.state.archivedProjects} pageUpdate={this.pageUpdate} />
        </Section>
      </Layout>
    );
  }
}

export default defaultPage(ProjectPage);
