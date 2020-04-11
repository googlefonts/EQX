import React from 'react';
// import TextField, {HelperText, Input} from '@material/react-text-field';
// import MaterialIcon from '@material/react-material-icon';
// import {Cell, Grid, Row} from '@material/react-layout-grid';
import { CircularProgress, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider} from '@material-ui/core';


class CreateQuestionFields extends React.Component {
  state = {
    questionValue: '',
    descriptionValue: ''
  };
  /*
  state = {
    questionValue: 'Does the middle dot on “Ŀ” align with  the center bar of “R”?',
    descriptionValue: 'Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit.'
  };
  */

  render() {
    return (
      <Grid container spacing={0} className="create-question-fields">
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <TextField 
            value={this.state.questionValue}  
            onChange={(e) => this.setState({questionValue: e.currentTarget.value})}
            autoFocus  
            multiline
            id="name"  
            label="Question's Name"  
            type="text"  
            variant="filled"
            fullWidth 
            
          />
        </Grid>
          
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          {/* <TextField
            className="field"
            label='Description'
            textarea  
          >
            <Input
              value={this.state.descriptionValue}
              onChange={(e) => this.setState({descriptionValue: e.currentTarget.value})} />
          </TextField> */}
        </Grid>
      </Grid>
    );
  }
}

export default CreateQuestionFields;