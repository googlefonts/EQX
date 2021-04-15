import TestOverview from '../components/TestResults/TestOverview';
import UserCompletion from '../components/TestResults/UserCompletion';
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import AnswerQuestionFields from '../components/AnswerQuestionFields';
import { Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
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

//////////////////////////////
// Create Test Page

class TestResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "test-results",
      test: {},
      testCompleteness: 0,
      testGrade: 0
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

          // Find Total Answers
          var userAnswers = 0;
          test.questions.forEach(question => {
            question.answers.forEach(answer => {
              if (answer.user = Cookies.get("id")){
                userAnswers++
              }
            });
          });
          var testCompleteness = userAnswers / test.questions.length * 100;

          // Find Total Questions and set Question Grade
          var answeredQuestions = 0;
          test.questions.forEach(question => {
            var grade = 0;
            question.answers.forEach(answer => {
              if (answer.true){
                grade += 100 / question.answers.length
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

          this.setState({ 
            test: test,
            testCompleteness: testCompleteness ? testCompleteness : 0,
            testGrade: testGrade ? testGrade : null
          });
        });
      }).catch(error => { console.error(error) });
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" test={this.state.test} pageUpdate={this.pageUpdate} {...this.props}>
        <Box pt={8} pb={8} bgcolor="#fff">
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
              <Typography color="inherit" variant="body2">Completed by 0 of 1 users</Typography>
            </Grid>
          </Grid>
        </Box>       
        <Box pt={0} pb={0} bgcolor="background.paper2">
          <Grid container spacing={4} className="section">
            <Grid item xs={12}>
              {(this.state.test.questions && this.state.test.questions.length) ?
                this.state.test.questions.map((question, i) =>
                  <ListItem button key={"question-" + i}>
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
                          {console.log(question.grade)}
                          <RadialGradeSmall grade={question.grade !== null ? question.grade : "?"} />
                          {/* <h1>hi</h1> */}
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
