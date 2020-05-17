
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import EditorImagesImport from '../components/EditorImagesImport'
import CreateQuestionFields from '../components/CreateQuestionFields'
import SharedTest from "../components/SharedTest";
import Section from "../components/Section";
import { Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/main.scss";
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const { Parser } = require('json2csv');
import Router from 'next/router';


//////////////////////////////
// Create Test Page

class CreateQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "create-question",
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
    this.setState({ questionNumber: Router.router.query.question });
    axios
      .get(apiUrl + '/tests?id=' + Router.router.query.test, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        this.setState({ 
          test: response.data[0],
          tmpTest: response.data[0] 
        });
        console.log(newQuestion);
        if(newQuestion){ 
          Router.push({
            pathname: '/create-question',
            query: { 
              test: this.state.test.id, 
              question: this.state.test.questions.length
            },
          })
        }
      }).catch(error => { console.log(error) });
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" test={this.state.tmpTest} pageUpdate={this.pageUpdate} {...this.props}>
        <Box pt={8} bgcolor="#fff">
          <CreateQuestionFields titleUpdate={this.titleUpdate} {...this.state} {...this.props} />
          <EditorImagesImport {...this.state} {...this.props} />
        </Box>
      </Layout>
    );
  }
}

export default defaultPage(CreateQuestionPage);
