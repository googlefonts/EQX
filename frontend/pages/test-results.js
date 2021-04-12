import TestOverview from '../components/TestResults/TestOverview';
import UserCompletion from '../components/TestResults/UserCompletion';
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

class TestResultsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "test-results",
      test: {},
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
      .get(apiUrl + '/tests?id=' + Router.router.query.test, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(test => { // Handle success
        
          this.setState({ 
            test: test.data[0]
          });
      }).catch(error => { console.log(error) });
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" test={this.state.test} pageUpdate={this.pageUpdate} {...this.props}>
        <Box pt={8} pb={8} bgcolor="#fff">
        <TestOverview/>
        <UserCompletion/>
        </Box>
      </Layout>
    );
  }
}

export default defaultPage(TestResultsPage);
