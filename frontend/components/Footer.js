import Link from "next/link"
import Button from "@material/react-button";
import {Headline5, Body1} from "@material/react-typography";

import "../styles/main.scss"

// Unfinished, just sample shows where to place items
const Footer = () => (
  <footer>
    <Headline5 className="mdc-typography--black" tag="h1">EQX</Headline5>
    <ul>
      <li>
        <Body1><Link href="#"><a>Privacy</a></Link></Body1>
      </li>
      <li>
        <Body1><Link href="#"><a>Terms</a></Link></Body1>
      </li>
      <li>
        <Body1><Link href="#"><a>Contact</a></Link></Body1>
      </li>
      <li>
        <Body1><Link href="#"><a>Developers</a></Link></Body1>
      </li>
      <li>
        <Body1><Link href="#"><a>About</a></Link></Body1>
      </li>
    </ul>
  </footer>
);

export default Footer;