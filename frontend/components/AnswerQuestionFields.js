import MaterialIcon from '@material/react-material-icon';
import { Box, Grid, Card, Fab, CardMedia, ButtonGroup, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Input, InputLabel, Button, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CommentBox from '../components/CommentBox';
import getConfig from 'next/config';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';

const QuinnAvi = props => (
  <img src="static/img/quinn-avi.png" alt="avatar"/>
);

const EbenAvi = props => (
  <img src="static/img/eben-avi.jpeg" alt="avatar"/>
);

class AnswerQuestionFields extends React.Component {

  state = {
    question: {},
  };

  

	componentDidMount = () => {
		this.update();
	}
	
	componentDidUpdate = (prevProps) => {
		if ( 
      typeof this.props.test.questions[Number(this.props.questionNumber)-1] !== "undefined" && 
      this.props.test.questions[Number(this.props.questionNumber)-1] !== (typeof prevProps.test.questions !== "undefined" ? prevProps.test.questions[Number(prevProps.questionNumber)-1] : "") 
    ) {
      console.log(this.props.test.questions[Number(this.props.questionNumber)-1])
      this.setState({question: this.props.test.questions[Number(this.props.questionNumber)-1]})
			this.update();
		}
  }

  update = () => {
  }

  closeLightbox = () => {
    this.setState({lightboxOpen:false})
  };

  openLightbox = () => {
    this.setState({lightboxOpen:true})
  };

  render() {
    return (
      <>
				<Grid container spacing={0} className="question-fields">
					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
            <Box mb={2} mt={2}>
              <Typography align="left" style={{maxWidth: "700px", marginLeft: "auto", marginRight: "auto"}} variant="h4">{this.state.question.question ? this.state.question.question : ""}</Typography>
            </Box>
					</Grid>
					<Grid item xs={2}></Grid>

					<Grid item xs={2}></Grid>
					<Grid item xs={8}>
						<Box mb={2}>
              <Typography align="left" style={{maxWidth: "700px", marginLeft: "auto", marginRight: "auto"}} variant="body1">{this.state.question.context ? this.state.question.context : ""}</Typography>
						</Box>
					</Grid>
					<Grid item xs={2}></Grid>
        </Grid>

				<Grid container spacing={4} className="question-fields">
					<Grid item xs={8}>
            <Box mb={2}>
              <Card>
                <div 
                  class="question-img-container" 
                  style={{
                    width: this.state.question.code_image && this.state.question.code_image.width !== "" ? this.state.question.code_image.width : "inherit", 
                    height: this.state.question.code_image && this.state.question.code_image.height !== "" ? this.state.question.code_image.height : "inherit"
                  }}
                >
                  {/* { this.state.question.code_image ? 
                    <CardMedia src={apiUrl + this.state.question.code_image.url} } />
                  : 
                    <div className="no-image"></div>
                  } */}
                  { this.state.question.code_image ? 
                    <img src={apiUrl + this.state.question.code_image.url} />
                  : 
                    <div className="no-image"></div>
                  }
                </div>
              </Card>
            </Box>
					</Grid>
					<Grid item xs={4}>
						<Box mb={2}>
              <ButtonGroup color="primary" fullWidth={true} size="large" aria-label="outlined primary button group">
                <Button>Yes</Button>
                <Button>No</Button>
              </ButtonGroup>
            </Box>
            <Box mb={2}>
              <Button color="primary" fullWidth={true} variant="contained" startIcon={<ArrowForwardIcon/>}>Next Question</Button>
						</Box>
            <Box mb={2}>
              <CommentBox size="small"/>
						</Box>
					</Grid>
        </Grid>
   
      </>
    );
  }
}

export default AnswerQuestionFields;