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
  <TopAppBar className="top-bar">
    <TopAppBarRow>
      <TopAppBarSection align='start'>
        <TopAppBarTitle>EQX</TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection align='end'>
        <Button
          href="login"
          className="button-alternate"
          onClick={() => console.log("clicked!")}
        >
          Login
        </Button>
        <Button
          raised
          href="signup"
          className="button-alternate"
          onClick={() => console.log("clicked!")}
        >
          Sign Up
        </Button>
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
);

export default Header;