import MaterialIcon from '@material/react-material-icon';
import { List, ListItem, ListItemAvatar, CardActions, Avatar, ListItemText, Divider, Box, Grid, Card, CardHeader, Fab, CardMedia, ButtonGroup, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CommentBox from '../components/CommentBox';
import getConfig from 'next/config';
import axios from 'axios';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Router from 'next/router';
import AddCommentIcon from '@material-ui/icons/AddComment';
import PermMediaIcon from '@material-ui/icons/PermMedia';
// import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel"; // Doesnt work anymore

class AnswerQuestionFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      staticImg: false,
      referenceImagesOpen: false,
      img: "",
    };
  }

	componentDidMount = () => {
		// this.update();
	}
	
	componentDidUpdate = (prevProps) => {
    if (
      typeof prevProps !== "undefined" && 
      this.props !== prevProps && 
      this.props.questionNumber !== prevProps.questionNumber
    ) {
      // console.log(this.props.test.questions)
      // this.setState({ 
      //   question: this.props.test.questions[Number(this.props.questionNumber) - 1]
      // }, () => this.update());
      this.update();
    } 
  }

  update = () => {
    
    axios
      .get(apiUrl + "/questions?id=" + this.props.test.questions[Number(this.props.questionNumber) - 1].id, {
        headers: { Authorization: "Bearer " + Cookies.get("jwt") }
      }) 
      .then(response => {
        // console.log("update");
        this.setState({ 
          question: response.data[0]
        }, function(){
          console.log(1)
          if (typeof this.state.question.code_image !== "undefined" && this.state.question.code_image && typeof this.state.question.code_image.url !== "undefined") {
            this.setState({loading: false});
            var ext = this.state.question.code_image.url.substring(this.state.question.code_image.url.lastIndexOf(".") + 1);
            if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif" || ext === "eps" || ext === "webp") {
              var imgData = "<img src='" + apiUrl + this.state.question.code_image.url + "'/>";
              this.setState({
                staticImg: true,
                img: imgData,
                loading: false
              });
            } else {
              axios
                .get(apiUrl + this.state.question.code_image.url) 
                .then(response => {
                  var imgData = response.data;
                  if (ext !== "svg" && ext !== "html"){
                    imgData = "<p style='padding: 2rem 0' class='MuiTypography-root MuiTypography-body1 MuiTypography-alignCenter'>This filetype isn't supported.</p>"
                  }
                  this.setState({
                    staticImg: false,
                    img: imgData,
                    loading: false
                  });
                }).catch(error => { console.log(error) });
            }
          } else { 
            this.setState({ img: "" });
          }
        });
      });
    // console.log(this.state.question)
  }

  answer = (answer) => {
    // axios
    // .get(apiUrl + "/questions?id=" + this.state.question.id, {
    //   headers: { Authorization: "Bearer " + Cookies.get("jwt") }
    // }) 
    // .then(response => {
    //   console.log(response)
    // });
    // console.log(this.state.question.answers)
    // console.log([Cookies.get("id")])
    if (
      typeof this.state.question.answers !== "undefined" && 
      this.state.question.answers.some(e => e.user === Number(Cookies.get("id")))
    ) {
      axios // Create answer
        .put(apiUrl + '/answers/' + this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))).id, {
          true: answer
        }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
        }).catch(error => { console.log(error); // Handle Error
        }).then(response => { // Handle success
          this.update();
        });
    } else {
      axios // Create answer
        .post(apiUrl + '/answers/', {
          question: this.state.question.id,
          user: Cookies.get("id"),
          true: answer
        }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
        }).catch(error => { console.log(error); // Handle Error
        }).then(response => { // Handle success
          this.update();
          // axios // Add answer to question
          // .put(apiUrl + '/answers/', {
          //   answers: this.state.question.id,
          //   user: [Cookies.get("id")],
          //   true: answer
          // }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          // }).catch(error => { console.log(error); // Handle Error
          // }).then(response => { // Handle success
            
          // this.props.questionUpdate();
          // console.log(this.state.question.answers)
        });
    }
  }

  referenceImagesToggle = () => {
    this.setState({
      referenceImagesOpen: this.state.referenceImagesOpen ? false : true,
    });
  }

  closeLightbox = () => {
    this.setState({lightboxOpen:false})
  };

  openLightbox = () => {
    this.setState({lightboxOpen:true})
  };

  nextQuestion = () => {
    Router.push({
      pathname: '/answer-question',
      query: { 
        test: this.props.test.id, 
        question: Number(this.props.questionNumber) + 1
      },
    }, undefined, { shallow: true });
    this.props.pageUpdate();
  }

  render() {
    return (
      <>
				<Grid container spacing={0} className="question-fields">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
            <Box mb={2} mt={2}>
              <Typography align="left" style={{maxWidth: "700px", marginLeft: "auto", marginRight: "auto"}} variant="h4">{typeof this.state.question.question !== "undefined" ? this.state.question.question : ""}</Typography>
            </Box>
					</Grid>
					<Grid item xs={2}></Grid>

					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Box mb={2}>
              <Typography align="left" style={{maxWidth: "700px", marginLeft: "auto", marginRight: "auto"}} variant="body1">{typeof this.state.question.context !== "undefined"  ? this.state.question.context : ""}</Typography>
						</Box>
					</Grid>
					<Grid item xs={2}></Grid>
        </Grid>

				<Grid container spacing={4} className="question-fields">
					<Grid item xs={8}>

            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Card>
                    <div 
                      className="question-img-container" 
                      style={{
                        overflow: "scroll"
                      }}
                    >
                      {/* { this.state.question.code_image ? 
                        <CardMedia src={apiUrl + this.state.question.code_image.url} } />
                      : 
                        <div className="no-image"></div>
                      } */}
                      {/* { this.state.staticImg ?
                        <div className="img-visual" dangerouslySetInnerHTML={{__html: this.state.img}} />
                      :
                        <iframe id="code-visual" width={this.state.codeData && this.state.codeData.width} height={this.state.codeData && this.state.codeData.height} frameBorder="0" border="0" scrolling="no" srcDoc={this.state.img + "<div id='ext-eqx-styles' style='display:none'></div>"}/>
                      } */}
                      { this.state.question.code_data ? 
                        this.state.staticImg ?
                          <div className="img-visual" dangerouslySetInnerHTML={{__html: this.state.img}} />
                        :
                          <iframe 
                            id="code-visual" 
                            width={this.state.question.code_data && this.state.question.code_data.width !== "" ? this.state.question.code_data.width : "inherit"} 
                            height={this.state.question.code_data && this.state.question.code_data.height !== "" ? this.state.question.code_data.height : "inherit"} 
                            frameBorder="0" 
                            border="0" 
                            scrolling="no" 
                            srcDoc={this.state.img + "<div id='ext-eqx-styles' style='display:none'></div>"}/>
                        // <img src={apiUrl + this.state.question.code_image.url} />
                      : 
                        <div className="no-image"></div>
                      }
                    </div>
                  </Card>
                </Box>
              </Grid>
              {(this.state.question.reference_images && this.state.question.reference_images.length) ?
                <>
                  <Grid item xs={12}>
                    <Box mb={2} align="right">
                      <Button onClick={() => this.referenceImagesToggle()}  color="primary" size="large" variant="outlined" startIcon={<PermMediaIcon/>}>Show Reference Images</Button>
                    </Box>
                  </Grid>
                  {/* <AutoRotatingCarousel
                    label="Get started"
                    open={this.state.referenceImagesOpen}
                    onClose={() => this.referenceImagesToggle()}
                    // onStart={() => setHandleOpen({ open: false })}
                    autoplay={false}
                    mobile={false}
                  >

                    { this.state.question.reference_images.map((img, i) => 
                      // <img key={"reference-"+i} src={apiUrl + img.image.url} />
                      <Slide
                        media={
                          <img src={apiUrl + img.image.url} />
                        }
                        mediaBackgroundStyle={{ backgroundColor: red[400] }}
                        // style={{ backgroundColor: red[600] }}
                        title="This is a very cool feature"
                        subtitle="Just using this will blow your mind."
                      />
                    )}
                  </AutoRotatingCarousel>  */}
                  
                  {/* <Dialog 
                    PaperProps={{ style: { overflow: "visible", borderRadius: "4px" } }} 
                    fullWidth={true} maxWidth="md" open={this.state.referenceImagesOpen} onClose={() => this.referenceImagesToggle()}
                  >

                    { this.state.question.reference_images.map((img, i) => 
                      {console.log(img)}
                    )}
                  </Dialog> */}
                </>
              : "" }
            </Grid>
          </Grid>
					<Grid item xs={4}>
						<Box mb={2}>
              <ButtonGroup variant="outlined" color="primary" fullWidth={true} size="large" aria-label="outlined primary button group">
                <Button 
                  variant={
                    typeof this.state.question.answers !== 'undefined' && 
                    this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))) && 
                    this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))).true === true 
                    ? "contained" : "outlined"
                  } 
                  onClick={()=>{this.answer(true)}}
                >Yes</Button>
                <Button 
                  variant={
                    typeof this.state.question.answers !== 'undefined' && 
                    this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))) && 
                    this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))).true === false 
                    ? "contained" : "outlined"
                  } 
                  onClick={()=>{this.answer(false)}}
                >No</Button>
              </ButtonGroup>
            </Box>
            <Box mb={2}>
              <Button onClick={this.nextQuestion} color="primary" disabled={typeof this.state.question.answers !== "undefined" && this.state.question.answers.some(e => e.user === Number(Cookies.get("id"))) ? false : true} fullWidth={true} size="large" variant="contained" startIcon={<ArrowForwardIcon/>}>Next Question</Button>
						</Box>
            <Box mb={2}>
              {/* <CommentBox size="small"/> */}
            { typeof this.state.question.answers !== 'undefined' && 
              this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))) && 
              this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))).true === false 
              ? 

                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <Box mb={2}>
                      <Divider />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box mb={2}>
                      <Button color="primary" fullWidth size="large" variant="outlined" startIcon={<AddCommentIcon/>}>New Comment</Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Card className="comment-section" >
                      <CardHeader
                        align="left"
                      // color="primary"
                      // bgcolor="primary.main"
                        avatar={
                          <Avatar aria-label="recipe">
                            1
                          </Avatar>
                        }
                        title="2 comments"
                        subheader="Created 10/13/2021"
                      />
                      <CardMedia>
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar alt="Eben Sorkin" src="static/img/eben-avi.png" />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Eben Sorkin"
                              secondary={
                                <>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    The contrast is OK but the weight is not a match.
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar alt="Quinn Keaveney" src="static/img/quinn-avi.png" />
                            </ListItemAvatar>
                            <ListItemText
                              primary="Quinn Keaveney"
                              secondary={
                                <>
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                  >
                                    I agree, we will have that next week’s test.
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        </List>
                      </CardMedia>
                      <CardActions >
                        <Box p={1}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                label=""
                                size="small"
                                fullWidth
                                placeholder="Add a reply"
                                multiline
                              />
                            </Grid>
                            <Grid item xs={12} align="left">
                              <Box display="inline-block" pr={1}>
                                <Button variant="contained" color="primary">Post</Button>
                              </Box>
                              <Box display="inline-block" pr={1}>
                                <Button color="primary">Clear</Button>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              :
               <></>
              }
						</Box>
					</Grid>
        </Grid>
   
      </>
    );
  }
}

export default AnswerQuestionFields;