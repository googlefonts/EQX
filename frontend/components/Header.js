import Link from "next/link"
import Button from "@material/react-button";
import {Headline5} from "@material/react-typography";
import TopAppBar, {
  TopAppBarFixedAdjust, 
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

import "../styles/main.scss"


const Header = () => (
  <TopAppBar className="header">
    <TopAppBarRow>
      <TopAppBarSection align='start'>
        <TopAppBarTitle>
          <Headline5 className="mdc-typography--black" tag="h1">EQX</Headline5>
        </TopAppBarTitle>
      </TopAppBarSection>
      {/*<TopAppBarSection align='end'>
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
            </TopAppBarSection>*/}
      <TopAppBarSection align='end'>
        <IconButton className="header-notifications">
          <MaterialIcon icon='notifications' />
        </IconButton>
        {/* Placeholder for avatar */}
        <div className="header-avatar"></div>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
);

export default Header;