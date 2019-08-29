import Link from "next/link"
import Button from "@material/react-button";
import {Headline5, Body1, Subtitle1} from "@material/react-typography";
import TopAppBar, {
  TopAppBarFixedAdjust, 
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';

import "../styles/main.scss"

const CreatingHeader = props => (
  <TopAppBarRow className="header-row-2">
    <Grid className="header-grid-2">
      <Row>
        <Cell columns={12} >
          {/*<TopAppBarSection className="">*/}
            <Body1 className="question-counter" tag="h2">9 Questions</Body1>
            <div className="titles-wrapper">
              <Subtitle1 className="font-title" tag="h2">Merriweather v.2.11</Subtitle1>
              <Subtitle1 className="project-title" tag="h3"><span className="emphasis">Extended Latin Support</span> v.1.12</Subtitle1>
            </div>
          {/*</TopAppBarSection>*/}
        </Cell>
      </Row>
    </Grid>
  </TopAppBarRow>
);

const AnsweringHeader = props => (
  <TopAppBarRow className="header-row-2">
    <Grid className="header-grid-2">
      <Row>
        <Cell columns={12} >
          {/*<TopAppBarSection className="">*/}
            <Body1 className="question-counter" tag="h2">8 Questions</Body1>
            <div className="titles-wrapper">
              <Subtitle1 className="font-title" tag="h2">Merriweather v.2.11</Subtitle1>
              <Subtitle1 className="project-title" tag="h3"><span className="emphasis">Extended Latin Support</span> v.1.12</Subtitle1>
            </div>
          {/*</TopAppBarSection>*/}
        </Cell>
      </Row>
    </Grid>
  </TopAppBarRow>
);

const Header = props => (
  <TopAppBar className="header">
    <TopAppBarRow className="header-row-1">
      <Grid className="header-grid-1">
        <Row>
          <Cell columns={6}>
            <Link href="/">
              <a>
                <Headline5 className="mdc-typography--black" tag="h1">EQX</Headline5>
              </a>
            </Link>
          </Cell>
          { /*<TopAppBarSection align='end'>
            <Button
              href="login"
              className="login-button mdc-typography--body1"
              onClick={() => console.log("clicked!")}
            >
              Login
            </Button>
            <Button
              raised
              href="signup"
              className="sign-up-button"
              onClick={() => console.log("clicked!")}
            >
              Sign Up
            </Button>
          </TopAppBarSection>*/ }
          <Cell columns={6} className="text-align-right">
            <IconButton className="header-notifications">
              <MaterialIcon icon='notifications' />
            </IconButton>
            <IconButton className="header-notifications my-avatar">
              <MaterialIcon icon='avatar' />
            </IconButton>
          </Cell>
        </Row>
      </Grid>
    </TopAppBarRow>
    {props.headerType == "creating" ? <CreatingHeader/> : null}  
    {props.headerType == "answering" ? <AnsweringHeader/> : null}    
  </TopAppBar>
);

export default Header;