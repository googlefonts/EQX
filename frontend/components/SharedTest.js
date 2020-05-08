import React from "react";
import { CircularProgress, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Cookies from "js-cookie";
import Strapi from 'strapi-sdk-javascript/build/main';
import axios from 'axios';
import RadialGrade from "../components/RadialGrade";
import Link from 'next/link';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);
import Router from 'next/router';

//////////////////////////////
// Test Tests

class TestQuestions extends React.Component {
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
  handleSubmit = () => {
    axios
      .post(apiUrl + '/questions', {
        // question: questionName,
        test: this.props.test.id,
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => {
        console.log(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put(apiUrl + '/tests/' + this.props.test.id, {
            questions: [...this.props.test.questions, response.data.id]
          }, {
            headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
          }).catch(error => {
            console.log(error); // Handle Error
          }).then(response => { // Handle success
            Router.push("/create-question?test=" + this.props.test.id + "&question=" + (this.props.test.questions.length + 1))
          });
      })
  }

  handleChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }

  render() {
    return (
      <Box bgcolor="primary.main" className="primary-background section-tests tabContainer" hidden={1 === this.props.tabValue ? false : true}>
        <List color="primary">
          {(this.props.test.questions && this.props.test.questions.length) ?
            this.props.test.questions.map((question, i) =>
              <Link key={"key-test=" + this.props.test.id + "question-" + (i + 1)} href={"/create-question?test=" + this.props.test.id + "&question=" + (i + 1)}>
                <ListItem button key={"question-" + i}>
                  <Box p={1} pt={2} width="100%">
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          {question.question}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </ListItem>
              </Link>
            )
            :
            <ListItem key={"test-none"}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box color="text.disabled">
                    <Typography variant="body1">This test doesn't have any questions yet.</Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          }
        </List>
        <Box className="overflow-fab-wrap">
          <Fab onClick={this.handleSubmit} className="overflow-fab" variant="extended" size="medium" color="primary" aria-label="add">
            {/* <AddCircleIcon /> 
            <Box component="span">&nbsp;&nbsp;</Box> */}
            <Box component="span">Add Question</Box>
          </Fab>
        </Box>

        {/* 
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Question</DialogTitle>
          <DialogContent>
            <DialogContentText>Questions should be built around verifying a specific goal.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.handleChange} autoFocus margin="dense" id="name" label="Question's Name" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">Create</Button>
          </DialogActions>
        </Dialog> */}
      </Box>
    );
  }
}



//////////////////////////////
// Test Members

class TestMembers extends React.Component {
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
  render() {
    return (
      <Box bgcolor="primary.main" className="primary-background section-members tabContainer" hidden={0 === this.props.tabValue ? false : true}>
        <List>

          <ListItem >
            <Box p={1} pt={2} width="100%">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box style={{ width: "calc(100% - 200px)", display: "inline-block" }}>
                    <LinearProgress className="linear-progress-thick" variant="determinate" value={0} />
                  </Box>
                  <Typography style={{ width: "200px", display: "inline-block" }} align="right" variant="h5">{0}% Done</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="inherit" variant="body2">Completed by 0 of 1 users</Typography>
                </Grid>
              </Grid>
            </Box>
          </ListItem>

          {(this.props.test.users && this.props.test.users.length) &&
            this.props.test.users.map((member, i) =>
              <ListItem key={"test-member-" + i}>
                <Box p={1} pt={2} width="100%">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box style={{ width: "calc(100% - 200px)", display: "inline-block" }}>
                        <LinearProgress variant="determinate" value={0} />
                      </Box>
                      <Typography style={{ width: "200px", display: "inline-block" }} align="right" variant="h6">{0}% Done</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <Typography display="inline" variant="body2">
                          <Box component="span">{member.username}</Box>
                        </Typography>
                        <Divider display="inline-block" orientation="vertical" />
                        <Typography display="inline" variant="body2">
                          <Box component="span" className="inline-button" >Answers</Box>
                        </Typography>
                        <Divider display="inline-block" orientation="vertical" />
                        <Typography display="inline" variant="body2">
                          <Box component="span" className="inline-button" >Comments</Box>
                        </Typography>
                        <Divider display="inline-block" orientation="vertical" />
                        <Typography display="inline" variant="body2">
                          <Box component="span" className="inline-button" >Remind</Box>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </ListItem>
            )
          }
        </List>

      </Box>
    );
  }
}



//////////////////////////////
// Test Import/Export

class TestImportExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  render() {
    return (
      <Box bgcolor="primary.main" className="primary-background section-import-export" hidden={2 === this.props.tabValue ? false : true}>
        <br />
        <br />
        <Typography align="center" gutterBottom={true} variant="h5">Need to get a test off of EQX? Lets make that happen.</Typography>
        <Box my={4} className="text-align-center">
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" size="large" variant="contained">Import JSON</Button>
          </Box>
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" size="large" variant="contained">Export JSON</Button>
          </Box>
        </Box>
        <Box my={4} className="text-align-center">
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" size="large" variant="contained">Import CSV</Button>
          </Box>
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" size="large" variant="contained">Export CSV</Button>
          </Box>
        </Box>
        <Typography align="center" gutterBottom={true} variant="body2" display="block">You can find more on this here.</Typography>
        <br />
        <br />
      </Box>
    );
  }
}


//////////////////////////////
// Current tests

class SharedTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 3,
      tabValue: 0,
      test: {},
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl + '/tests?id_in=' + this.props.testId, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => {
        console.log(error); // Handle error
      }).then(response => { // Handle success
        this.setState({ test: response.data[0] });
      });
  }

  cardOver = () => {
    this.setState({ elevation: 6 });
  }

  cardOut = () => {
    this.setState({ elevation: 3 });
  }

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };


  render() {
    return (
      <Box mb={this.props.modal === true ? 0 : 6} className="test-container" position="relative">
        <Card elevation={this.state.elevation} onMouseOver={this.cardOver} onMouseOut={this.cardOut}>

          {/* Genral Info */}
          <CardContent >
            <Box p={1}>
              <Grid container spacing={0}>
                <Grid item xs>
                  <Box pb={2}>
                    <Typography variant="h6">
                      <Box component="span" color="grey.400">{this.props.project.name} v.{this.props.project.major_version}.{this.props.project.minor_version}</Box>
                    </Typography>
                    <Typography variant="h4">
                      {this.state.test.name}
                      <Box component="span" color="grey.400"> v.{this.state.test.major_version}.{this.state.test.minor_version}</Box>
                    </Typography>
                  </Box>
                  <Box>
                    <Box component="span" color="purple" className="inline-button" mr={2} >
                      <Button color="primary" size="large" variant="contained" >View</Button>
                    </Box>
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" className="inline-button" >Comments</Box>
                    </Typography>
                    <Divider display="inline-block" orientation="vertical" />
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" className="inline-button" >Archive</Box>
                    </Typography>
                    <Divider display="inline-block" orientation="vertical" />
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" className="inline-button" >Remind</Box>
                    </Typography>
                    <Divider display="inline-block" orientation="vertical" />
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" className="inline-button" >Share</Box>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <RadialGrade grade={80} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>

          {/* Actionable Info */}
          <Box bgcolor="primary.main">
            <AppBar position="static" color="primary">
              <Tabs value={this.state.tabValue} onChange={this.handleChange} TabIndicatorProps={{ style: { backgroundColor: "#fff" } }} variant="scrollable" scrollButtons="auto">
                <Tab label="Members" />
                <Tab label="Questions" />
                <Tab label="Import/Export" />
              </Tabs>
            </AppBar>
          </Box>

          {/* Members */}
          <TestMembers {...this.state} update={this.update} />

          {/* Tests */}
          <TestQuestions {...this.state} update={this.update} />

          {/* Import/Export */}
          <TestImportExport {...this.state} update={this.update} />
        </Card>
      </Box>
    );
  }
}
export default SharedTest;