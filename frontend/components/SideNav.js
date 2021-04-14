import Link from "next/link"
// import Button from "@material/react-button";
// import {Body1} from "@material/react-typography";
// import Drawer, {
//   DrawerHeader,
//   DrawerSubtitle,
//   DrawerTitle,
//   DrawerContent,
// } from '@material/react-drawer';
// import MaterialIcon from '@material/react-material-icon';
// import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';

import React from 'react';
import {Grid, IconButton, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// import {DashboardIcon, NoteIcon, FolderIcon, WorkIcon, GroupIcon} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteIcon from '@material-ui/icons/Note';
import FolderIcon from '@material-ui/icons/Folder';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import ShowChart from '@material-ui/icons/ShowChart';

import axios from 'axios';
import Cookies from "js-cookie";
import DeleteIcon from '@material-ui/icons/Delete';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


class SideNavRegular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Drawer
          className="nav-drawer"
          variant="permanent"
          anchor="right"
          PaperProps={{ elevation: 6 }}
        >
          <List>
            <Link href="/"><a>
              <ListItem selected={this.props.page === "dashboard" ? true : false} button>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText primary='Dashboard'/>
              </ListItem>
            </a></Link>
            <Link href="/tests"><a>
              <ListItem selected={this.props.page === "tests" ? true : false} button key="tests">
                <ListItemIcon><NoteIcon /></ListItemIcon>
                <ListItemText primary='Your Tests'/>
              </ListItem>
            </a></Link>
            <Link href="/shared-tests"><a>
              <ListItem selected={this.props.page === "shared-tests" ? true : false} button key="shared-tests">
                <ListItemIcon><FolderIcon /></ListItemIcon>
                <ListItemText primary='Shared Tests'/>
              </ListItem>
            </a></Link>
            <Link href="/projects"><a>
              <ListItem selected={this.props.page === "projects" ? true : false} button key="projects">
                <ListItemIcon><WorkIcon /></ListItemIcon>
                <ListItemText primary='Projects'/>
              </ListItem>
            </a></Link>
            {/* <Link href="/groups"><a>
              <ListItem selected={this.props.page === "groups" ? true : false} button key="groups">
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary='Groups'/>
              </ListItem>
            </a></Link> */}
          </List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
      </Drawer>
      </>
    );
  }
}


import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Router from 'next/router';

class SideNavQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: false
    };
  }

  componentDidMount = () => {
    this.update();
  }

	componentDidUpdate(nextProps) {
    if (nextProps.questionNumber !== this.props.questionNumber || 
      nextProps.test !== this.props.test) {
			this.update();
		}
  }
  
  update = () => {
    this.setState({ questionNumber: Number(Router.router.query.question) });
  }
  
  sideQuestionNavUpdate = (questionNumber) => {
    Router.push({
      pathname: (this.props.page === "answer-question" || this.props.page === "test-results") ? "/answer-question" : '/create-question',
      query: { 
        test: this.props.test.id, 
        question: questionNumber
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }

  sideQuestionDelete = (questionId, questionNumber) => {
    axios
      .delete(apiUrl + '/questions/' + questionId
      , { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.error(error);  // Handle Error
      }).then(response => { // Handle success
        let questions = this.props.test.questions.filter( function(value, index, arr){ return value.id !== questionId });
        axios
          .put(apiUrl + '/tests/' + this.props.test.id, {
            questions: [...questions ]
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.error(error); // Handle Error
          }).then(response => { // Handle success
            if (questions.length <= 0){
              this.addQuestion();
            } else {
              if (this.state.questionNumber > questions.length){
                Router.push({
                  pathname: '/create-question',
                  query: { 
                    test: this.props.test.id, 
                    question: this.state.questionNumber - 1
                  },
                }, undefined, { shallow: true });
              }
              this.props.pageUpdate();
            }
          });
      });
  }

  addQuestion = () => {
    axios
      .post(apiUrl + '/questions', {
        test: this.props.test.id,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.error(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put(apiUrl + '/tests/' + this.props.test.id, {
            questions: [...this.props.test.questions, response.data.id]
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.error(error); // Handle Error
          }).then(response => { // Handle success
            this.props.pageUpdate(true);
          });
      });
  }

  nextQuestion = () => {
    Router.push({
      pathname: (this.props.page === "create-question" ? '/create-question' : '/answer-question'),
      query: { 
        test: this.props.test.id, 
        question: this.state.questionNumber + 1
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }

  prevQuestion = () => {
    Router.push({
      pathname: (this.props.page === "create-question" ? '/create-question' : '/answer-question'),
      query: { 
        test: this.props.test.id, 
        question: this.state.questionNumber - 1
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }

  overviewToggle = () => {
    this.props.sideNavUpdate();
  }

  render() {
    return (
      <>
        <Drawer
          className="create-question-drawer multi-drawer-1"
          variant="permanent"
          anchor="right"
          PaperProps={{ elevation: 6 }}
        >
          <List padding={2} style={{paddingTop: "64px"}} >
            {(this.props.page === "test-results") &&
              <Link href="/"><a>
                <ListItem selected={this.props.page === "dashboard" ? true : false} button>
                  <ListItemIcon><DashboardIcon /></ListItemIcon>
                  <ListItemText primary='Dashboard'/>
                </ListItem>
              </a></Link>
            }
            {(this.props.page === "create-question") &&
              <ListItem key="list-item-add-question" onClick={this.addQuestion} selected={this.props.page === "dashboard" ? true : false} button>
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary='Add Question'/>
              </ListItem>
            }
            {(this.props.test.questions && (this.state.questionNumber < this.props.test.questions.length)) &&
              <ListItem key="list-item-next-question" onClick={this.nextQuestion} selected={this.props.page === "tests" ? true : false} button>
                <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
                <ListItemText primary='Next Question'/>
              </ListItem>
            }
            {(this.props.test.questions && (this.state.questionNumber > 1)) &&
              <ListItem key="list-item-prev-question" onClick={this.prevQuestion} selected={this.props.page === "tests" ? true : false} button>
                <ListItemIcon><ArrowBackIcon /></ListItemIcon>
                <ListItemText primary='Prev Question'/>
              </ListItem>
            }
            <ListItem className="multi-drawer-toggle" key="list-item-overview" onClick={this.overviewToggle} selected={this.props.page === "tests" ? true : false} button>
              <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
              <ListItemText primary='Question List'/>
            </ListItem>
            {(this.props.page === "answer-question") &&
              <Link href={"/test-results?test=" + this.props.test.id}><a>
                <ListItem key="list-item-results" selected={this.props.page === "dashboard" ? true : false} button>
                  <ListItemIcon><ShowChart /></ListItemIcon>
                  <ListItemText primary='See Results'/>
                </ListItem>
              </a></Link>
            }
          </List>
        </Drawer>
        <Drawer
          className="create-question-overview-drawer multi-drawer-2"
          variant="permanent"
          anchor="right"
          PaperProps={{ elevation: 6 }}
          data-open={false}
        >
          <List padding={2} style={{paddingTop: "64px"}} >
            {(this.props.test.questions && this.props.test.questions.length) &&
              this.props.test.questions.map((question, i) => 
                <ListItem button key={"question-" + i} data-active={ ((i+1) === this.state.questionNumber) ? true : false }>
                  <Box p={1} pt={2} width="100%">
                    <Grid container spacing={2}>
                      <Grid item xs={8} className="nav-item-event" onClick={() => this.sideQuestionNavUpdate(i+1)}>
                        <Typography variant="body1" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
                          { (typeof question.question !== "undefined" && question.question && question.question.trim() !== "" ) ? 
                            question.question : 
                            <Box color="text.disabled" component="span" className="blank">Blank Question</Box>
                          }
                        </Typography>
                      </Grid>
                      {(this.props.page === "create-question") &&
                        <Grid item style={{position:"relative"}} xs={4} >
                          <IconButton onClick={() => this.sideQuestionDelete(question.id, i+1)} style={{position:"absolute", right: "0", top: "-8px"}} component="span">
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      }
                    </Grid>
                  </Box>
                </ListItem>
              )
            }
          </List>
        </Drawer>
      </>
    );
  }
}


class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        {	(this.props.page === "create-question" || (this.props.page === "answer-question" || this.props.page === "test-results")) ? (	
            <SideNavQuestion {...this.props}/>
					) : (
            <SideNavRegular {...this.props}/>
					)}
      </>
    );
  }
}
export default SideNav;
