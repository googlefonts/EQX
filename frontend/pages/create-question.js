
import React from "react";
import defaultPage from "../hocs/defaultPage";
import Layout from "../components/Layout";
import EditorImagesImport from '../components/EditorImagesImport'
import CreateQuestionFields from '../components/CreateQuestionFields'
import SharedTest from "../components/SharedTest";
import Section from "../components/Section";
import { Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography} from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import "../styles/main.scss";
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const { Parser } = require('json2csv');


//////////////////////////////
// Create Test Page

class CreateQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "create-question",
      test: {},
      questionNumber: false
    };
  }

  componentDidMount = () => {
    this.update();
  }

  pageUpdate = () => {
    this.update();
  }

  update = () => {
    const params = new URL(document.location).searchParams;
    this.setState({ questionNumber: params.get("question") });
    axios
      .get(apiUrl+'/tests?id=' + params.get("test"), { 
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        // console.log(response.data);
        this.setState({ test: response.data[0] });
 
        // const fields = ['questions'];
        // const opts = { fields };
        
        // try {
        //   const csv = parse(response.data, opts);
        //   console.log(csv);
        // } catch (err) {
        //   console.error(err);
        // }

      }).catch(error => { console.log(error) });
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" test={this.state.test} {...this.props}>
        <Box pt={8} bgcolor="#fff">
          <CreateQuestionFields {...this.state} {...this.props}/>
          <EditorImagesImport {...this.state} {...this.props}/>
        </Box>
      </Layout>
    );
  }
}

export default defaultPage(CreateQuestionPage);
