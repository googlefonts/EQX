import Link from "next/link"
import Button from "@material/react-button";
import {Body1} from "@material/react-typography";
import Drawer, {
  DrawerHeader,
  DrawerSubtitle,
  DrawerTitle,
  DrawerContent,
} from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';

import "../styles/main.scss"

// Unfinished, just sample shows where to place items
const Nav = () => (
  <Drawer className="nav-drawer">
    {/*<DrawerHeader>
      <DrawerTitle tag='h2'>
        Menu
      </DrawerTitle>
    </DrawerHeader>*/}

    <DrawerContent >
      <List>
        <Link href="/dashboard">
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='dashboard'/>} />
            <ListItemText primaryText='Dashboard'/>
          </ListItem>
        </Link>
        <Link href="/tests">
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='note'/>} />
            <ListItemText primaryText='Your Tests'/>
          </ListItem>
        </Link>
        <Link href="/shared-tests">
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
            <ListItemText primaryText='Shared Tests'/>
          </ListItem>
        </Link>
        <Link href="/projects">
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='work'/>} />
            <ListItemText primaryText='Projects'/>
          </ListItem>
        </Link>
        <Link href="/groups">
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='group'/>} />
            <ListItemText primaryText='Groups'/>
          </ListItem>
        </Link>
        <Link href="/settings">
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='settings'/>} />
            <ListItemText primaryText='Settings'/>
          </ListItem>
        </Link>
      </List>
    </DrawerContent>
  </Drawer>
);

export default Nav;