import React from "react";
import { IconButton, CircularProgress, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditableTitleAndDescription from "../components/EditableTitleAndDescription";
import eachOf from 'async/eachOf';
import async from 'async';

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
        console.error(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put(apiUrl + '/tests/' + this.props.test.id, {
            questions: [...this.props.test.questions, response.data.id]
          }, {
            headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
          }).catch(error => {
            console.error(error); // Handle Error
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
      <Box bgcolor="primary.main" className="primary-background section-tests tabContainer" hidden={0 === this.props.tabValue ? false : true}>
        <List color="primary">
          {(this.props.test.questions && this.props.test.questions.length) ?
            this.props.test.questions.map((question, i) =>
              <Link key={"key-test=" + this.props.test.id + "question-" + (i + 1)} href={"/create-question?test=" + this.props.test.id + "&question=" + (i + 1)}><a>
                <ListItem button key={"question-" + i}>
                  <Box p={1} pt={2} width="100%">
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <Typography variant="body1" style={{maxWidth: "initial"}}>
                          { (typeof question.question !== "undefined" && question.question && question.question.trim() !== "" ) ? 
                            question.question  : 
                            <Box color="text.disabled" component="span" className="blank">Blank Question</Box>
                          }
                        </Typography>
                      </Grid>
                      <Grid item style={{position:"relative"}} xs={4} >
                        <IconButton style={{position:"absolute", right: "0", top: "-8px", color:"white"}} component="span">
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                </ListItem>
              </a></Link>
            )
            :
            <ListItem key={"test-none"}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box color="text.disabled">
                    <Typography variant="body1" style={{maxWidth: "initial"}}>This test doesn't have any questions yet.</Typography>
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
      <Box bgcolor="primary.main" className="primary-background section-members tabContainer" hidden={1 === this.props.tabValue ? false : true}>
        <List>

          <ListItem >
            <Box p={1} pt={2} width="100%">
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Box style={{ float: "left", width: "calc(100% - 150px)", display: "inline-block" }}>
                    <LinearProgress style={{ height: "40px"}} className="linear-progress-thick linear-progress-white" variant="determinate" value={this.props.testCompleteness ? Math.ceil(this.props.testCompleteness) : 0} />
                  </Box>
                  <Box style={{ borderRadius: "0 5px 5px 0", float: "left", position: "relative", padding: "0 10px 0 0 ", background: this.props.testCompleteness >= 100 ? "#9c27b0" : "rgb(217, 172, 224)", width: "150px", display: "inline-block" }}>
                    <Typography style={{color: "#9c27b0", lineHeight: "40px"}} align="right" variant="h5">{this.props.testCompleteness ? Math.ceil(this.props.testCompleteness) : 0}% Done</Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography color="inherit"  display="inline" variant="body2">{this.props.totalAnswers} total answers</Typography>
                  <Divider display="inline" orientation="vertical" />
                  <Typography color="inherit"  display="inline" variant="body2">You answered {this.props.yourAnswers} questions ({this.props.yourCorrectAnswers} passed)</Typography>
                </Grid>
              </Grid>
            </Box>
          </ListItem>

          {(this.props.test.users && this.props.test.users.length) &&
            this.props.test.users.map((user, i) =>
              <ListItem key={"test-member-" + i}>
                <Box p={1} pt={2} width="100%">
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Box style={{ width: "calc(100% - 110px)", display: "inline-block" }}>
                        <LinearProgress className="linear-progress-white" variant="determinate" value={user.answeredQuestions ? Math.ceil(user.answeredQuestions / this.props.test.questions.length * 100) : 0} />
                      </Box>
                      <Box style={{ position: "relative", top:"3px", padding: "1px 10px 0 0 ", borderRadius: "5px", background: Math.ceil(user.answeredQuestions / this.props.test.questions.length * 100) >= 100 ? "white" : "rgb(217, 172, 224)", width: "110px", display: "inline-block" }}>
                        <Typography style={{color: "#9c27b0"}} align="right" variant="h6">{user.answeredQuestions ? Math.ceil(user.answeredQuestions / this.props.test.questions.length * 100) : 0}% Done</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box>
                        <Typography display="inline" variant="body2">
                          <Box component="span">{user.username}</Box>
                        </Typography>
                        {/* <Divider display="inline-block" orientation="vertical" />
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
                        </Typography> */}
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
            <Button onClick={this.handleOpen} disabled={true} display="inline" size="large" variant="contained">Import JSON</Button>
          </Box>
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} disabled={true} display="inline" size="large" variant="contained">Export JSON</Button>
          </Box>
        </Box>
        <Box my={4} className="text-align-center">
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} disabled={true} display="inline" size="large" variant="contained">Import CSV</Button>
          </Box>
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} disabled={true} display="inline" size="large" variant="contained">Export CSV</Button>
          </Box>
        </Box>
        <Typography align="center" gutterBottom={true} variant="body2" style={{margin: "0 auto"}} display="block">You can find more on this here.</Typography>
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
      testCompleteness: 0,
      testGrade: 0,
      totalAnswers: 0,
      yourAnswers: 0,
      yourCorrectAnswers: 0
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl + '/tests/' + this.props.testId, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(test => { // Handle success
        
        var test = test.data;
        let questionLength = 0;
        if (typeof test.questions !== 'undefined' && test.questions > 0) {
          questionLength = test.questions;
        }
        this.setState({test: test});
        async.eachOf(test.questions, (question, i, callback) => {
          axios // Get Question
          .get(apiUrl + "/questions/" + question.id, 
            { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.error(error); // Handle Error
          }).then(question => { // Handle success
            test.questions[i] = question.data;
            callback();
          });

        }, (err, results) => {

          this.setState({test: test});

          // Add responses to comments
          async.eachOf(test.questions, (question, index, callback) => {
            async.eachOf(question.comments, (comment, index2, callback2) => {
              axios // Get Question
              .get(apiUrl + "/comments/" + comment.id, 
                { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
              }).catch(error => { console.error(error); // Handle Error
              }).then(comment => { // Handle success
                test.questions[index].comments[index2] = comment.data;
                callback2();
              });
            }, (err, results) => {
              callback();
            });
          }, (err, results) => {
            this.setState({test: test});
          });

          // Find Total Questions and set Question Grade
          var answeredQuestions = 0;
          var yourAnswers = 0;
          var yourCorrectAnswers = 0;
          test.questions.forEach(question => {
            var grade = 0;
            question.answers.forEach(answer => {
              if (answer.true){
                grade += 100 / question.answers.length
              }
              if (answer.user === Cookies.get("id")){
                yourAnswers++;
                if (answer.true){
                  yourCorrectAnswers++;
                }
              }
            });
            if(question.answers.length){
              answeredQuestions++;
            } else {
              grade = null;
            }
            question.grade = grade;
          });

          // Find and Set Test Grade
          var testGrade = 0;
          test.questions.forEach(question => {
            if(question.answers.length){
              testGrade += question.grade / answeredQuestions;
            }
          });

          // Find user completeness of test
          test.users.forEach((user) => {
            var answeredQuestions = 0;
            test.questions.forEach(question => {
              if (question.answers.some(el => Number(el.user) === Number(user.id))) {
                answeredQuestions++;
              }
            });
            user.answeredQuestions = answeredQuestions;
          });

          // Find total completeness of test
          var totalAnswers = 0;
          test.users.forEach(user => {
            totalAnswers += user.answeredQuestions;
          });
          var testCompleteness = (totalAnswers / (test.users.length * test.questions.length)) * 100;


          this.setState({ 
            test: test,
            testCompleteness: testCompleteness ? testCompleteness : 0,
            testGrade: testGrade ? testGrade : null,
            totalAnswers: totalAnswers,
            yourAnswers: yourAnswers,
            yourCorrectAnswers: yourCorrectAnswers

          });
        });
      }).catch(error => { console.error(error) });
  }


  archive = () => {
    axios
      .put(apiUrl + '/tests/' + this.state.test.id, {
        archived: !this.state.test.archived
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
      }).then(response => { // Handle success
        this.props.pageUpdate();
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
        <Card elevation={this.state.elevation} onMouseEnter={this.cardOver} onMouseLeave={this.cardOut}>

          {/* General Info */}
          <CardContent >
            <Box p={1}>
              <Grid container spacing={0}>
                <Grid item xs>
                  <Box pb={2}>
                    <Typography variant="h6">
                      <Box component="span" color="grey.400">{this.props.project ? this.props.project.name : ""} v.{this.props.project ? this.props.project.major_version : ""}.{this.props.project ? this.props.project.minor_version : ""}</Box>
                    </Typography>
                    <Typography variant="h4">
                      {/* <EditableTitle value={this.state.test.name} item={this.state.test} type="test" {...this.state}/> */}
                      <EditableTitleAndDescription nameValue={this.state.test.name} descValue={this.state.test.description} item={this.state.test} type="test" {...this.state}/>

                      {/* {this.state.test.name}
                      <Box component="span" color="grey.400"> v.{this.state.test.major_version}.{this.state.test.minor_version}</Box> */}
                    </Typography>
                  </Box>
                  {/* <Box> */}
                    <Link href={"/test-results?test=" + this.state.test.id}><a>
                      <Typography display="inline" variant="body2">
                        <Box component="span" color="purple" className="inline-button" mr={2} >
                          <Button color="primary" size="large" variant="contained" >See Results</Button>
                        </Box>
                      </Typography>
                    </a></Link>
                    {/* <Divider display="inline-block" orientation="vertical" /> */}
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" onClick={this.archive} className="inline-button" >Archive</Box>
                    </Typography>
                    {/* <Divider display="inline-block" orientation="vertical" />
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" className="inline-button" >Remind</Box>
                    </Typography> */}
                    {/* <Divider display="inline-block" orientation="vertical" />
                    <Typography display="inline" variant="body2">
                      <Box component="span" color="purple" className="inline-button" >Share</Box>
                    </Typography> */}
                  {/* </Box> */}
                </Grid>
                <Grid item xs={4}>
                  <RadialGrade grade={this.state.testGrade ? Number(this.state.testGrade) : 0} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>

          {/* <Box bgcolor="primary.main"> */}
            <AppBar position="static" color="primary">
              <Tabs 
                value={this.state.tabValue} 
                onChange={this.handleChange} 
                TabIndicatorProps={{ style: { backgroundColor: "#fff" } }} 
                variant="scrollable" 
                scrollButtons="auto"
              >
                <Tab label={"Questions (" + (this.state.test.questions ? this.state.test.questions.length : "0") + ")"} />
                <Tab label={"Members (" + (this.state.test.users ? this.state.test.users.length : "0") + ")"} />
                <Tab label="Import/Export" />
              </Tabs>
            </AppBar>
          {/* </Box> */}

          {/* Tests */}
          <TestQuestions {...this.state} update={this.update} />

          {/* Members */}
          <TestMembers {...this.state} update={this.update} />

          {/* Import/Export */}
          <TestImportExport {...this.state} update={this.update} />
        </Card>
      </Box>
    );
  }
}
export default SharedTest;