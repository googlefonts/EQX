import MaterialIcon from '@material/react-material-icon';
import {Button} from '@material/react-typography';
import FontImportSelect from '../FontImportSelect';
import axios from 'axios';
import { MenuItem, InputAdornment, IconButton, Chip, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider } from '@material-ui/core';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";
import { typography } from '@material-ui/system';

class HtmlCssTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: ['h1','h2','h3','h4','h5','h6','p','li'],
      imageData: {},
      img: "",
      fonts: {},
    };
  }

  componentDidMount = () => {
		if (typeof this.props.test.questions[Number(this.props.questionNumber - 1)].code_image != "undefined") {
      this.setState({ imageData: this.props.test.questions[Number(this.props.questionNumber - 1)].code_image });
    }
    this.update();
  }

  componentDidUpdate(nextProps) {
    if (this.props !== nextProps) {
      this.update();
    }
  }

  pageUpdate = () => {
    this.update();
  }

  update = () => {
		if (typeof this.state.imageData != "undefined") {
      axios
        .get(apiUrl + this.state.imageData.url) 
        .then(response => {
          
          var ext = this.state.imageData.url.substring(this.state.imageData.url.lastIndexOf(".") + 1);
          var domParser = new DOMParser();
          var docElement = domParser.parseFromString(response.data, "text/html").documentElement;
          var newTagList = [];
          if (ext === "svg"){
            var texts = docElement.getElementsByTagName("text");
            for (var i = 0; i < texts.length; i++) {
              newTagList.push(texts[i].id);
            }
          }
          this.setState({
            img: response.data,
            tagList: newTagList
          });

        }).catch(error => { console.log(error) });
    }
  }

  uploadFile = (e) => {
    var formData = new FormData();
    formData.append("files", e.target.files[0]);

    axios // Upload file
      .post(apiUrl + '/upload', formData, 
        { headers: { 'Authorization': 'Bearer ' + Cookies.get("jwt") } })
      .then(response => {
        var image = response.data[0];
        
        axios // Download and edit file
          .get(apiUrl + image.url) 
          .then(response => {
            var data = response.data.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, "");
            var ext = image.url.substring(image.url.lastIndexOf(".") + 1);
            var domParser = new DOMParser();
            var docElement = domParser.parseFromString(data, "text/html").documentElement;
            var newData;
            console.log(docElement);

            if (ext === "svg"){
              var texts = docElement.getElementsByTagName("text");
              for (var i = 0; i < texts.length; i++) {
                if (texts[i].id === ""){
                  texts[i].id = "text-" + (i+1);
                }
              }
              newData = docElement.getElementsByTagName("svg")[0].outerHTML;
            }

            console.log(docElement);
            var file = new File([newData], (image.name + image.ext), {type: image.mime});
            var formData = new FormData();
            formData.append('files', file);
            console.log(image)
            axios // Delete old file
              .delete(apiUrl + '/upload/files/' + image.id, 
                { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
              }).catch(error => { console.log(error) });

            axios // Upload new file
              .post(apiUrl + '/upload', formData, 
                { headers: { 'Authorization': 'Bearer ' + Cookies.get("jwt") } })
              .then(response => {
                image = response.data[0];
                this.setState({ imageData: image });
                
                  axios // Save to question
                    .put('http://localhost:1337/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, 
                      { code_image: image }, 
                      { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
                    }).then(response => {
                      this.update();
                    }).catch(error => { console.log(error) });
              }).catch(error => { console.log(error) });
          }).catch(error => { console.log(error) });
      }).catch(error => { console.log(error) });
  };

  render() {
    return (
      <Grid container spacing={0} className="import-tab">
        <Grid item xs={4} style={{borderBottom: "2px solid rgba(0, 0, 0, 0.42)"}}>
          <input type="file" name="import-html-upload" id="import-html-upload" onChange={this.uploadFile}/>
          <label htmlFor="import-html-upload" className="import-html-upload-label">
            <MaterialIcon className="paperclip-icon" icon='attach_file' />
            <Button>HTML/CSS or SVG</Button>
          </label>
        </Grid>
        <Grid item xs={8} style={{ minHeight: "300px", background: "rgba(0, 0, 0, 0.07)", borderBottom: "1px solid rgba(0, 0, 0, 0.42)"}}>
          {(typeof this.state.tagList != "undefined" && this.state.tagList.length) ?
            this.state.tagList.map((tag, index) => (
              <TextField 
                label={tag + ' style' }
                key={index + '-element-selector' }
                select 
                value={(typeof this.props.test.project.fonts != "undefined" && this.props.test.project.fonts.length) ? this.props.test.project.fonts[0] : 0} 
                fullWidth 
                variant="filled" 
                InputLabelProps={{ style:{display: "none"} }}
                SelectProps={{
                  SelectDisplayProps: {
                    style:{ paddingTop: "20px", position: "relative", paddingBottom: "20px", paddingLeft: "5px"}
                  }
                }}
                InputProps={{
                  startAdornment: <InputAdornment style={{width: "75px", marginTop: 0}} position="start">{tag}</InputAdornment>,
                  style:{borderRadius: 0}
                }}
              >
                {(typeof this.props.test.project.fonts != "undefined" && this.props.test.project.fonts.length) ?
                  this.props.test.project.fonts.map((el, i) => (
                    <MenuItem key={index+"-"+el.name} value={el}>
                      {el.name}
                    </MenuItem>
                  ))
                :
                  <MenuItem value={0}>No Fonts Added to Project</MenuItem>
                }
              </TextField>
            ))
          :
          <Box mt={3} color="text.disabled">
            <Typography align="center" variant="body1">Sorry, but we can't detect any live type.</Typography>
          </Box>
        }
        </Grid>
        <Grid item xs={12} className="visual-editor">
          <div dangerouslySetInnerHTML={{ __html: this.state.img }}></div>
        </Grid>
      </Grid>
    );
  }
}

export default HtmlCssTab;