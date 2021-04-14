
// import ProjectList from "../components/ProjectList";
import React from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


//////////////////////////////
// Create project

class NewProject extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       open: false,
       textFieldValueName: "",
       textFieldValueDesc: ""
     };
   }
 
   handleOpen = () => {
     this.setState({ open: true });
   }
 
   handleClose = () => {
     this.setState({ 
       open: false,
       textFieldValueName: "",
       textFieldValueDesc: "" 
     });
   }
 
   onSubmit = () => {
     let projectName = this.state.textFieldValueName;
     let projectDesc = this.state.textFieldValueDesc;
     axios
       .post(apiUrl + '/projects', {
         name: projectName,
         description: projectDesc,
         owners: [Cookies.get("id")],
         users: [Cookies.get("id")],
         major_version: 0,
         minor_version: 1,
         archived: false,
       }, {
         headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
       }).catch(error => {
         console.error(error); // Handle error 
       }).then(response => { // Handle success
         this.handleClose();
         this.props.update();
       });
   }
 
   onChangeName = (e) => {
     this.setState({ textFieldValueName: e.target.value });
   }
   onChangeDesc = (e) => {
     this.setState({ textFieldValueDesc: e.target.value });
   }
 
   render() {
     return (
       <>
         <>
           <Typography color="primary" align="center" gutterBottom={true} variant="h2" >Time to start a project?</Typography>
           <Typography align="center" gutterBottom={true} variant="body1">Is someone adding you to their project? If not read on.</Typography>
           <Typography align="center" gutterBottom={true} variant="body1">The best time to start is now. Creating a new project will help you plan the process, ensuring that the typeface meets expectation. QA also plays a major role in the communication between teams. Plan what tests your typeface should pass now so they don't shock you&nbsp;later.</Typography>
           <br />
           <Button onClick={this.handleOpen} className="align-center" color="primary" size="large" variant="contained">Create a New Project</Button>
           <br />
           <Typography align="center" gutterBottom={true} variant="body2" style={{margin: "0 auto"}} display="block">Don’t worry, we’ll help you through it.</Typography>
         </>
 
         <Dialog open={this.state.open} onClose={this.handleClose}>
           <DialogTitle id="form-dialog-title">New Project</DialogTitle>
           <DialogContent>
             <DialogContentText>Projects help you organize your tests to track your progress.</DialogContentText>
             <TextField value={this.state.textFieldValueName} 
               onChange={ this.onChangeName } 
               onFocus={() => this.setState({focus: true})}
               onBlur={() => (this.state.textFieldValueName === "") ? this.setState({focus: false}) : this.setState({focus: true})  }
               InputLabelProps={{ 
                 style: {
                   fontSize: this.state.focus ? 'inherit' : '2.0243rem',
                 }, 
               }} 
               InputProps={{ style: { fontSize: "2.0243rem" } }} 
               autoFocus margin="dense" id="name" label="Project Name" type="email" fullWidth />
             <TextField value={this.state.textFieldValueDesc} onChange={this.onChangeDesc} margin="dense" id="description" label="Project Description (Optional)" type="email" fullWidth />
           </DialogContent>
           <DialogActions>
             <Button onClick={this.handleClose} color="primary">Cancel</Button>
             <Button onClick={this.onSubmit} color="primary">Create</Button>
           </DialogActions>
         </Dialog>
       </>
     );
   }
}
export default NewProject;