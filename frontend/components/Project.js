import React from "react";
import { IconButton, Chip, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Cookies from "js-cookie";
import Strapi from 'strapi-sdk-javascript/build/main';
import axios from 'axios';
import SharedTest from "../components/SharedTest";
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
const strapi = new Strapi(apiUrl);
import EditableTitleAndDescription from "../components/EditableTitleAndDescription";
import DeleteIcon from '@material-ui/icons/Delete';



//////////////////////////////
// Project Tests

class ProjectTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      testModal: {},
      testModalOpen: false,
      textFieldValue: ""
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  testModalHandleOpen = (test) => {
    this.setState({
      testModalOpen: true,
      testModal: test,
    });
  }

  testModalHandleClose = () => {
    this.setState({ testModalOpen: false });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ textFieldValue: "" });
  }

  handleChange = (e) => {
    this.setState({ textFieldValue: e.target.value });
  }

  handleSubmit = () => {
    let testName = this.state.textFieldValue;
    axios
      .post(apiUrl + '/tests', {
        name: testName,
        project: this.props.project.id,
        owners: [Cookies.get("id")],
        users: [Cookies.get("id")],
        major_version: 0,
        minor_version: 1,
        completeness: 0,
        archived: false,
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => {
        console.log(error);  // Handle Error
      }).then(response => { // Handle success
        axios
          .put(apiUrl + '/projects/' + this.props.project.id, {
            tests: [...this.props.project.tests, response.data.id]
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


  render() {
    return (
      <Box className="section-tests tabContainer" hidden={0 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.project.tests && this.props.project.tests.length) ?
            this.props.project.tests.map((test, i) =>
              <ListItem onClick={() => this.testModalHandleOpen(test)} button key={"test-" + i}>
                <Box p={1} pt={2} width="100%">
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        {test.name}
                        <Box component="span" color="grey.400"> v.{test.major_version}.{test.minor_version}</Box>
                        {/* <Box component="span" color="grey.400">({test.questions ? test.questions.length : "0"} Questions)</Box> */}
                      </Typography>
                      {/* <Box style={{ width: "calc(100% - 200px)", display: "inline-block" }}>
                        <LinearProgress variant="determinate" value={test.completeness ? test.completeness : 0} />
                      </Box>
                      <Typography style={{ width: "200px", display: "inline-block" }} align="right" variant="body1">{test.completeness}% Done</Typography>
                    */}
                      <Box style={{ width: "calc(100% - 110px)", display: "inline-block" }}>
                        <LinearProgress variant="determinate" value={test.completeness ? test.completeness : 0} />
                      </Box>
                      <Box style={{ position: "relative", top:"3px", padding: "1px 10px 0 0 ", borderRadius: "5px", background: "rgb(217, 172, 224)", width: "110px", display: "inline-block" }}>
                        <Typography style={{color: "white"}} align="right" variant="h6">{test.completeness ? test.completeness : 0}% Done</Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box>
                        <Typography display="inline" variant="body2">
                          <Box component="span">View</Box>
                        </Typography>
                        <Divider display="inline-block" orientation="vertical" />
                        <Typography display="inline" variant="body2">
                          <Box component="span" className="inline-button" >Answers</Box>
                        </Typography>
                        <Divider display="inline-block" orientation="vertical" />
                        <Typography display="inline" variant="body2">
                          <Box component="span" className="inline-button" >Comments</Box>
                        </Typography>
                        <Divider display="inline-block" orientation="vertical" />
                        <Typography display="inline" variant="body2">
                          <Box component="span" className="inline-button" >Remind</Box>
                        </Typography>
                      </Box>
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
        <Dialog 
          PaperProps={{ style: { overflow: "visible", borderRadius: "4px" } }} 
          fullWidth={true} maxWidth="md" open={this.state.testModalOpen} onClose={this.testModalHandleClose}
        >
          <SharedTest modal={true} testId={this.state.testModal.id} project={this.props.project} update={this.update} />
        </Dialog>
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
            <DialogContentText>Tests should be built around verifying a specific goal.</DialogContentText>
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
      textFieldValue: "",
      possibleUsers: [],
      currentUsers: [],
      users: [],
      owners: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(apiUrl + '/users', {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
      }).then(response => { // Handle success
        let data = response.data;
        this.setState({ possibleUsers: data });
        this.update();
      })
    this.update();
  }

  componentDidUpdate(nextProps) {
    const { project } = this.props
    if (nextProps.project !== project) {
      this.update();
    }
  }

  update = () => {
    if (typeof this.props.project != "undefined" && Object.keys(this.props.project).length > 0) {
      let possibleUsers = this.state.possibleUsers.map(({ username, email, id }) => ({ username, email, id }));
      let users = this.props.project.users.map(({ username, email, id }) => ({ username, email, id }));
      let owners = this.props.project.owners.map(({ username, email, id }) => ({ username, email, id }));
      possibleUsers = possibleUsers.map(function (el) {
        var person = Object.assign({}, el);
        person.user = false;
        if (users.some(i => i.id === person.id)) {
          person.user = true;
        }
        person.owner = false;
        if (owners.some(i => i.id === person.id)) {
          person.owner = true;
        }

        return person;
      });
      this
        .setState({
          possibleUsers: possibleUsers,
          users: users,
          owners: owners
        });
    }
  }

  handleChange = (event, values) => {
    this.setState({ currentUsers: values });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ textFieldValue: "" });
  }

  keyDown = (event) => {
    if (event.keyCode == 8 && event.target.value == "") {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }

  handleSubmit = () => {
    axios
      .put(apiUrl + '/projects/' + this.props.project.id, {
        users: this.state.currentUsers.map(i => i = i.id),
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(error => { console.log(error); // Handle error 
      }).then(response => { // Handle success
        this.handleClose();
        this.props.update();
      });
  }

  render() {
    return (
      <Box className="section-members tabContainer" hidden={1 === this.props.tabValue ? false : true}>
        <List>
          {(this.props.project.users && this.props.project.users.length) &&
            this.props.project.users.map((member, i) =>
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
            <Autocomplete
              multiple
              id="tags-standard"
              autoComplete={true}
              options={this.state.possibleUsers}
              getOptionLabel={(option) => option.username}
              onChange={this.handleChange}
              disableClearable={true}
              defaultValue={this.state.possibleUsers.filter(i => i.user === true)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip key={"project-user-" + option.id} label={option.username} {...getTagProps({ index })} disabled={option.owner === true} />
                ))
              }
              filterSelectedOptions={true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="members"
                  placeholder=""
                  autoFocus
                  margin="dense"
                  fullWidth
                  onKeyDown={this.keyDown}
                />
              )}
            />
            {/* <TextField value={this.state.textFieldValue} onChange={this.handleChange} autoFocus margin="dense" id="name" label="Member's Email" type="email" fullWidth /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}


///////////////////////////
// Edit Font data row
import debounce from 'lodash/debounce';
class FontRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      weight: "",
      style: "",
    };
  }

	componentDidMount = () => {
		this.autosave = debounce(this.autosave, 500);
		this.update();
	}
	
	componentDidUpdate(nextProps) {
		if (nextProps.font !== this.props.font) {
			this.update();
		}
	}

	autosave = () => {
		// axios
		//   .put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, {
		//     question: this.state.questionValue,
		// 	 context: this.state.contextValue
		//   }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
		//   }).catch(error => { console.log(error); // Handle Error
		//   }).then(response => { // Handle success
		//     // Router.push("/create-question?test=" + this.props.test.id + "&question=" + (this.props.test.questions.length + 2))
		//   });
	}

	update = () => { 
		if (
			this.props.font && 
			typeof this.props.font != "undefined" && 
			Object.keys(this.props.font).length > 0
		){
			this.setState({
        name: this.props.font.info.name.records.preferredFamily.en,
        weight: this.props.font.variable && this.props.font.info.variationAxes.hasOwnProperty('wght') ? "[" + this.props.font.info.variationAxes.wght.min + " - " + this.props.font.info.variationAxes.wght.max + "]" : this.props.font.info.name.records.preferredSubfamily.en,
        style: this.props.font.info.name.records.fontSubfamily.en,
			})
		}
	}

	delete = () => { 
		axios
      .delete(apiUrl + '/fonts/' + this.props.font.id
        , { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
        }).catch(error => { console.log(error);  // Handle Error
        }).then(response => { // Handle success
          this.props.update();
        });
	}

	// onQuestionChange = (e) => {
	// 	this.setState({questionValue: e})
	// 	this.autosave();
	// }

	// onContextChange = (e) => {
	// 	this.setState({contextValue: e})
	// 	this.autosave();
	// }

  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={1} style={{background: "rgba(0, 0, 0, 0.09)"}} >
          <IconButton onClick={this.delete} style={{ height: "100%", width: "100%", borderRadius: 0}} component="span"><DeleteIcon /></IconButton>
        </Grid>
        <Grid item xs>
          <TextField InputProps={{ style:{borderRadius: 0} }} value={this.state.name} label="Name" fullWidth variant="filled" />
        </Grid>
        <Grid item xs={3}>
          <TextField InputProps={{ style:{borderRadius: 0} }} value={this.state.weight} label="Weight" fullWidth variant="filled" />
        </Grid>
        <Grid item xs={2}>
          <TextField InputProps={{ style:{borderRadius: 0} }} value={this.state.style} label="Style" fullWidth variant="filled" />
        </Grid>
        <Grid item xs={2}>
          <TextField InputProps={{ style:{borderRadius: 0} }} value={new Date(this.props.font.created_at).toLocaleDateString("en-US")} disabled label="Date Added" fullWidth variant="filled" />
        </Grid>
      </Grid>
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
      textFieldValue: "",
      files: []
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ textFieldValue: "" });
  }

  prepFiles = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((el, i) => {

      const formData = new FormData();
      formData.append("files", el);
      axios
        .post(apiUrl + '/upload', formData, {
          headers: {
            'Authorization': 'Bearer ' + Cookies.get("jwt")
          }
        }).catch(error => { console.log(error); // Handle error
        }).then(response => {
          console.log(response)
          var fontFile = response.data[0];
          axios
            .post('/api/font-info', {
              url: response.data[0].url,
              originUrl: el.name,
              jwt: Cookies.get("jwt")
            }).catch(error => { console.log(error); // Handle error
            }).then(response => {
              var fontInfo = response.data;
              var variable = false;
              if (Object.keys(fontInfo.variationAxes).length){
                variable = true;
              }
              axios
                .post(apiUrl + '/fonts', {
                  file: fontFile,
                  name: fontFile.name,
                  weight: "",
                  style: "",
                  variable: variable,
                  major_version: 0,
                  minor_version: 1,
                  project: this.props.project.id,
                  info: fontInfo
                }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
                }).catch(err => { console.log(err);  // Handle Error
                }).then(response => { // Handle success
                  console.log(response);
                  this.props.update();
                });
            });
        })
    });
  }

  render() {
    return (
      <Box className="section-fonts tabContainer" hidden={2 === this.props.tabValue ? false : true}>
        <List style={{padding: 0}} >

        {(this.props.project.fonts && this.props.project.fonts.length) ?
          this.props.project.fonts.map((font, i) =>
            <ListItem style={{padding: 0}} key={"font-" + i}>
              <FontRow project={this.props.project} font={font} {...this.props} />
              {/* <Box p={1} pt={2} width="100%">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5">
                    </Typography>
                  </Grid>
                </Grid>
              </Box> */}
            </ListItem>
          )
          :
          <ListItem key={"font-none"}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box color="text.disabled">
                  <Typography variant="body1">This project doesn't have any fonts yet.</Typography>
                </Box>
              </Grid>
            </Grid>
          </ListItem>
        }

        </List>
        <Box className="overflow-fab-wrap">
          <Fab component="label" className="overflow-fab" variant="extended" size="medium" color="primary" aria-label="add">
            <Box component="span">
              Add Font Files
              <input type="file" style={{ display: "none" }} multiple accept="font/*" onChange={this.prepFiles}/>
            </Box>
          </Fab>
        </Box>
      </Box>
    );
  }
}



//////////////////////////////
// Project Import/Export

class ProjectImportExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  render() {
    return (
      <Box className="section-import-export" hidden={3 === this.props.tabValue ? false : true}>
        <br />
        <br />
        <Typography align="center" gutterBottom={true} variant="h5">Need to get a project off of EQX? Lets make that happen.</Typography>
        <Box my={4} className="text-align-center">
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" color="primary" size="large" variant="contained">Import JSON</Button>
          </Box>
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" color="primary" size="large" variant="contained">Export JSON</Button>
          </Box>
        </Box>
        <Box my={4} className="text-align-center">
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" color="primary" size="large" variant="contained">Import CSV</Button>
          </Box>
          <Box m={2} display="inline">
            <Button onClick={this.handleOpen} display="inline" color="primary" size="large" variant="contained">Export CSV</Button>
          </Box>
        </Box>
        <Typography align="center" gutterBottom={true} variant="body2" display="block">You can find more on this here.</Typography>
        <br />
        <br />
      </Box>
    );
  }
}



//////////////////////////////
// Current projects

import Icon from '@material-ui/core/Icon';
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
      .get(apiUrl + '/projects?id_in=' + this.props.projectId, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
      }).then(response => { // Handle success
        this.setState({ project: response.data[0] });
      });
  }

  archive = () => {
    axios
      .put(apiUrl + '/projects/' + this.props.projectId, {
        archived: !this.state.project.archived
      }, {
        headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
      }).catch(err => { console.log(err); // Handle error
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
              <EditableTitleAndDescription nameValue={this.state.project.name} descValue={this.state.project.description} item={this.state.project} type="project" {...this.state}/>
              <Typography display="inline" variant="body2">
                <span>
                  {(this.state.project.tests && this.state.project.tests.length) ? (
                    <span>0 of {this.state.project.tests.length} tests complete</span>
                  ) : (
                      <span>0 tests</span>
                    )}
                </span>
              </Typography>
              <Divider display="inline-block" orientation="vertical" />
              <Typography display="inline" variant="body2">
                <Box component="span" color="purple" onClick={this.archive} className="inline-button" >Archive</Box>
              </Typography>
              <Divider display="inline-block" orientation="vertical" />
              <Typography display="inline" variant="body2">
                <Box component="span" color="purple" className="inline-button" >Share</Box>
              </Typography>
            </Box>
          </CardContent>



          {/* Actionable Info */}
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.tabValue}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label={"Tests (" + (this.state.project.tests ? this.state.project.tests.length : "0") + ")"} />
              <Tab label={"Members (" + (this.state.project.users ? this.state.project.users.length : "0") + ")"} />
              <Tab label={"Fonts (" + (this.state.project.fonts ? this.state.project.fonts.length : "0") + ")"} />
              <Tab label="Import/Export" />
            </Tabs>
          </AppBar>

          {/* Tests */}
          <ProjectTests update={this.update} {...this.state} getProject={this.getProject} />

          {/* Members */}
          <ProjectMembers update={this.update} {...this.state} getProject={this.getProject} />

          {/* Fonts */}
          <ProjectFonts update={this.update} {...this.state} getProject={this.getProject} />

          {/* Import/Export */}
          <ProjectImportExport update={this.update} {...this.state} getProject={this.getProject} />
        </Card>
      </Box>
    );
  }
}
export default Project;