import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import AnswerQuestionFields from '../components/AnswerQuestionFields';
import { Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
// import "../styles/main.scss";
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const { Parser } = require('json2csv');
import Router from 'next/router';


//////////////////////////////
// Create Test Page

class AnswerQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "answer-question",
      test: {},
      tmpTest: {},
      questionNumber: false
    };
  }
  
  componentDidMount = () => {
    this.update();
  }

  componentDidUpdate = () => {
    if (this.state.questionNumber !== Router.router.query.question){
      this.update();
    }
  }

  pageUpdate = (newQuestion) => {
    this.update(newQuestion);
  }

  titleUpdate = () => {
    axios
      .get(apiUrl + '/tests?id=' + Router.router.query.test, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        this.setState({ tmpTest: response.data[0] });
      }).catch(error => { console.log(error) });
  }

  update = (newQuestion) => {
    let questionNumber = Router.router.query.question;
    if (Number(Router.router.query.question) < 1){
      window.location = "/answer-question?test=" + Router.router.query.test + "&question=1";
      return false;
    }
    axios
      .get(apiUrl + '/tests?id=' + Router.router.query.test, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(test => { // Handle success
        if (Number(Router.router.query.question) > test.data[0].questions.length){
          this.setState({ 
            test: test.data[0],
            tmpTest: test.data[0],
            questionNumber: questionNumber
          });
          window.location = "/answer-question?test=" + Router.router.query.test + "&question=" + test.data[0].questions.length;
          return false;
        }
        if(newQuestion){ 
          this.setState({ 
            test: test.data[0],
            tmpTest: test.data[0],
            questionNumber: questionNumber
          });
          Router.push({
            pathname: '/answer-question',
            query: { 
              test: Router.router.query.test, 
              question: test.data[0].questions.length
            },
          })
        }
        axios
          .get(apiUrl + '/projects?id=' + test.data[0].project.id, {
            headers: { Authorization: "Bearer " + Cookies.get("jwt") }
          }).then(project => { // Handle success
            let newTest = test.data[0];
            newTest.project = project.data[0];
            this.setState({ 
              test: newTest,
              tmpTest: newTest,
              questionNumber: questionNumber
            });
          }).catch(error => { console.log(error) });
      }).catch(error => { console.log(error) });
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" test={this.state.tmpTest} pageUpdate={this.pageUpdate} {...this.props}>
        <Box pt={8} bgcolor="#fff">
          <AnswerQuestionFields titleUpdate={this.titleUpdate} {...this.state} {...this.props} />
        </Box>
      </Layout>
    );
  }
}

export default defaultPage(AnswerQuestionPage);
