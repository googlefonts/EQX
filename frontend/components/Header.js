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

import "../styles/main.scss"

const Header = () => (
  <TopAppBar className="header">
    <TopAppBarRow>
      <TopAppBarSection align='start'>
        <TopAppBarTitle>
          <Headline5 className="mdc-typography--black" tag="h1">EQX</Headline5>
        </TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection align='end'>
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
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
);

export default Header;