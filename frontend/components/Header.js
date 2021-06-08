import Link from "next/link";
import {TopAppBarRow } from '@material/react-top-app-bar';
// import IconButton from '@material/react-icon-button';
// import MaterialIcon from '@material/react-material-icon';
import {IconButton, Box, AppBar, Container, Grid, Button, Typography, TextField, DialogActions, DialogContent, Dialog, DialogTitle, DialogContentText } from '@material-ui/core';
import Switch from '@material/react-switch';
import LinearProgress from '@material/react-linear-progress';
import Avatar from './header/Avatar';
import SignUp from '../components/SignUp';
import Router from 'next/router';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SignIn from "../components/SignIn";

class CreatingHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true,
      questionNumber: false
    };
  }
  componentDidMount = () => {
    this.update();
  }

	componentDidUpdate(nextProps) {
		const { questionNumber, test } = this.props
		if (nextProps.questionNumber !== questionNumber) {
			this.update();
		}
		if (nextProps.test !== test) {
			this.update();
		}
	}

  update = () => {
    this.setState({ questionNumber: Router.router.query.question });
  }
  render(){
    return(
      <TopAppBarRow className="header-row-2">
        <Grid container className="header-grid-2">
          <Grid item xs={12} >
            {/*<TopAppBarSection className="">*/}
              <Typography variant="h6" className="question-counter">{(this.props.page === "test-results") ? "Test Results" : "Question "+this.state.questionNumber}</Typography>
              <Box className="titles-wrapper">
                <Typography className="font-title" variant="body1"><span className="emphasis">{this.props.test.name}</span> v.{this.props.test.major_version}.{this.props.test.minor_version}</Typography>
                <Typography className="project-title" variant="body1" style={{opacity: "0.25"}}><span className="emphasis">{this.props.test.project && this.props.test.project.name}</span> v.{this.props.test.project && this.props.test.project.major_version}.{this.props.test.project && this.props.test.project.minor_version}</Typography>
              </Box>
            {/*</TopAppBarSection>*/}
          </Grid>
        </Grid>
      </TopAppBarRow>
    );
  }
}


class AnsweringHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true
    };
  }
  render(){
    return(
      <TopAppBarRow className="header-row-2">
        <LinearProgress className="progress-bar" value={0} progress={this.props.progressBar} buffer={1} bufferingDots={false}/>
        <Grid container className="header-grid-2">
            <Grid item xs={6}>
              <Typography variant="h6" className="question-counter">{this.props.progressBar}% Done</Typography>
              <Box className="titles-wrapper">
                <Typography className="font-title" variant="body1"><span className="emphasis">{this.props.test.name}</span> v.{this.props.test.major_version}.{this.props.test.minor_version}</Typography>
                <Typography className="project-title" variant="body1" style={{opacity: "0.25"}}><span className="emphasis">{this.props.test.project && this.props.test.project.name}</span> v.{this.props.test.project && this.props.test.project.major_version}.{this.props.test.project && this.props.test.project.minor_version}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} className="text-align-right">
              <Switch className="show-comments-switch" nativeControlId='show-comments-switch' checked={this.state.showComments} onChange={(e) => this.setState({showComments: e.target.showComments})} />
              <Typography  variant="body2" tag="label" htmlFor='show-comments-switch' className="show-comments-switch-label">Show comments</Typography>
            </Grid>
        </Grid>
      </TopAppBarRow>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignUp: false,
      openSignIn: false,
      textFieldSignUpValue: "",
      textFieldSignInValue: ""
    };
  }
  handleSignUpOpen = () => {
    this.setState({ openSignUp: true});
  }
  handleSignUpClose = () => {
    this.setState({ openSignUp: false});
    this.setState({ textFieldSignUpValue: "" });
  }
  handleSignInOpen = () => {
    this.setState({ openSignIn: true});
  }
  handleSignInClose = () => {
    this.setState({ openSignIn: false});
    this.setState({ textFieldSignInValue: "" });
  }
  render() {
    return (
      // <TopAppBar className="header">
      <Box displayPrint="none">
        <AppBar color="inherit" className="header">
          <Container maxWidth={false}>
            <TopAppBarRow>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Link href="/">
                    <a>
                      <Typography variant="h5" className="logo" style={{fontWeight:"700"}}>EQX</Typography>
                    </a>
                  </Link>
                </Grid>
                <Grid item xs={6} className="header-right" align="right">
                  {this.props.auth ? (	
                    <>
                      <Typography display="inline" style={{top: "4px", position: "relative"}} variant="h6" >{this.props.loggedUser ? decodeURI(this.props.loggedUser) : ""}</Typography>
                      <Avatar/>
                      <IconButton color="primary" aria-label="notifications" style={{marginTop: "5px"}}>
                        <NotificationsIcon style={{fontSize: "26px"}}/>
                      </IconButton>
                      {/* <IconButton className="header-notifications header-avatar">
                        <MaterialIcon icon='avatar' />
                      </IconButton> */}
                    </>
                  ) : (
                    <>
                      <Button color="primary" style={{marginTop: "10px"}} className="sign-in-button" onClick={()=>{this.handleSignInOpen();this.handleSignUpClose();} }>Login</Button>
                      <Button variant="contained" style={{marginTop: "10px"}} color="primary" className="sign-up-button" onClick={()=>{this.handleSignUpOpen();this.handleSignInClose();} }>Sign Up</Button>

                      <Dialog open={this.state.openSignUp} onClose={()=>{this.handleSignInClose();this.handleSignUpClose();} }>
                        <SignUp/>
                      </Dialog>
                      <Dialog open={this.state.openSignIn} onClose={()=>{this.handleSignInClose();this.handleSignUpClose();} }>
                        <SignIn/>
                    </Dialog>
                    </>
                  )}
                </Grid>
              </Grid>
            </TopAppBarRow>
            {this.props.headerType == "creating" ? <CreatingHeader {...this.props}/> : null}  
            {this.props.headerType == "answering" ? <AnsweringHeader progressBar={this.props.progressBar} {...this.props}/> : null}    
          </Container>
        </AppBar>
      </Box>
    );
  }
} 


export default Header;