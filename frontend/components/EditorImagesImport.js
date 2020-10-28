import React from 'react';
// import UploadTab from '../components/EditorImagesImport/UploadTab';
import EditorTab from '../components/EditorImagesImport/EditorTab';
import UploadTab from '../components/EditorImagesImport/UploadTab';
import { Grid, AppBar, Tabs, Tab, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography} from '@material-ui/core';
// import debounce from 'lodash/debounce';
import axios from 'axios';
import Cookies from "js-cookie";
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';

class EditorImagesImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      imageUrl: "",
      imageType: "editor_image"
    };
  }

  componentDidMount = () => {
    // this.autosave = debounce(this.autosave, 500); // No need for debounce
    this.update();
  }

  pageUpdate = () => {
    this.update();
  }

	componentDidUpdate(nextProps) {
		if (nextProps.imageUrl !== this.props.imageUrl || 
      nextProps.test !== this.props.test || 
      nextProps.imageType !== this.props.imageType ) {
			this.update();
		}
	}

  update = () => {
		if (
			this.props.questionNumber && 
			typeof this.props.test != "undefined" && 
			Object.keys(this.props.test).length > 0
		){
      if (this.props.test.questions[Number(this.props.questionNumber - 1)].image_type === "editor_image"){
        this.setState({ 
          imageType: "editor_image",
          tabValue: 0
        });
      // } else if (this.props.test.questions[Number(this.props.questionNumber - 1)].image_type === "uploaded_image"){
      //   this.setState({ 
      //     imageType: "uploaded_image",
      //     tabValue: 1
      //   });
      } else if (this.props.test.questions[Number(this.props.questionNumber - 1)].image_type === "code_image"){
        this.setState({ 
          imageType: "code_image",
          tabValue: 1
        });
      } else {
        this.setState({ 
          imageType: "editor_image",
          tabValue: 0
        });
        this.autosave("editor_image");
      }
    }
  }
  
  handleChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
    var imageType= "editor_image";
    if (newValue == 0){
      imageType= "editor_image";
    // } else if (newValue == 1){
    //   imageType= "uploaded_image";
    } else if (newValue == 1){
      imageType= "code_image";
    }
    this.setState({ imageType: imageType });
    this.autosave(imageType);
  };
	
	autosave = (imageType) => {
    if (typeof this.props.test.questions !== "undefined" && this.props.test.questions.length){
      axios
        .put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, {
          image_type: imageType
        }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
        }).catch(error => { console.log(error); // Handle Error
        }).then(response => { // Handle success
        });
    }
	}

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
              {/* <Tab label="Image Upload" /> */}
              <Tab label="Upload" />
            </Tabs>
          </AppBar>

          {this.state.tabValue == 0 ? <EditorTab {...this.props}/> : null}
          {/* {this.state.tabValue == 1 ? <UploadTab {...this.props}/> : null} */}
          {this.state.tabValue == 1 ? <UploadTab {...this.props}/> : null}
        </Grid>
      </Grid>
    );
  }
}

export default EditorImagesImport;