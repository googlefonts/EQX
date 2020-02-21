import React from "react";
import { Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Cookies from "js-cookie";
import Strapi from 'strapi-sdk-javascript/build/main';
import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);



//////////////////////////////
// Test Tests

class TestTests extends React.Component {
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
  handleSubmit = () => {
    let testName =  this.state.textFieldValue;
    axios
      .post('http://localhost:1337/tests', {
        name: testName,
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error);  // Handle Error
      }).then(response => { // Handle success
        
        axios
          .put('http://localhost:1337/tests/' + this.props.test.id, {
            tests: [...this.props.test.tests, response.data.id]
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.log(error); // Handle Error
          }).then(response => { // Handle success
            this.handleClose();
          });
      })
  }

  handleChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }
  
  render() {
    return (
      <Box className="section-tests tabContainer" hidden={0 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.test.tests && this.props.test.tests.length) ?
            this.props.test.tests.map((test, i) =>
                
              <ListItem button key={"test-"+i}>
                <Box p={1} pt={2} width="100%">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">
                          {test.name}
                          <Box component="span" color="grey.400"> v.{test.major_version}.{test.minor_version}</Box>
                        </Typography>
                      <Box style={{width: "calc(100% - 100px)", display: "inline-block"}}>
                        <LinearProgress variant="determinate" value={test.completness}/>
                      </Box>
                      <Typography style={{width: "100px", display: "inline-block"}} align="right" variant="body1">{test.completness}% Done</Typography>
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
                    <Typography variant="body1">This test doesn't have any tests yet.</Typography>
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
          {(this.props.test.users && this.props.test.users.length) &&
            this.props.test.users.map((member, i) =>
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
          {(this.props.test.users && this.props.test.users.length) &&
            this.props.test.users.map((member, i) =>
              <Box p={1} key={"font-"+i} width="100%">
                
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
            <br/><br/>
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
    };
    this.getTest();
  }

  getTest = () => {
    axios
      .get('http://localhost:1337/tests?id_in=' + this.props.testId, { 
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error
      }).then(response => { // Handle success
        this.setState({ test: response.data[0] });
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
              <Typography variant="h4">
                {this.state.test.name}
                <Box component="span" color="grey.400"> v.{this.state.test.major_version}.{this.state.test.minor_version}</Box>
              </Typography>
              <Typography display="block" variant="caption">
                <span>
                  {(this.state.test.tests && this.state.test.tests.length) ? (
                    <span>0 of {this.state.test.tests.length} tests complete</span>
                  ) : (
                    <span>0 tests</span>
                  )}
                  <Divider display="inline-block" orientation="vertical" />
                </span>
                <Box component="span" color="purple" className="inline-button" >Archive</Box>
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
            <Tab label="Fonts" />
          </Tabs>
          </AppBar>
          
          {/* Tests */}
          <TestTests test={this.state.test} tabValue={this.state.tabValue} getTest={this.getTest}/>

          {/* Members */}
          <TestMembers test={this.state.test} tabValue={this.state.tabValue} getTest={this.getTest}/>

          {/* Fonts */}
          <TestFonts test={this.state.test} tabValue={this.state.tabValue} getTest={this.getTest}/>
        </Card>
      </Box>
    );
  }
}
export default Test;