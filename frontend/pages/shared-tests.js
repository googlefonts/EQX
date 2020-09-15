/* /pages/tests.js */

import React from "react";
import Link from "next/link";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import SharedTest from "../components/SharedTest";
import Section from "../components/Section";
import { Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/main.scss";
import getConfig from 'next/config'
import NewProject from "../components/NewProject";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


//////////////////////////////
// Create test

class NewTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ textFieldValue: "" });
  }

  onSubmit = () => {
    let testName = this.state.textFieldValue;
    axios
      .post(apiUrl + '/tests', {
        name: testName,
        owners: [Cookies.get("id")],
        users: [Cookies.get("id")],
        major_version: 0,
        minor_version: 1,
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => {
        console.log(error); // Handle error 
      }).then(response => { // Handle success
        this.handleClose();
      });
  }

  onChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }

  render() {
    return (
      <>
        <>
          <Typography color="primary" align="center" gutterBottom={true} variant="h2" >Need to make your own test?</Typography>
          <Typography align="center" gutterBottom={true} variant="body1">Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur verear, ne ferae quidem faciunt, ut labore et dolorum fuga et dolore suo sanciret militaris.</Typography>
          <br />

          <Button onClick={this.handleOpen} color="primary" size="large" variant="contained">Create a New Test</Button>
          <Button onClick={console.log("not yet, sry.")} color="primary" size="large" variant="contained">Use a Template</Button>
          <br />
          <Typography align="center" gutterBottom={true} variant="body2" display="block">Don’t worry, we’ll help you through it.</Typography>
        </>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Test</DialogTitle>
          <DialogContent>
            <DialogContentText>Tests help you organize your questions to track your progress.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.onChange} autoFocus margin="dense" id="name" label="Test Name" type="email" fullWidth />
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
// Search Archived Tests

class SearchTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      projects: this.props.projects,
      archivedTests: [],
      searchedTests: [],
    };
  }

  componentDidMount = () => {
    this.update();
  }

  componentDidUpdate(prevProps) {
    if (this.state.projects !== this.props.projects) {
      this.setState({ projects: this.props.projects });
      this.update();
    }
  }

  update = () => {
    let archivedTests = [];
    this.props.projects.forEach(function (project, i) {
      project.tests.forEach(function (test, i) {
        if (test.archived === true) {
          archivedTests.push(test);
        }
      })
    })
    this.setState({ archivedTests: archivedTests });
  }

  onChange(e) {
    this.setState({
      query: e.target.value.toLowerCase(),
      searchedTests: this.state.archivedTests.filter(test => test.name.toLowerCase().includes(e.target.value.toLowerCase()))
    });
  }

  pageUpdate = () => {
    this.props.pageUpdate();
  }

  render() {
    return (
      <>
        <Box className="search" mb={4}>
          <TextField onChange={this.handleChange} autoFocus margin="dense" onChange={this.onChange.bind(this)} label="Search archived tests in active projects" type="text" fullWidth />
        </Box>

        {(this.state.searchedTests && this.state.searchedTests.length) ?
          this.state.searchedTests.map((test, i) =>
            <SharedTest key={"archived-test-" + i + "-" + test.id} testId={test.id} pageUpdate={this.pageUpdate} />
          )
          :
          <Typography align="center" variant="body1">We couldn’t find any archived tests.</Typography>
        }

      </>
    );
  }
}


//////////////////////////////
// Create Test Page

class SharedTestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "shared-tests",
      projects: [],
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
      .get(apiUrl + '/projects?owners.id=' + Cookies.get("id") + '&archived_eq=false', {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error 
      }).then(response => { // Handle success
        if (typeof response !== "undefined" && typeof response.data !== "undefined"){
          this.setState({ projects: response.data });
        }
      });
  }

  render() {
    var hasTests = false;
    this.state.projects.map((project, i1) => {
      project.tests.map((test, i2) => {
        console.log(test)
        hasTests = true;
      })
    });
    return (
      <Layout page={this.state.page} {...this.props}>
        {(this.state.projects && this.state.projects.length) ?
          <>
            <Section>
              {this.state.projects.map((project, i1) =>
                project.tests.map((test, i2) =>
                  <SharedTest key={"test-" + i2} testId={test.id} project={project} update={this.update} />,
                )
              )}
              { !hasTests ?
                <Typography align="center" gutterBottom={true} variant="body1">Looks like you have projects but no tests. <Link href="/projects"><a>Try making one </a></Link>or ask your project owner&nbsp;to.</Typography>
              :
                <></>
              }
            </Section>
            <Section bgcolor="background.paper2">
              <SearchTests projects={this.state.projects} pageUpdate={this.pageUpdate} />
            </Section>
          </>
        :
          <Section>
            <NewProject update={this.update} />
          </Section>
        }
      </Layout>
    );
  }
}

export default defaultPage(SharedTestPage);
