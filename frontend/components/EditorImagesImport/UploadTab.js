import MaterialIcon from '@material/react-material-icon';
// import {Button} from '@material/react-typography';
import FontImportSelect from '../FontImportSelect';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import axios from 'axios';
import { MenuItem, InputAdornment, IconButton, Chip, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, TextField, Fab, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Avatar, AppBar, Tab, Tabs, Card, CardContent, Typography, Box, Divider, Button } from '@material-ui/core';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";
import { typography } from '@material-ui/system';
import debounce from 'lodash/debounce';
import GetAppIcon from '@material-ui/icons/GetApp';
import { format } from 'url';
// const {parse, stringify} = require('flatted');

class UploadTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: [],
      imageData: {},
      img: "",
      loading: false,
      fonts: {},
      codeData: {
        url: "",
        width: "700px",
        height: "700px",
        scroll: "0",
        styles: {},
        stylesMap: {},
        stylesHTML: "",
      }
    };
  }

  componentDidMount = () => {
    var question = this.props.test.questions[Number(this.props.questionNumber - 1)];
    var codeData, imageData;
    if (question.code_data && question.code_image){
      codeData = question.code_data;
      imageData = question.code_image;
      this.setState({
        loading: true,
        codeData: codeData,
        imageData: imageData
      }, () => this.update() );
    } else {
      codeData = this.state.codeData;
      imageData = this.state.imageData;
      this.setState({
        codeData: codeData,
        imageData: imageData
      });
    }


    this.autosave = debounce(this.autosave, 500);
    const timer = setInterval(() => {
      if (this.state.codeData && typeof this.state.codeData.scroll !== "undefined" && document.getElementById('wed-svg-visual') && document.getElementById('wed-svg-visual').contentWindow.document.documentElement && typeof document.getElementById('wed-svg-visual').contentWindow.document.documentElement !== "undefined" && ( Number(document.getElementById('wed-svg-visual').contentWindow.document.documentElement.scrollTop) !== Number(this.state.codeData.scroll))){
        document.getElementById('wed-svg-visual').contentWindow.document.documentElement.scrollTop = this.state.codeData.scroll;
      }
    }, 1000);
    return () => clearInterval(timer);
  }

  componentDidUpdate(prevProps, prevState) {
    if (typeof prevProps !== "undefined" && this.props !== prevProps) {
      var prevQuestion = prevProps.test.questions[Number(prevProps.questionNumber - 1)];
      var question = this.props.test.questions[Number(this.props.questionNumber - 1)];
      if (
        question.code_data && prevQuestion.code_data && (prevQuestion.code_data.url !== question.code_data.url)||
        question.code_image && prevQuestion.code_image && (prevQuestion.code_image.url !== question.code_image.url)
      ){
        this.setState({ 
          loading: true,
          codeData: question.code_data,
          imageData: question.code_image},
          () => this.update()
        );
      } else {
        this.setState({ 
          codeData: question.code_data,
          imageData: question.code_image
        });
      }
    } 
  }

  scrapeUrl = () => {
    if (typeof this.state.codeData === "undefined" || typeof this.state.codeData.url === "undefined" || this.state.codeData.url === "") { return; }
    var that = this;
    var url = this.state.codeData.url;
    that.setState({ 
      img: "",
      loading: true 
    });
    if ( !Boolean(['http://', 'https://', 'ftp://'].some(protocol => url.startsWith(protocol))) ) {
      
      var codeData = this.state.codeData;
      codeData.url = "http://" + codeData.url;
      codeData.styles = {};
      this.setState({ codeData: codeData }); 
      this.matchStyles();
      url = codeData.url;
    }

    axios.get('/api/getUrl', 
      { params: 
        { url: url } 
      }
    )
    .then(function (response) {
      var file = new File([response.data], ('scrape-' + new Date().getTime() + ".html"), {type: "text/html"});
      var formData = new FormData();
      formData.append('files', file);
      axios // Upload new file
        .post(apiUrl + '/upload', formData, 
          { headers: { 'Authorization': 'Bearer ' + Cookies.get("jwt") } })
        .then(response => {
          var image = response.data[0];
          that.setState({imageData: image });

          axios // Save to question
            .put(apiUrl + '/questions/' + that.props.test.questions[Number(that.props.questionNumber - 1)].id, { 
                code_image: image,
                code_data: that.state.codeData
              }, 
              { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
            }).catch(error => { console.log(error) 
            }).then(response => {
              that.update();
            });

      }).catch(error => { console.log(error) });

    });
  }
  
  update = () => {
		if (typeof this.state.imageData !== "undefined" && this.state.imageData && typeof this.state.imageData.url !== "undefined") {
      var ext = this.state.imageData.url.substring(this.state.imageData.url.lastIndexOf(".") + 1);
      if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif" || ext === "eps" || ext === "webp") {
        var imgData = "<img src='" + apiUrl + this.state.imageData.url + "'/>";
        this.setState({
          img: imgData,
          loading: false
        });
      } else {
        axios
          .get(apiUrl + this.state.imageData.url) 
          .then(response => {
            var imgData = response.data;
            // var domParser = new DOMParser();
            var docElement = new DOMParser().parseFromString(imgData, "text/html").documentElement;
            var newTagList = [];
            if (ext === "svg"){
              var texts = docElement.getElementsByTagName("text");
              for (var i = 0; i < texts.length; i++) {
                newTagList.push({name: "#"+texts[i].id});
              }
            } else if (ext === "html"){
              var tagList = [{name:'h1'},{name:'h2'},{name:'h3'},{name:'h4'},{name:'h5'},{name:'h6'},{name:'p'},{name:'li'}];
              tagList.forEach(function(tag, index){
                if (docElement.getElementsByTagName(tag.name).length){
                  newTagList.push(tag);
                }
              });

              if (docElement.querySelector("#eqxDefaults")){
                var eqxDefaults = eval(docElement.querySelector("#eqxDefaults").innerHTML.split("=").pop());
                eqxDefaults.forEach(style => {
                  if (docElement.querySelector(style.name)){
                    style.default = true;
                    newTagList.push(style);
                  }
                });
              }

            } else {
              imgData = "<p style='padding: 2rem 0' class='MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter'>This filetype isn't supported.</p>"
            }
            this.setState({
              img: imgData,
              tagList: newTagList,
              loading: false
            });
            this.matchStyles();
            setTimeout(() => {  this.matchStyles(); }, 2000);

          }).catch(error => { console.log(error) });
      }
    }
  }

  matchStyles = () => {
    var codeData = this.state.codeData;
    codeData.styleMap = {};
    codeData.styleHTML = "<style>";
    this.state.tagList.forEach( (tag) => {
      codeData.styleMap[tag.name] = this.props.test.project.fonts.find(obj => { return obj.name === codeData.styles[tag.name] });
      if (typeof tag.default !== "undefined" && tag.default && typeof codeData.styleMap[tag.name] === "undefined"){ codeData.styleMap[tag.name] = this.props.test.project.fonts[0] } 
      if (typeof codeData.styleMap[tag.name] !== "undefined"){
        var format = codeData.styleMap[tag.name].info.extension;
        if (format == "ttf"){format = "truetype"}
        if (!codeData.styleHTML.includes("@font-face{font-family:'"+codeData.styleMap[tag.name].name)){
          if (codeData.styleMap[tag.name].variable){
            codeData.styleHTML += "@font-face{font-family:'"+codeData.styleMap[tag.name].name+"';src:url('"+apiUrl+codeData.styleMap[tag.name].file.url+"') format('"+format+"-variations');}";
          } else {
            codeData.styleHTML += "@font-face{font-family:'"+codeData.styleMap[tag.name].name+"';src:url('"+apiUrl+codeData.styleMap[tag.name].file.url+"') format('"+format+"');font-weight:400;font-style:normal;}";
          }
        }
        if (codeData.styleMap[tag.name].variable){
          codeData.styleHTML += tag.name + "{font-family:'"+codeData.styleMap[tag.name].name+"'!important; font-variation-settings: ";
          if(tag.hasOwnProperty('wdth')){ codeData.styleHTML += "'wdth' "+tag.wdth+"," }
          if(tag.hasOwnProperty('opsz')){ codeData.styleHTML += "'opsz' "+tag.opsz+"," }
          if(tag.hasOwnProperty('wght')){ codeData.styleHTML += "'wght' "+tag.wght+"," }
          codeData.styleHTML = codeData.styleHTML.substring(0, codeData.styleHTML.length - 1);
          codeData.styleHTML += ";}";
        } else {
          codeData.styleHTML += tag.name + "{font-family:'"+codeData.styleMap[tag.name].name+"'!important;font-weight:400;font-style:normal;}";
        }
      }
    })
    codeData.styleHTML += "</style>";
    if(document.getElementById('wed-svg-visual').contentWindow.document.getElementById('ext-eqx-styles')){
      document.getElementById('wed-svg-visual').contentWindow.document.getElementById('ext-eqx-styles').innerHTML = codeData.styleHTML;
    }
    this.setState({ codeData: codeData }); 
  }

  uploadFile = (e) => {
    var formData = new FormData();
    formData.append("files", e.target.files[0]);
    var codeData = this.state.codeData;
		codeData.url = "";
    codeData.styles = {};
    this.setState({
      img: "",
      codeData: codeData,
      loading: true
    }); 
    this.matchStyles();
    axios // Upload file
      .post(apiUrl + '/upload', formData, 
        { headers: { 'Authorization': 'Bearer ' + Cookies.get("jwt") } })
      .then(response => {
        var image = response.data[0];
        var ext = image.url.substring(image.url.lastIndexOf(".") + 1);
        var question = this.props.test.questions[Number(this.props.questionNumber - 1)];
        if (ext === "svg" || ext === "html"){
          axios // Download and edit file
            .get(apiUrl + image.url) 
            .then(response => {
              // var data = response.data.replace(/<script[^>]*>(?:(?!<\/script>)[^])*<\/script>/g, "");
              var data = response.data;
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
                  this.setState({ 
                    imageData: image,
                    loading: false
                  });
                  axios // Save to question
                    .put(apiUrl + '/questions/' + question.id, { 
                        code_image: image,
                        code_data: this.state.codeData
                      }, 
                      { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
                    }).then(response => {
                      this.update();
                    }).catch(error => { console.log(error) });
                }).catch(error => { console.log(error) });
            }).catch(error => { console.log(error) });
        } else {

          this.setState({ 
            imageData: image,
            loading: false
          });
          axios // Save to question
            .put(apiUrl + '/questions/' + question.id, { 
                code_image: image,
                code_data: this.state.codeData
              }, 
              { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
            }).then(response => {
              this.update();
            }).catch(error => { console.log(error) });
        }
      }).catch(error => { console.log(error) });
  };

	autosave = () => {
		axios
		  .put(apiUrl + '/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, {
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
    if (this.state.codeData && typeof document.getElementById('wed-svg-visual').contentWindow.document.documentElement !== "undefined" && document.getElementById('wed-svg-visual').contentWindow.document.documentElement.scrollTop !== this.state.codeData.scroll){
      document.getElementById('wed-svg-visual').contentWindow.document.documentElement.scrollTop = this.state.codeData.scroll;
    }
		this.autosave();
	}

	onURLChange = (e) => {
    var codeData = this.state.codeData;
		codeData.url = e;
		this.setState({codeData: codeData})
		this.autosave();
	}

	onStyleChange = (value, tag, e) => {
    var codeData = this.state.codeData;
    if (typeof codeData.styles === "undefined"){
      codeData.styles = {};
    }
    codeData.styles[tag] = value;
    this.setState({codeData: codeData})
    this.matchStyles();
		this.autosave();
	}

  render() {
    return (
      <Grid container spacing={0} className="import-tab">
        <Grid item xs={4}>
          <Grid container spacing={0} className="import-tab">
            <Grid item xs={12} style={{background: "rgba(0,0,0,0.9)"}}>
              <Grid container spacing={0}>
                <Grid item xs={8}>
                  <TextField 
                    label={'URL'}
                    // key={'window-height-selector'}
                    value={(this.state.codeData && typeof this.state.codeData.url !== "undefined" && this.state.codeData.url ) ? this.state.codeData.url : ""}
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
              <label htmlFor="import-html-upload" className="import-html-upload-label" style={{ height: "150px"}}>
                <AttachFileIcon style={{ color: "rgba(255,255,255,0.25)" }} className="paperclip-icon" />
                <Button style={{ pointerEvents:"none", color:"rgba(255,255,255,1)", fontSize: '24px'}}><b>Upload</b></Button>
              </label>

            </Grid>
            <Grid item xs={12} style={{ minHeight: "293px", background: "white"}}>
              <TextField 
                label={'Window height'}
                key={'window-height-selector'}
                value={(this.state.codeData && typeof this.state.codeData.height !== "undefined" && this.state.codeData.height ) ? this.state.codeData.height : ""}
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
                value={(this.state.codeData && typeof this.state.codeData.width !== "undefined" && this.state.codeData.width ) ? this.state.codeData.width : ""}
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
                value={(this.state.codeData && typeof this.state.codeData.scroll !== "undefined" && this.state.codeData.scroll ) ? this.state.codeData.scroll : ""}
                fullWidth 
                type="number"
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
                    label={tag.name + ' style' }
                    key={index + '-element-selector' }
                    select 
                    onChange={e => {this.onStyleChange(e.target.value, tag.name, e)}}
                    // value={(typeof this.props.test.project.fonts != "undefined" && this.props.test.project.fonts.length) ? this.props.test.project.fonts[0] : 0} 
                    // value={(typeof this.state.codeData.styles !== "undefined" && typeof this.state.codeData.styles[tag.name] !== "undefined" && typeof this.state.codeData.styleMap !== "undefined" && typeof this.state.codeData.styleMap[tag.name] !== "undefined"  && this.state.codeData.styles[tag.name] !== false) ? this.state.codeData.styleMap[tag.name] : {name: false}} 
                    value={(this.state.codeData && typeof this.state.codeData.styles !== "undefined" && typeof this.state.codeData.styles[tag.name] !== "undefined" && this.state.codeData.styles[tag.name] !== false) ? this.state.codeData.styles[tag.name] : false} 
                    fullWidth 
                    variant="filled" 
                    InputLabelProps={{ style:{display: "none"} }}
                    SelectProps={{
                      SelectDisplayProps: {
                        style:{ paddingTop: "20px", position: "relative", paddingBottom: "20px", paddingLeft: "5px"}
                      }
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment style={{width: "75px", marginTop: 0}} position="start">{tag.name}</InputAdornment>,
                      style:{borderRadius: 0}
                    }}
                  >
                    <MenuItem key={index+"-Inherited"} value={false}>Inherited</MenuItem>
                    {/* {(typeof this.props.test.project.fonts != "undefined" && this.props.test.project.fonts.length) ? */}
                    {(typeof this.props.test.project.fonts != "undefined" && this.props.test.project.fonts.length) &&
                      this.props.test.project.fonts.map((el, i) => (
                        <MenuItem key={index+"-"+el.name} value={el.name}>{el.name}</MenuItem>
                      ))
                    }
                  </TextField>
                ))
              :
              <Box mt={3} color="text.disabled">
                <Typography align="center" variant="body1">Sorry, but we can't detect any live type.</Typography>
              </Box>
            }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8} className="visual-editor" style={{background: "rgba(0, 0, 0, 0.07)"}}>
          <LinearProgress variant="indeterminate" style={{ display: this.state.loading ? "" : "none" }}/>
          <iframe id="wed-svg-visual" width={this.state.codeData && this.state.codeData.width} height={this.state.codeData && this.state.codeData.height} frameBorder="0" border="0" scrolling="no" srcDoc={this.state.img + "<div id='ext-eqx-styles' style='display:none'></div>"}/>
          {/* <iframe id="wed-svg-visual" sandbox width={this.state.codeData.width} height={this.state.codeData.height} frameBorder="0" border="0" scrolling="no" src={"data:text/html,"+encodeURIComponent(this.state.img+"<script>document.documentElement.scrollTop = document.body.scrollTop = '"+this.state.codeData.scroll+"'</script>")}/> */}
          {/* <iframe id="wed-svg-visual" width={this.state.codeData.width} height={this.state.codeData.height} frameBorder="0" border="0" scrolling="no" srcDoc={this.state.img+"<script>document.documentElement.scrollTop = '"+this.state.codeData.scroll+"'</script>"}/> */}
        </Grid>
      </Grid>
    );
  }
}

export default UploadTab;