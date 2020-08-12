import MaterialIcon from '@material/react-material-icon';
// import {Button} from '@material/react-typography';
import FontImportSelect from '../FontImportSelect';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import axios from 'axios';
import { MenuItem, InputAdornment, IconButton, Chip, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider, Button } from '@material-ui/core';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";
import { typography } from '@material-ui/system';
import debounce from 'lodash/debounce';
import GetAppIcon from '@material-ui/icons/GetApp';
// const {parse, stringify} = require('flatted');

class HtmlCssTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      imageData: {},
      img: "",
      fonts: {},
      codeData: {
        url: "",
        width: "100%",
        height: "100%",
        scroll: "0",
      }
    };
  }

  componentDidMount = () => {
    this.autosave = debounce(this.autosave, 500);
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

  scrapeUrl = () => {
    var that = this;
    var url = this.state.codeData.url;
    axios.get('/api/getUrl', 
      { params: {
        url: url
      } 
    })
    .then(function (response) {

      console.log('Recieved "'+url+'"')
      var newData = response.data;
      // console.log(encodeURIComponent(url))
      var file = new File([newData], ('scrape-' + new Date().getTime() + ".html"), {type: "text/html"});
      var formData = new FormData();
      formData.append('files', file);
      axios // Upload new file
        .post(apiUrl + '/upload', formData, 
          { headers: { 'Authorization': 'Bearer ' + Cookies.get("jwt") } })
        .then(response => {
          var image = response.data[0];
          // console.log(image)
          that.setState({ imageData: image });
          
          axios // Save to question
            .put('http://localhost:1337/questions/' + that.props.test.questions[Number(that.props.questionNumber - 1)].id, 
              { code_image: image }, 
              { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
            }).then(response => {
              that.update();
            }).catch(error => { console.log(error) });

      }).catch(error => { console.log(error) });

    });
  }

  update = () => {
    this.setState({
      codeData: this.props.test.questions[Number(this.props.questionNumber - 1)].code_data
    });
		if (typeof this.state.imageData != "undefined") {
      axios
        .get(apiUrl + this.state.imageData.url) 
        .then(response => {
          var imgData = response.data;
          var ext = this.state.imageData.url.substring(this.state.imageData.url.lastIndexOf(".") + 1);
          var domParser = new DOMParser();
          var docElement = domParser.parseFromString(response.data, "text/html").documentElement;
          var newTagList = [];
          if (ext === "svg"){
            var texts = docElement.getElementsByTagName("text");
            for (var i = 0; i < texts.length; i++) {
              newTagList.push(texts[i].id);
            }
          } else if (ext === "html"){
            var tagList = ['h1','h2','h3','h4','h5','h6','p','li'];
            tagList.forEach(function(tag, index){
              var texts = docElement.getElementsByTagName(tag);
              if (texts.length){
                newTagList.push(tag);
              }
            });
          } else {
            imgData = "<p style='padding: 2rem 0' class='MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter'>This filetype isn't supported.</p>"
          }
          this.setState({
            img: imgData,
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
            var newData = data;
            var domParser = new DOMParser();
            var docElement = domParser.parseFromString(data, "text/html").documentElement;
            if (ext === "svg"){
              var texts = docElement.getElementsByTagName("text");
              for (var i = 0; i < texts.length; i++) {
                if (texts[i].id === ""){
                  texts[i].id = "text-" + (i+1);
                }
              }
              newData = "<style>body{margin:0;}</style>" + docElement.getElementsByTagName("svg")[0].outerHTML;
            }
            var file = new File([newData], (image.name + image.ext), {type: image.mime});
            var formData = new FormData();
            formData.append('files', file);

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

	autosave = () => {
		axios
		  .put('http://localhost:1337/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, {
		    code_data: this.state.codeData,
		  }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).then(response => { // Handle success
        this.update();
      }).catch(error => { console.log(error) }); // Handle Error
    }

	onHeightChange = (e) => {
    var codeData = this.state.codeData;
		codeData.height = e;
		this.setState({codeData: codeData})
		this.autosave();
	}

	onWidthChange = (e) => {
    var codeData = this.state.codeData;
		codeData.width = e;
		this.setState({codeData: codeData})
		this.autosave();
	}

	onScrollChange = (e) => {
    var codeData = this.state.codeData;
		codeData.scroll = e;
		this.setState({codeData: codeData})
		this.autosave();
	}

	onURLChange = (e) => {
    var codeData = this.state.codeData;
		codeData.url = e;
		this.setState({codeData: codeData})
		this.autosave();
	}

  render() {
    return (
      <Grid container spacing={0} className="import-tab">
      
        <Grid item xs={4} style={{background: "rgba(0,0,0,0.9)"}}>
          <Grid container spacing={0}>
           <Grid item xs={8} >
              <TextField 
                label={'URL'}
                // key={'window-height-selector'}
                value={this.state.codeData.url}
                fullWidth 
                variant="filled" 
                placeholder='URL to scrape'
                onChange={e => {this.onURLChange(e.currentTarget.value)}}
                InputLabelProps={{ style:{display: "none"} }}
                style={{
                  color: "white",
                  background: "rgba(255,255,255,0.15)",
                }}
                inputProps={{
                    style:{ 
                      paddingTop: "20px", 
                      position: "relative", 
                      paddingBottom: "20px", 
                      paddingLeft: "5px",
                      color: "white"
                    }
                }}
                InputProps={{
                  startAdornment: <InputAdornment style={{ width: "0px", display:"none", marginTop: 0}} position="start">Url to scrape</InputAdornment>,
                  style:{
                    borderRadius: 0,
                  }
                }}
              ></TextField> 
            </Grid>
            <Grid item xs={4} >

              <IconButton 
                aria-label="upload picture" 
                component="span"
                onClick={() => this.scrapeUrl()}
                style={{
                  borderBottom: "2px solid rgba(255,255,255,0.25)", 
                  borderRadius: "0", 
                  width: "100%", 
                  height: "100%", 
                  textAlign: "center",
                  color: "white",
                  background: "rgba(255,255,255,0.25)",
                }}

                >
                <GetAppIcon />
              </IconButton>
            </Grid>
          </Grid>
          <input type="file" name="import-html-upload" id="import-html-upload" onChange={this.uploadFile}/>
          <label htmlFor="import-html-upload" className="import-html-upload-label" style={{ height: "calc(100% - 57px)"}}>
            <AttachFileIcon style={{ color: "rgba(255,255,255,0.25)" }} className="paperclip-icon" />
            <Button style={{ pointerEvents:"none", color:"rgba(255,255,255,1)", fontSize: '24px'}}><b>HTML/SVG</b></Button>
          </label>

        </Grid>
        <Grid item xs={8} style={{ minHeight: "293px", background: "rgba(0, 0, 0, 0.07)"}}>
          <TextField 
            label={'Window height'}
            key={'window-height-selector'}
            value={this.state.codeData.height}
            fullWidth 
            variant="filled" 
            onChange={e => {this.onHeightChange(e.currentTarget.value)}}
            InputLabelProps={{ style:{display: "none"} }}
            inputProps={{
                style:{ paddingTop: "20px", position: "relative", paddingBottom: "20px", paddingLeft: "5px"}
            }}
            InputProps={{
              startAdornment: <InputAdornment style={{width: "75px", marginTop: 0}} position="start">height</InputAdornment>,
              style:{borderRadius: 0}
            }}
          ></TextField>          
          <TextField 
            label={'Window width'}
            key={'window-width-selector'}
            value={this.state.codeData.width}
            fullWidth 
            variant="filled" 
            onChange={e => {this.onWidthChange(e.currentTarget.value)}}
            InputLabelProps={{ style:{display: "none"} }}
            inputProps={{
                style:{ paddingTop: "20px", position: "relative", paddingBottom: "20px", paddingLeft: "5px"}
            }}
            InputProps={{
              startAdornment: <InputAdornment style={{width: "75px", marginTop: 0}} position="start">width</InputAdornment>,
              style:{borderRadius: 0}
            }}
          ></TextField>
          <TextField 
            label={'Window scroll position'}
            key={'window-scroll-selector'}
            value={this.state.codeData.scroll}
            fullWidth 
            variant="filled" 
            onChange={e => {this.onScrollChange(e.currentTarget.value)}}
            InputLabelProps={{ style:{display: "none"} }}
            inputProps={{
                style:{ paddingTop: "20px", position: "relative", paddingBottom: "20px", paddingLeft: "5px"}
            }}
            InputProps={{
              startAdornment: <InputAdornment style={{width: "75px", marginTop: 0}} position="start">scroll</InputAdornment>,
              style:{borderRadius: 0}
            }}
          ></TextField>

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
        <Grid item xs={12} className="visual-editor" style={{background: "rgba(0, 0, 0, 0.07)"}}>
        {/* <iframe id="wed-svg-visual" sandbox width={this.state.codeData.width} height={this.state.codeData.height} frameBorder="0" border="0" scrolling="no" src={"data:text/html,"+encodeURIComponent(this.state.img+"<script>document.documentElement.scrollTop = document.body.scrollTop = '"+this.state.codeData.scroll+"'</script>")}/> */}
        <iframe id="wed-svg-visual" sandbox width={this.state.codeData.width} height={this.state.codeData.height} frameBorder="0" border="0" scrolling="no" srcdoc={this.state.img+"<script>document.documentElement.scrollTop = document.body.scrollTop = '"+this.state.codeData.scroll+"'</script>"}/>
        {console.log(apiUrl + this.state.imageData.url)}
        {/* <embed id="wed-svg-visual" width={this.state.codeData.width} height={this.state.codeData.height} type="text/html" src={apiUrl + this.state.imageData.url} /> */}

        {/* <iframe id="wed-svg-visual" sandbox width={this.state.codeData.width} height={this.state.codeData.height} frameBorder="0" border="0" scrolling="no" src={apiUrl + this.state.imageData.url}/> */}
          {/* <div id="code-visual-wrap" style={{ overflow: "hidden", background:"white", width:this.state.codeData.width, height:this.state.codeData.height }} >
            <div id="code-visual" dangerouslySetInnerHTML={{ __html: this.state.img }}></div>
          </div> */}
        </Grid>
      </Grid>
    );
  }
}

export default HtmlCssTab;