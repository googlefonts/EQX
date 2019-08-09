import Link from "next/link"
import Button from "@material/react-button";
import {Body1} from "@material/react-typography";
import Drawer, {
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
} from '@material/react-drawer';

import "../styles/main.scss"

// Unfinished, just sample shows where to place items
const Nav = () => (
  <Drawer>
    <DrawerHeader> {/*defaults to div*/}
      <DrawerTitle tag='h2'> {/*defaults to h3*/}
        Drawer title
      </DrawerTitle>
      <DrawerSubtitle> {/*defaults to h6*/}
        drawer subtitle
      </DrawerSubtitle>
    </DrawerHeader>

    <DrawerContent >
      {/* Nav list items here */}
    </DrawerContent>
  </Drawer>
);

export default Nav;