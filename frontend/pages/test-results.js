import TestOverview from '../components/TestResults/TestOverview';
import UserCompletion from '../components/TestResults/UserCompletion';
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import AnswerQuestionFields from '../components/AnswerQuestionFields';
import { ButtonGroup, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import Link from "next/link";
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const { Parser } = require('json2csv');
import Router from 'next/router';
import RadialGrade from "../components/RadialGrade";
import RadialGradeSmall from "../components/RadialGradeSmall";
import eachOf from 'async/eachOf';
import async from 'async';
import GetAppIcon from '@material-ui/icons/GetApp';

const saveTemplateAsFile = (filename, jsonToWrite) => {
  const blob = new Blob([jsonToWrite], { type: "text/json" });
  const link = document.createElement("a");

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

  const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove()
};

//////////////////////////////
// Create Test Page

class TestResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "test-results",
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

  // componentDidUpdate = () => {
  //   if (this.state.questionNumber !== Router.router.query.question){
  //     this.update();
  //   }
  // }

  pageUpdate = () => {
    this.update();
  }

  questionUpdate = () => {
    this.update();
  }


  update = () => {
    axios
      .get(apiUrl + '/tests/' + Router.router.query.test, {
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
              if (Number(answer.user) === Number(Cookies.get("id"))){
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


  downloadTestJSON = () => {
    saveTemplateAsFile(this.state.test.name, JSON.stringify(this.state.test));
  }
  downloadTestPDF = () => {
    window.print();
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" test={this.state.test} pageUpdate={this.pageUpdate} {...this.props}>
        <Box className="test-result-header" pt={8} pb={8} bgcolor="#fff">
        {/* <TestOverview/>
        <UserCompletion/> */}
          <Grid container spacing={4} className="section">
            <Grid item xs={8}>
              <Box pb={1}>
                <Typography variant="h6">
                  <Box component="span" color="grey.400">{this.state.test.project ? this.state.test.project.name : ""} v.{this.state.test.project ? this.state.test.project.major_version : ""}.{this.state.test.project ? this.state.test.project.minor_version : ""}</Box>
                </Typography>
                <Typography variant="h4" style={{padding: "6px 0 7px"}}>
                  {this.state.test.name}
                  <Box component="span" color="grey.400"> v.{this.state.test.major_version}.{this.state.test.minor_version}</Box>
                </Typography>
              </Box>
              <Box pb={1}>
                <Typography variant="body2">{this.state.test.description}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <RadialGrade grade={this.state.testGrade ? Number(this.state.testGrade) : 0} />
            </Grid>
            <Grid item xs={12}>
              <Box style={{ float: "left", width: "calc(100% - 150px)", display: "inline-block" }}>
                <LinearProgress style={{ height: "40px"}} className="linear-progress-thick" variant="determinate" value={this.state.testCompleteness ? Math.ceil(this.state.testCompleteness) : 0} />
              </Box>
              <Box style={{ borderRadius: "0 5px 5px 0", float: "left", position: "relative", padding: "0 10px 0 0 ", background: this.state.testCompleteness >= 100 ? "#9c27b0" : "rgb(217, 172, 224)", width: "150px", display: "inline-block" }}>
                <Typography style={{color: "#9c27b0", lineHeight: "40px"}} align="right" variant="h5">{this.state.testCompleteness ? Math.ceil(this.state.testCompleteness) : 0}% Done</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box component="span" color="purple" className="inline-button" mr={2} >
                <Button onClick={this.downloadTestPDF} color="primary" size="large" variant="contained" startIcon={<GetAppIcon />}>PDF</Button>
              </Box>
              <Box component="span" color="purple" className="inline-button" mr={2} >
                <Button onClick={this.downloadTestJSON} color="primary" size="large" variant="contained" startIcon={<GetAppIcon />}>JSON</Button>
              </Box>
              <Typography color="inherit"  display="inline" variant="body2">{this.state.totalAnswers} total answers</Typography>
              <Divider display="inline" orientation="vertical" />
              <Typography color="inherit"  display="inline" variant="body2">You answered {this.state.yourAnswers} questions ({this.state.yourCorrectAnswers} passed)</Typography>
            </Grid>
          </Grid>
        </Box>       
        <Box pt={0} pb={0} bgcolor="background.paper2">
          <Grid container spacing={4} className="section">
            <Grid item xs={12}>
              {(this.state.test.questions && this.state.test.questions.length) ?
                this.state.test.questions.map((question, i) =>
                  <ListItem className="test-result-section" key={"question-" + i}>
                    <Box pt={2} pb={2} width="100%">
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <Typography variant="body1" style={{maxWidth: "initial"}}>
                            { (typeof question.question !== "undefined" && question.question && question.question.trim() !== "" ) ? 
                              question.question : 
                              <Box component="span" className="blank">Blank Question</Box>
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <RadialGradeSmall grade={question.grade !== null ? question.grade : "?"} />
                        </Grid>
                        <Grid item xs={12}>
                                
                          <Box className="progress-bar">
                            <Box style={{ width: "calc(100% - 110px)", display: "inline-block" }}>
                              <LinearProgress variant="determinate" value={ typeof question.answers !== "undefined" ? Math.ceil((question.answers.length / this.state.test.users.length) * 100) : 0} />
                            </Box>
                            <Box style={{ position: "relative", top:"3px", padding: "1px 10px 0 0 ", borderRadius: "5px", background: (typeof question.answers !== "undefined" && Math.ceil((question.answers.length / this.state.test.users.length) * 100) === 100) ? "#9c27b0" : "rgb(217, 172, 224)", width: "110px", display: "inline-block" }}>
                              <Typography style={{color: "white"}} align="right" variant="h6">{ typeof question.answers !== "undefined" ? Math.ceil((question.answers.length / this.state.test.users.length) * 100) : 0}% Done</Typography>
                            </Box>
                            <Link href={"/answer-question?test=" + this.state.test.id + "&question=" + (i+1)}><a>
                              <Typography display="inline" variant="body2">
                                <Box component="span" color="purple" className="inline-button" >View Question</Box>
                              </Typography>
                            </a></Link>
                            <Divider display="inline-block" orientation="vertical" />
                            <Typography display="inline" variant="body2">
                              <Box component="span">{(typeof question.answers !== "undefined" && this.state.test.users.length) ? question.answers.length + " of " + this.state.test.users.length + " members gave feedback" :  "0 members gave feedback"}</Box>
                            </Typography>
                            {typeof question.comments !== "undefined" && question.comments.length ? 
                              <>
                                <Divider display="inline-block" orientation="vertical" />
                                <Typography display="inline" variant="body2">
                                  <Box component="span">{question.comments.length > 1 ? question.comments.length + " Comments" : "1 Comment"}</Box>
                                </Typography>
                              </>
                            :
                              null
                            }
                          </Box>
                        </Grid>

                      </Grid>
                    </Box>
                  </ListItem>
                )
              :
                <ListItem key={"test-none"}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box color="text.disabled">
                        <Typography variant="body1" style={{color: "white", maxWidth: "initial"}}>This test doesn't have any questions yet.</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              }
            </Grid>
          </Grid>
        </Box>
      </Layout>
    );
  }
}

export default defaultPage(TestResultsPage);
