
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


//////////////////////////////
// Create Test Page

class CreateQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "question",
      tests: [],
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
    axios
      .get('http://localhost:1337/tests?id=' + params.get("test"), { 
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).then(response => { // Handle success
        this.setState({ tests: response.data });
      }).catch(error => { console.log(error) });
  }

  render() {
    return (
      <Layout page={this.state.page} headerType="creating" {...this.props}>
        <Box pt={8} bgcolor="#fff">
          <CreateQuestionFields/>
          <EditorImagesImport/>
        </Box>
      </Layout>
    );
  }
}

export default defaultPage(CreateQuestionPage);
