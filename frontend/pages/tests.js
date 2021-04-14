/* /pages/tests.js */

import React from "react";
import defaultPage from "../hocs/defaultPage";
import Link from "next/link";
import Layout from "../components/Layout";
import Test from "../components/Test";
import Section from "../components/Section";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
// import "../styles/main.scss";
import getConfig from 'next/config'
import NewProject from "../components/NewProject";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


//////////////////////////////
// Create test

// class NewTest extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       textFieldValue: ""
//     };
//   }

//   handleOpen = () => {
//     this.setState({ open: true });
//   }

//   handleClose = () => {
//     this.setState({ open: false });
//     this.setState({ textFieldValue: "" });
//   }

//   onSubmit = () => {
//     let testName = this.state.textFieldValue;
//     axios
//       .post(apiUrl + '/tests', {
//         name: testName,
//         owners: [Cookies.get("id")],
//         users: [Cookies.get("id")],
//         major_version: 0,
//         minor_version: 1,
//       }, {
//         headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
//       }).catch(error => {
//         console.error(error); // Handle error 
//       }).then(response => { // Handle success
//         this.handleClose();
//       });
//   }

//   onChange = (e) => {
//     this.setState({ textFieldValue: e.target.value });
//   }

//   render() {
//     return (
//       <>
//         <>
//           <Typography color="primary" align="center" gutterBottom={true} variant="h2" >Need to make your own test?</Typography>
//           <Typography align="center" gutterBottom={true} variant="body1">Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit, quod summum malum et, quantum possit, a philosophis compluribus permulta dicantur, cur verear, ne ferae quidem faciunt, ut labore et dolorum fuga et dolore suo sanciret militaris.</Typography>
//           <br />
//           <Button onClick={this.handleOpen} color="primary" size="large" variant="contained">Create a New Test</Button>
//           <Button onClick={console.log("not yet, sry.")} color="primary" size="large" variant="contained">Use a Template</Button>
//           <br />
//           <Typography align="center" gutterBottom={true} variant="body2" display="block">Don’t worry, we’ll help you through it.</Typography>
//         </>

//         <Dialog open={this.state.open} onClose={this.handleClose}>
//           <DialogTitle id="form-dialog-title">New Test</DialogTitle>
//           <DialogContent>
//             <DialogContentText>Tests help you organize your questions to track your progress.</DialogContentText>
//             <TextField value={this.state.textFieldValue} onChange={this.onChange} autoFocus margin="dense" id="name" label="Test Name" type="email" fullWidth />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">Cancel</Button>
//             <Button onClick={this.onSubmit} color="primary">Create</Button>
//           </DialogActions>
//         </Dialog>
//       </>
//     );
//   }
// }


//////////////////////////////
// Search Archived Tests

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
      </>
    );
  }
}


//////////////////////////////
// Create Test Page

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "tests",
      projects: [],
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl + '/projects?owners.id=' + Cookies.get("id") + '&archived_eq=false', {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        this.setState({ projects: response.data });

      }).catch(error => { console.error(error); }); // Handle error 
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
                  <Test key={"test-" + i2} testId={test.id} project={project} update={this.update} />
                )
              )}
              { !hasTests ?
                <Typography align="center" style={{color: "rgba(0,0,0,.25)", margin: "2rem auto", maxWidth: "700px" }} variant="h4">Looks like you have projects but no tests. <Link href="/projects"><a>Try making one </a></Link>or ask your project owner&nbsp;to.</Typography>
              :
                <></>
              }
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

export default defaultPage(TestPage);
