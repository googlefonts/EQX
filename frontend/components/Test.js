import React from "react";
import { Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Cookies from "js-cookie";
import Strapi from 'strapi-sdk-javascript/build/main';
import axios from 'axios';
import getConfig from 'next/config';
import Link from "next/link";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);
import eachOf from 'async/eachOf';
import async from 'async';
import theme from '../src/theme';


//////////////////////////////
// Test Component

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 3,
      tabValue: 0,
      test: {},
      questionLength: 0,
      testCompleteness: 0
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl + '/tests/' + this.props.testId, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
      }).then(response => { // Handle success
        var test = response.data;
        let questionLength = 0;
        if (typeof test.questions !== 'undefined' && test.questions > 0) {
          questionLength = test.questions;
        }
        this.setState({ 
          test: test,
          questionLength: questionLength
        });

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

          var userAnswers = 0;
          test.questions.forEach(question => {
            question.answers.forEach(answer => {
              if (answer.user = Cookies.get("id")){
                userAnswers++
              }
            });
          });
          var testCompleteness = userAnswers / test.questions.length * 100;
          this.setState({ 
            test: test,
            testCompleteness: testCompleteness
          });
        });
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
      <Box mb={6} className="test-container" position="relative">
        <Card elevation={this.state.elevation} onMouseEnter={this.cardOver} onMouseLeave={this.cardOut}>

          {/* General Info */}
          <CardContent >
            <Box p={1}>
              <Grid container spacing={0}>
                <Grid item xs>
                  <Box pb={1}>
                    <Typography variant="h6">
                      <Box component="span" color="grey.400">{this.props.project.name} v.{this.props.project.major_version}.{this.props.project.minor_version}</Box>
                    </Typography>
                    <Typography variant="h4" style={{padding: "6px 0 7px"}}>
                      {this.state.test.name}
                      <Box component="span" color="grey.400"> v.{this.state.test.major_version}.{this.state.test.minor_version}</Box>
                    </Typography>
                  </Box>
                  <Box pb={1}>
                    <Typography variant="body2">{this.state.test.description}</Typography>
                  </Box>

                  <Box className="progress-bar" pb={3}>
                    <Box style={{ width: "calc(100% - 110px)", display: "inline-block" }}>
                      <LinearProgress variant="determinate" value={this.state.testCompleteness ? Math.ceil(this.state.testCompleteness) : 0} />
                    </Box>
                    <Box style={{ position: "relative", top:"3px", padding: "1px 10px 0 0 ", borderRadius: "5px", background: this.state.testCompleteness >= 100 ? theme.palette.primary.dark : theme.palette.primary.light, width: "110px", display: "inline-block" }}>
                      <Typography style={{color: "white"}} align="right" variant="h6">{this.state.testCompleteness ? Math.ceil(this.state.testCompleteness) : 0}% Done</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box component="span" className="inline-button" mr={2} >
                      <Link href={"/answer-question?test=" + this.state.test.id + "&question=1"}><a>
                        <Button color="primary" size="large" variant="contained">Start</Button>
                      </a></Link>
                    </Box>
                    <Typography display="inline" variant="body2">
                      <Box component="span">{this.state.test.questions ? (this.state.test.questions.length) : 0} Questions</Box>
                    </Typography>
                    <Divider display="inline-block" orientation="vertical" />
                    <Link href={"/test-results?test=" + this.state.test.id}><a>
                      <Typography display="inline" variant="body2">
                        <Box component="span" className="inline-button" >See Results</Box>
                      </Typography>
                    </a></Link>
                  </Box>
                </Grid>
                {/* <Grid item xs={4}>
                  <RadialGrade grade={this.state.test.grade ? this.state.test.grade : 0}  />
                </Grid> */}
              </Grid>
            </Box>

          </CardContent>
        </Card>
      </Box>
    );
  }
}
export default Test;