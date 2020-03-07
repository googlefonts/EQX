import Link from "next/link"
import {Body1, Body2, Subtitle1} from "@material/react-typography";
import {TopAppBarRow } from '@material/react-top-app-bar';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import {AppBar, Container, Grid, Button, Typography, TextField, DialogActions, DialogContent, Dialog, DialogTitle, DialogContentText } from '@material-ui/core';
import Switch from '@material/react-switch';
import LinearProgress from '@material/react-linear-progress';
import Avatar from './header/Avatar';
import SignUp from '../components/SignUp';

class CreatingHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComments: true
    };
  }
  render(){
    return(
      <TopAppBarRow className="header-row-2">
        <Grid container className="header-grid-2">
          <Grid item xs={12} >
            {/*<TopAppBarSection className="">*/}
              <Body1 className="question-counter" tag="h2">0 Questions</Body1>
              <div className="titles-wrapper">
                <Subtitle1 className="font-title" tag="h2">Merriweather v.2.11</Subtitle1>
                <Subtitle1 className="project-title" tag="h3"><span className="emphasis">Extended Latin Support</span> v.1.12</Subtitle1>
              </div>
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
        <LinearProgress className="progress-bar" progress={this.props.progressBar} buffer={1} bufferingDots={false}/>
        <Grid container className="header-grid-2">
            <Grid item xs={6}>
                <Body1 className="question-counter" tag="h2">
                  {this.props.progressBar * 100}% Done
                </Body1>
                <div className="titles-wrapper">
                  <Subtitle1 className="font-title" tag="h2">Merriweather v.2.11</Subtitle1>
                  <Subtitle1 className="project-title" tag="h3"><span className="emphasis">Extended Latin Support</span> v.1.12</Subtitle1>
                </div>
            </Grid>
            <Grid item xs={6} className="text-align-right">
              <Switch className="show-comments-switch" nativeControlId='show-comments-switch' checked={this.state.showComments} onChange={(e) => this.setState({showComments: e.target.showComments})} />
              <Body2 tag="label" htmlFor='show-comments-switch' className="show-comments-switch-label">Show comments</Body2>
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
      openSignup: false,
      textFieldSignupValue: ""
    };
  }
  handleSignupOpen = () => {
    this.setState({ openSignup: true});
  }
  handleSignupClose = () => {
    this.setState({ openSignup: false});
    this.setState({ textFieldSignupValue: "" });
  }
  render() {
    return (
      // <TopAppBar className="header">
      <AppBar color="inherit" className="header">
        <Container maxWidth={false}>
          <TopAppBarRow className="header-row-1">
            <Grid container className="header-grid-1">
              <Grid item xs={6}>
                <Link href="/">
                  <a>
                    <Typography variant="h5" className="logo" style={{fontWeight:700}}>EQX</Typography>
                  </a>
                </Link>
              </Grid>
              <Grid item xs={6}>
                {this.props.auth ? (	
                  <>
                    <div className="sidebar-align">
                      <IconButton className="header-notifications">
                        <MaterialIcon icon='notifications' />
                      </IconButton>
                      {/* <IconButton className="header-notifications header-avatar">
                        <MaterialIcon icon='avatar' />
                      </IconButton> */}
                      <Avatar/>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sidebar-align text-align-right">
                      <Button color="primary" className="sign-in-button" onClick={() => console.log("clicked login!")}>Login</Button>
                      <Button variant="contained" color="primary" className="sign-up-button" onClick={this.handleSignupOpen}>Sign Up</Button>
                    </div>

                    <Dialog open={this.state.openSignup} onClose={this.handleSignupClose}>
                      <SignUp/>
                      {/* <DialogTitle id="form-dialog-title">New Test</DialogTitle> */}
                      {/* <DialogContent>
                        <DialogContentText>Tests should be built around verifing a specific goal.</DialogContentText>
                        <TextField value={this.state.textFieldSignupValue} onChange={this.handleSignupChange} autoFocus margin="dense" id="name" label="Test's Name" type="text" fullWidth />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleSignupClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSignupSubmit} color="primary">Create</Button>
                      </DialogActions> */}
                    </Dialog>
                  </>
                )}
              </Grid>
            </Grid>
          </TopAppBarRow>
          {this.props.headerType == "creating" ? <CreatingHeader/> : null}  
          {this.props.headerType == "answering" ? <AnsweringHeader progressBar={this.props.progressBar}/> : null}    
        </Container>
      </AppBar>
    );
  }
} 


export default Header;