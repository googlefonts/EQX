/* /pages/projects.js */

import ProjectList from "../components/ProjectList";
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import Project from "../components/Project";
import Section from "../components/Section";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography} from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/main.scss";



//////////////////////////////
// Create project

class NewProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue : ""
    };
  }
  
  handleOpen = () => {
    this.setState({open: true});
  }
  
  handleClose = () => {
    this.setState({open: false});
    this.setState({ textFieldValue: "" });
  }

  onSubmit = () => {
    let projectName =  this.state.textFieldValue;
    axios
      .post('http://localhost:1337/projects', {
        name: projectName,
        owners: [ Cookies.get("id") ],
        users: [ Cookies.get("id") ],
        major_version: 0,
        minor_version: 1,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error 
      }).then(response => { // Handle success
        this.handleClose();
        this.props.update();
      });
  }

  onChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }
  
  render() {
    return (
      <>
        <>
          <Typography color="primary" align="center" gutterBottom={true} variant="h2" >Time to start a project?</Typography>
          <Typography align="center" gutterBottom={true} variant="body1">Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur verear, ne ferae quidem faciunt, ut labore et dolorum fuga et dolore suo sanciret militaris.</Typography>
          <br/>
          <Button onClick={this.handleOpen} className="align-center" color="primary" size="large" variant="contained">Create a New Project</Button>
          <br/>
          <Typography align="center" gutterBottom={true} variant="caption" display="block">Don’t worry, we’ll help you through it.</Typography>
        </>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Project</DialogTitle>
          <DialogContent>
            <DialogContentText>Projects help you organize your tests to track your progress.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.onChange} autoFocus margin="dense" id="name" label="Project Name" type="email" fullWidth />
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

class SearchSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  onChange(e) {
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render() {
    return (
      <>
        <div className="search">
          <FormGroup>
            <InputLabel>Search</InputLabel>
            <Input onChange={this.onChange.bind(this)} />
          </FormGroup>
        </div>
        <ProjectList search={this.state.query} />
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
    };
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
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get('http://localhost:1337/projects?owners.id='+Cookies.get("id"), { 
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        this.setState({ projects: response.data });

      }).catch(error => { console.log(error); }); // Handle error 
  }

  render() {
    return (
      <Layout page={this.state.page} {...this.props}>
        <Section>
          {this.state.projects.map((project, i) =>
            <Project key={"project-"+i} projectId={project.id} update={this.update}/>
          )}
        </Section>
        <Section>
          <NewProject update={this.update} />
        </Section>
        <Section bgcolor="background.paper2">
          <SearchSection/> 
        </Section>
      </Layout>
    );
  }
}

export default defaultPage(ProjectPage);
