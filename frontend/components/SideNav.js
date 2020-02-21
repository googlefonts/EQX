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
// console.log(this);

class SideNav extends React.Component {
  

  // this.setState({comment: 'Hello'});
  render() {
    return (
      <>
        {/* <Box boxShadow={3}> */}
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
            <Link href="/groups"><a>
              <ListItem selected={this.props.page === "groups" ? true : false} button key="groups">
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary='Groups'/>
              </ListItem>
            </a></Link>
          </List>
          {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
      </Drawer>
      {/* </Box> */}
      </>
    );
  }
}
export default SideNav;
