import MaterialIcon from '@material/react-material-icon';
import { List, ListItem, ListItemAvatar, CardActions, CardContent, Avatar, ListItemText, Divider, Box, Grid, Card, CardHeader, Fab, CardMedia, ButtonGroup, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
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
import moment from 'moment'; // for future timestamps
// import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel"; // Doesnt work anymore
import eachOf from 'async/eachOf';
import async from 'async';
import Link from 'next/link';
// var async = require("async");
import ShowChart from '@material-ui/icons/ShowChart';

class Comment extends React.Component {

	state = {
    comment : this.props.comment ? this.props.comment : {},
    newReplyValue : ""
	};
	componentDidMount = () => {
		this.update();
	}
	// componentDidUpdate(nextProps) {
	// 	if (this.props.test && nextProps.test.questions !== this.props.test.questions) {
	// 		this.update();
	// 	}
	// }
	update = () => {
    
    axios // Update Comment
    .get(apiUrl + "/comments/" + (this.state.comment.id ? this.state.comment.id : this.props.comment.id), 
      { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
    }).catch(error => { console.log(error); // Handle Error
    }).then(comment => { // Handle success
      var comment = comment.data;
      this.setState({comment: comment});
      async.eachOf(comment.replies, (reply, i, callback) => {

        axios // Update Comment
        .get(apiUrl + "/replies/" + reply.id, 
          { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
        }).catch(error => { console.log(error); // Handle Error
        }).then(reply => { // Handle success
          comment.replies[i] = reply.data;
          callback();
        });

      }, (err, results) => {
        this.setState({comment: comment});
      });
    });
	}

	onNewReplyChange = (e) => {
		this.setState({newReplyValue: e})
	}

  createReply = () => {
    axios // Create Reply
      .post(apiUrl + '/replies/', {
        comment: this.state.comment.id,
        user: Cookies.get("id"),
        text: this.state.newReplyValue
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error); // Handle Error
      }).then(newReply => { // Handle success
        this.setState({newReplyValue: ""})
        this.update();
      });
  }

	render() {
		return (
      <Grid key={"inner-comment-" + this.state.comment.id} item xs={12}>
        <Box mb={2} >
          <Card className="comment-section" >
            <CardHeader
              align="left"
              avatar={
                <Avatar aria-label="recipe">{this.state.comment.number ? this.state.comment.number : this.props.question.comments.length}</Avatar>
              }
              title={typeof this.state.comment.replies !== "undefined" && this.state.comment.replies.length ? (this.state.comment.replies.length+1) + " messages" : "1 message"}
              subheader={"Created " + moment(this.state.comment.created_at).format("DD/MM/YY")} 
              />
            <CardMedia>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{this.state.comment.owner.username ? this.state.comment.owner.username.charAt(0).toUpperCase() : ""}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={this.state.comment.owner.username ? this.state.comment.owner.username : this.state.comment.owner.email}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="textPrimary">{this.state.comment.text}</Typography>
                      </>
                    }
                  />
                </ListItem>
                { this.state.comment.replies ? 
                  this.state.comment.replies.map((reply, i) =>    
                    <Box key={"comment-section-wrap-"+this.state.comment.id+"-reply-"+reply.id}>             
                      {/* {console.log(reply)} */}
                      <Divider key={"divider-"+this.state.comment.id+"-reply-"+reply.id} variant="inset" component="li" />
                      <ListItem key={"comment-section-"+this.state.comment.id+"-reply-"+reply.id}>
                        <ListItemAvatar>
                          <Avatar>{reply.user.username ? reply.user.username.charAt(0).toUpperCase() : ""}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={reply.user.username ? reply.user.username : reply.user.email}
                          secondary={
                            <>
                              <Typography component="span" variant="body2" color="textPrimary">{reply.text}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                    </Box>
                  )
                : null }
              </List>
            </CardMedia>
            <CardActions >
              <Box p={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      value={this.state.newReplyValue}  
                      onChange={e => {this.onNewReplyChange(e.currentTarget.value)}}
                      type="text"
                      label=""
                      size="small"
                      fullWidth
                      placeholder="Add a reply"
                      multiline
                    />
                  </Grid>
                  <Grid item xs={12} align="left">
                    <Box display="inline-block" pr={1}>
                      <Button onClick={this.createReply} disabled={this.state.newReplyValue === "" ? true : false} color="primary" fullWidth size="large" variant="outlined" startIcon={<AddCommentIcon/>}>Post</Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>
		)
	}
}

class AnswerQuestionFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
      staticImg: false,
      referenceImagesOpen: false,
      img: "",
      newCommentValue: ""
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

	onNewCommentChange = (e) => {
		this.setState({newCommentValue: e})
	}

  createComment = () => {

    axios // Create Comment
      .post(apiUrl + '/comments/', {
        question: this.state.question.id,
        owner: Cookies.get("id"),
        text: this.state.newCommentValue
      }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
      }).catch(error => { console.log(error); // Handle Error
      }).then(newComment => { // Handle success
        this.setState({newCommentValue: ""})
        this.update();
        
        axios // Update Comment
          .get(apiUrl + "/comments?question=" + this.state.question.id, 
            { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.log(error); // Handle Error
          }).then(questionComments => { // Handle success

            axios // Update Comment
              .put(apiUrl + '/comments/' + newComment.data.id, { 
                number: Number(questionComments.data.findIndex(comment => comment.id === newComment.data.id)) + 1,
              }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
              }).catch(error => { console.log(error); // Handle Error
              }).then(response => { // Handle success
                this.update();            
              });

          });

      });
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
                      <Button onClick={() => this.referenceImagesToggle()}  color="primary" size="large" variant="outlined" startIcon={<PermMediaIcon/>}>{this.state.referenceImagesOpen ? "Collapse Reference Images" : "Expand Reference Images"}</Button>
                    </Box>
                  </Grid>
                  <Grid className="small-reference-imgs" item style={{display: this.state.referenceImagesOpen ? "none" : "flex", height: "200px", overflowX: "scroll", overflowY: "hidden"}} xs={12}>
                    { this.state.question.reference_images.map((img, i) => 
                      <Box key={"small-reference-img-" + i} style={{float: "left", marginRight: "1rem"}} mb={4}>
                        <Card >
                          <CardMedia>
                            <img style={{height: "200px", display:"block"}} src={apiUrl + img.image.url} />
                          </CardMedia>
                        </Card>
                      </Box> 
                    )}
                  </Grid>
                  <Grid item style={{display: this.state.referenceImagesOpen ? "initial" : "none"}} xs={12}>
                    { this.state.question.reference_images.map((img, i) => 
                      <Box key={"reference-img-" + i} mb={4}>
                        <Card >
                          <CardMedia>
                            <img style={{width: "100%", display:"block"}} src={apiUrl + img.image.url} />
                          </CardMedia>
                          {img.caption && img.caption !== "" ?
                          
                            <CardContent>
                              {/* <img style={{width: "100%"}} src={apiUrl + img.image.url} /> */}
                              <Typography variant="body2" color="textSecondary" component="p">{img.caption}</Typography>
                            </CardContent>
                          :
                            null
                          }
                        </Card>
                      </Box> 
                    )}
                    {/* <Dialog 
                      PaperProps={{ style: { overflow: "visible", borderRadius: "4px" } }} 
                      fullWidth={true} maxWidth="md" open={this.state.referenceImagesOpen} onClose={() => this.referenceImagesToggle()}
                    >

                      { this.state.question.reference_images.map((img, i) => 
                        {console.log(img)}
                      )}
                    </Dialog> */}
                  </Grid>
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
              { (typeof this.props.test.questions !== "undefined" && Number(this.props.questionNumber) + 1 <= this.props.test.questions.length) ?
                <Button onClick={this.nextQuestion} color="primary" fullWidth={true} size="large" variant="contained" startIcon={<ArrowForwardIcon/>}>Next Question</Button>
              :
                <Link href={"/test-overview?test=" + this.props.test.id}><a>
                  <Button color="primary" fullWidth={true} size="large" variant="contained" startIcon={<ShowChart />}>
                    <br/>
                    See Results
                    <br/>
                    <br/>
                    </Button>
                </a></Link>
              }
            </Box>
            <Box mb={2}>
              {/* <CommentBox size="small"/> */}
            { typeof this.state.question.answers !== 'undefined' && 
              this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))) && 
              this.state.question.answers.find(e => e.user === Number(Cookies.get("id"))).true === false 
              ? 
                <>
                  <Grid key={"comment-new"} container spacing={0}>
                    <Grid item xs={12}>
                      <Box mb={2}>
                        <Divider />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box mb={2}>
                        <Card className="new-comment-section" >
                          <CardActions >
                            <Box p={1}>
                              <Grid container spacing={2}>
                                <Grid item xs={12}>
                                  <TextField
                                    value={this.state.newCommentValue}  
                                    onChange={e => {this.onNewCommentChange(e.currentTarget.value)}}
                                    type="text"
                                    label=""
                                    size="small"
                                    fullWidth
                                    placeholder="Your Comment"
                                    multiline
                                  />
                                </Grid>
                                <Grid item xs={12} align="left">
                                  <Button onClick={this.createComment} disabled={this.state.newCommentValue === "" ? true : false} color="primary" fullWidth size="large" variant="outlined" startIcon={<AddCommentIcon/>}>Create Comment</Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </CardActions>
                        </Card>
                      </Box>
                    </Grid>
                  </Grid>
                  { this.state.question.comments.slice(0).reverse().map((comment, i) => 
                    <Comment key={"comment-" + comment.id} question={this.state.question} comment={comment}/> 
                  )}
                </>
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