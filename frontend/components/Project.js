import React from "react";
import { Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Cookies from "js-cookie";
import Strapi from 'strapi-sdk-javascript/build/main';
import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);



//////////////////////////////
// Project Tests

class ProjectTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue: ""
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
    this.setState({ textFieldValue: "" });
  }

  handleChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }

  handleSubmit = () => {
    let testName =  this.state.textFieldValue;
    axios
      .post('http://localhost:1337/tests', {
        name: testName,
        owners: [ Cookies.get("id") ],
        users: [ Cookies.get("id") ],
        major_version: 0,
        minor_version: 1,
        archived: false,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error);  // Handle Error
      }).then(response => { // Handle success
        
        axios
          .put('http://localhost:1337/projects/' + this.props.project.id, {
            tests: [...this.props.project.tests, response.data.id]
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.log(error); // Handle Error
          }).then(response => { // Handle success
            this.handleClose();
            this.props.update();
          });
      })
  }

  
  render() {
    return (
      <Box className="section-tests tabContainer" hidden={0 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.project.tests && this.props.project.tests.length) ?
            this.props.project.tests.map((test, i) =>
                
              <ListItem button key={"test-"+i}>
                <Box p={1} pt={2} width="100%">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        {test.name}
                        <Box component="span" color="grey.400"> v.{test.major_version}.{test.minor_version}</Box>
                      </Typography>
                      <Box style={{width: "calc(100% - 200px)", display: "inline-block"}}>
                        <LinearProgress variant="determinate" value={test.completness}/>
                      </Box>
                      <Typography style={{width: "200px", display: "inline-block"}} align="right" variant="body1">{test.completness}% Done</Typography>
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
                    <Typography variant="body1">This project doesn't have any tests yet.</Typography>
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
            <Box component="span">Create Test</Box>
          </Fab>
        </Box>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">New Test</DialogTitle>
          <DialogContent>
            <DialogContentText>Tests should be built around verifing a specific goal.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.handleChange} autoFocus margin="dense" id="name" label="Test's Name" type="text" fullWidth />
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
// Project Members

class ProjectMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue: ""
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
    this.setState({ textFieldValue: "" });
  }
  render() {
    return (
      <Box className="section-members tabContainer" hidden={1 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.project.users && this.props.project.users.length) &&
            this.props.project.users.map((member, i) =>
              <Box p={1} key={"member-"+i} width="100%">
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
// Project Fonts

class ProjectFonts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      textFieldValue: ""
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  }
  handleClose = () => {
    this.setState({open: false});
    this.setState({ textFieldValue: "" });
  }
  render() {
    return (
      <Box className="section-fonts tabContainer" hidden={2 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.project.users && this.props.project.users.length) &&
            this.props.project.users.map((member, i) =>
              <Box p={1} key={"font-"+i} width="100%">
                
              </Box>
            )
          }
        </List>
        <Box className="overflow-fab-wrap">
          <Fab onClick={this.handleOpen} className="overflow-fab" variant="extended" size="medium" color="primary" aria-label="add">
            <Box component="span">Add Font Files</Box>
          </Fab>
        </Box>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Add Font Files</DialogTitle>
          <DialogContent>
            <DialogContentText>Add the fonts you are using for this project.</DialogContentText>
            <TextField value={this.state.textFieldValue} onChange={this.handleChange} autoFocus margin="dense" id="name" label="Font Name" type="email" fullWidth />
            <br/><br/>
            <Button variant="contained" component="label" >
              Upload Files
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
// Current projects

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elevation: 3,
      tabValue: 0,
      project: {},
      archived: false
    };
  }

  componentDidMount = () => {
    this.update();
  }

  update = () => {
    axios
      .get('http://localhost:1337/projects?id_in=' + this.props.projectId, { 
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error
      }).then(response => { // Handle success
        this.setState({ project: response.data[0] });
      });
  }

  archive = () => {
    axios
      .put('http://localhost:1337/projects/' + this.props.projectId, {
        archived: !this.state.project.archived
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error); // Handle Error
      }).then(response => { // Handle success
        this.props.pageUpdate();
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
      <Box mb={6} position="relative">
        <Card elevation={this.state.elevation} onMouseOver={this.cardOver} onMouseOut={this.cardOut}>

          {/* Genral Info */}
          <CardContent >
            <Box p={1}>
              <Box pb={1}>
                <Typography variant="h4">
                  {this.state.project.name}
                  <Box component="span" color="grey.400"> v.{this.state.project.major_version}.{this.state.project.minor_version}</Box>
                </Typography>
              </Box>
              <Typography display="block" variant="body2">
                <span>
                  {(this.state.project.tests && this.state.project.tests.length) ? (
                    <span>0 of {this.state.project.tests.length} tests complete</span>
                  ) : (
                    <span>0 tests</span>
                  )}
                  <Divider display="inline-block" orientation="vertical" />
                </span>
                <Box component="span" color="purple" onClick={this.archive} className="inline-button" >Archive</Box>
                <Divider display="inline-block" orientation="vertical" />
                <Box component="span" color="purple" className="inline-button" >Share</Box>
              </Typography>
            </Box>
          </CardContent>



          {/* Actionable Info */}
          <AppBar position="static" color="default">
          <Tabs value={this.state.tabValue} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
            <Tab label="Tests" />
            <Tab label="Members" />
            <Tab label="Font Files" />
            <Tab label="Import/Export" />
          </Tabs>
          </AppBar>
          
          {/* Tests */}
          <ProjectTests update={this.update} project={this.state.project} tabValue={this.state.tabValue} getProject={this.getProject}/>

          {/* Members */}
          <ProjectMembers update={this.update} project={this.state.project} tabValue={this.state.tabValue} getProject={this.getProject}/>

          {/* Fonts */}
          <ProjectFonts update={this.update} project={this.state.project} tabValue={this.state.tabValue} getProject={this.getProject}/>
        </Card>
      </Box>
    );
  }
}
export default Project;