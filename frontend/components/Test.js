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
        this.setState({ test: response.data });
        console.log(response.data)
        let questionLength = 0;
        if (typeof response.data.questions !== 'undefined' && response.data.questions > 0) {
          questionLength = response.data.questions;
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
                      <LinearProgress variant="determinate" value={this.state.test.completeness ? this.state.test.completeness : 0} />
                    </Box>
                    <Box style={{ position: "relative", top:"3px", padding: "1px 10px 0 0 ", borderRadius: "5px", background: "rgb(217, 172, 224)", width: "110px", display: "inline-block" }}>
                      <Typography style={{color: "white"}} align="right" variant="h6">{this.state.test.completeness ? this.state.test.completeness : 0}% Done</Typography>
                    </Box>
                  </Box>
                  <Box>
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