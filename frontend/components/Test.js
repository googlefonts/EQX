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
    let questionName = this.state.textFieldValue;
    axios
      .post(apiUrl + '/questions', {
        question: questionName,
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => {
        console.log(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put(apiUrl + '/tests/' + this.props.test.id, {
            questions: [...this.props.test.questions, response.data.id]
          }, {
            headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
          }).catch(error => {
            console.log(error); // Handle Error
          }).then(response => { // Handle success
            this.handleClose();
            this.props.update();
          });
      })
  }

  handleChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }

  render() {
    return (
      <Box className="section-tests tabContainer" hidden={0 === this.props.tabValue ? false : true}>
        <List color="primary">
          {(this.props.test.questions && this.props.test.questions.length) ?
            this.props.test.questions.map((question, i) =>

              <ListItem button key={"question-" + i}>
                <Box p={1} pt={2} width="100%">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        {question.question}
                      </Typography>
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
                    <Typography variant="body1">This test doesn't have any questions yet.</Typography>
                  </Box>
                </Grid>
              </Grid>
            </ListItem>
          }
        </List>
        <Box className="overflow-fab-wrap">
          <Fab onClick={this.handleOpen} className="overflow-fab" variant="extended" size="medium" color="primary" aria-label="add">
            {/* <AddCircleIcon /> 
            <Box component="span">&nbsp;&nbsp;</Box> */}
            <Box component="span">Add Question</Box>
          </Fab>
        </Box>

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
        </Dialog>
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
      <Box className="section-members tabContainer" hidden={1 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.test.users && this.props.test.users.length) &&
            this.props.test.users.map((member, i) =>
              <Box p={1} key={"member-" + i} width="100%">
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={member.username} secondary={member.email} />
                </ListItem>
              </Box>
            )
          }
        </List>
        <Box className="overflow-fab-wrap">
          <Fab onClick={this.handleOpen} className="overflow-fab" variant="extended" size="medium" color="primary" aria-label="add">
            {/* <AddCircleIcon /> 
            <Box component="span">&nbsp;&nbsp;</Box> */}
            <Box component="span">Add Member</Box>
          </Fab>
        </Box>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Member</DialogTitle>
          <DialogContent>
            <DialogContentText>Add any team member you want.</DialogContentText>
            {/* https://material-ui.com/components/autocomplete/#multiple-values */}
            <TextField value={this.state.textFieldValue} onChange={this.handleChange} autoFocus margin="dense" id="name" label="Member's Email" type="email" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}



//////////////////////////////
// Test Fonts

class TestFonts extends React.Component {
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
      <Box className="section-fonts tabContainer" hidden={2 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.test.users && this.props.test.users.length) &&
            this.props.test.users.map((member, i) =>
              <Box p={1} key={"font-" + i} width="100%">

              </Box>
            )
          }
        </List>
        <Box className="overflow-fab-wrap">
          <Fab onClick={this.handleOpen} className="overflow-fab" variant="extended" size="medium" color="primary" aria-label="add">
            <Box component="span">Add Font</Box>
          </Fab>
        </Box>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Member</DialogTitle>
          <DialogContent>
            <DialogContentText>Add the fonts you are using for this test.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.handleChange} autoFocus margin="dense" id="name" label="Font Name" type="email" fullWidth />
            <br /><br />
            <Button variant="contained" component="label" >
              Upload File
              <input type="file" style={{ display: "none" }} />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">Add</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}


//////////////////////////////
// Current tests

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 3,
      tabValue: 0,
      test: {},
      questionLength: 0,
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get(apiUrl + '/tests?id_in=' + this.props.testId, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
      }).then(response => { // Handle success
        this.setState({ test: response.data[0] });

        let questionLength = 0;
        if (typeof response.data[0].questions !== 'undefined' && response.data[0].questions > 0) {
          questionLength = response.data[0].questions;
        }
        this.setState({ questionLength: questionLength });
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
        <Card elevation={this.state.elevation} onMouseOver={this.cardOver} onMouseOut={this.cardOut}>

          {/* General Info */}
          <CardContent >
            <Box p={1}>
              <Typography variant="h6">
                <Box component="span" color="grey.400">{this.props.project.name} v.{this.props.project.major_version}.{this.props.project.minor_version}</Box>
              </Typography>
              <Typography variant="h4">
                {this.state.test.name}
                <Box component="span" color="grey.400"> v.{this.state.test.major_version}.{this.state.test.minor_version}</Box>
              </Typography>
              <Typography variant="body2">{this.state.test.description}</Typography>
              <Box className="progress-bar" pb={1}>
                <Box style={{ width: "calc(100% - 200px)", display: "inline-block" }}>
                  <LinearProgress variant="determinate" value={this.state.test.completeness ? this.state.test.completeness : 0} />
                </Box>
                <Typography style={{ width: "200px", display: "inline-block" }} align="right" variant="h6">{this.state.test.completeness}% Done</Typography>
              </Box>
              <Box component="span" color="purple" className="inline-button" mr={2} >
                <Link href={"/answer-question?test=" + this.state.test.id + "&question=1"}><a>
                  <Button color="primary" size="large" variant="contained">Start</Button>
                </a></Link>
              </Box>
              <Typography display="inline" variant="body2">
                <Box component="span">{this.state.questionLength} Questions</Box>
              </Typography>
              <Divider display="inline-block" orientation="vertical" />
              <Typography display="inline" variant="body2">
                <Box component="span" color="purple" className="inline-button" >Answers</Box>
              </Typography>
              <Divider display="inline-block" orientation="vertical" />
              <Typography display="inline" variant="body2">
                <Box component="span" color="purple" className="inline-button" >Comments</Box>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
}
export default Test;