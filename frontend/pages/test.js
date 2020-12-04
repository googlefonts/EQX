/* /pages/tests.js */

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
// import "../styles/main.scss";


//////////////////////////////
// Create Test Page

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "test",
      projects: [],
    };
  }

  componentDidMount = () => {
    this.update();
  }

  pageUpdate = () => {
    this.update();
  }

  update = () => {
   }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" {...this.props}>
         <CreateQuestionFields/>
         <EditorImagesImport/>
      </Layout>
    );
  }
}

export default defaultPage(Test);
