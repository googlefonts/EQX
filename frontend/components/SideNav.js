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
import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
// import {DashboardIcon, NoteIcon, FolderIcon, WorkIcon, GroupIcon} from '@material-ui/icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import NoteIcon from '@material-ui/icons/Note';
import FolderIcon from '@material-ui/icons/Folder';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';

const drawerWidth = 240;

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
              <ListItem selected={this.props.page === "dashboard" ? true : false} button key="dashboard">
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
class SideNavCreateQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  addQuestion = () => {
    axios
      .post('http://localhost:1337/questions', {
        test: this.props.test.id,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put('http://localhost:1337/tests/' + this.props.test.id, {
            questions: [...this.props.test.questions, response.data.id]
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.log(error); // Handle Error
          }).then(response => { // Handle success
            Router.push("/create-question?test=" + this.props.test.id + "&question=" + (this.props.test.questions.length + 2))
          });
      })
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
        <List padding={2} style={{paddingTop: "64px"}} >
          <ListItem onClick={this.addQuestion} selected={this.props.page === "dashboard" ? true : false} button key="dashboard">
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary='Add Question'/>
          </ListItem>
          <Link href="/tests"><a>
            <ListItem selected={this.props.page === "tests" ? true : false} button key="tests">
              <ListItemIcon><ArrowForwardIcon /></ListItemIcon>
              <ListItemText primary='Next Question'/>
            </ListItem>
          </a></Link>
          <Link href="/tests"><a>
            <ListItem selected={this.props.page === "tests" ? true : false} button key="tests">
              <ListItemIcon><ArrowBackIcon /></ListItemIcon>
              <ListItemText primary='Prev Question'/>
            </ListItem>
          </a></Link>
          <Link href="/tests"><a>
            <ListItem selected={this.props.page === "tests" ? true : false} button key="tests">
              <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
              <ListItemText primary='Overview'/>
            </ListItem>
          </a></Link>
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
        {	this.props.page === "create-question" ? (	
            <SideNavCreateQuestion {...this.props}/>
					) : (
            <SideNavRegular {...this.props}/>
					)}
      </>
    );
  }
}
export default SideNav;
