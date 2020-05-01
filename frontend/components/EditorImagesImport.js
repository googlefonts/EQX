import React from 'react';
import UploadTab from '../components/EditorImagesImport/UploadTab';
import EditorTab from '../components/EditorImagesImport/EditorTab';
import HtmlCssTab from '../components/EditorImagesImport/HtmlCssTab';
import { Grid, AppBar, Tabs, Tab, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography} from '@material-ui/core';

class EditorImagesImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      imageUrl: ""
    };
  }

  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    return (
      <Grid container spacing={0} className="editor-images-import">
        <Grid item xs={12}>
          <AppBar position="static" color="default">
            <Tabs
              className="editor-images-import-tab-bar"
              value={this.state.tabValue} 
              onChange={this.handleChange} 
              indicatorColor="primary" 
              textColor="primary"
              variant="fullWidth" 
              scrollButtons="auto"
            >
              <Tab label="Editor" />
              <Tab label="Image Upload" />
              <Tab label="HTML/CSS" />
            </Tabs>
          </AppBar>

          {this.state.tabValue == 0 ? <EditorTab/> : null}
          {this.state.tabValue == 1 ? <UploadTab/> : null}
          {this.state.tabValue == 2 ? <HtmlCssTab/> : null}
        </Grid>
      </Grid>
    );
  }
}

export default EditorImagesImport;