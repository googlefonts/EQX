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
    <DrawerHeader>
      <DrawerTitle tag='h2'>
        Menu
      </DrawerTitle>
    </DrawerHeader>

    <DrawerContent >
      <List>
        <ListItem>
          <ListItemGraphic graphic={<MaterialIcon icon='dashboard'/>} />
          <ListItemText primaryText='Nav Item'/>
        </ListItem>
        <ListItem>
        <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
          <ListItemText primaryText='Nav Item'/>
        </ListItem>
        <ListItem>
          <ListItemGraphic graphic={<MaterialIcon icon='folder_shared'/>} />
          <ListItemText primaryText='Nav Item'/>
        </ListItem>
        <ListItem>
          <ListItemGraphic graphic={<MaterialIcon icon='create_new_folder'/>} />
          <ListItemText primaryText='Nav Item'/>
        </ListItem>
        <ListItem>
          <ListItemGraphic graphic={<MaterialIcon icon='group'/>} />
          <ListItemText primaryText='Nav Item'/>
        </ListItem>
        <ListItem>
        <ListItemGraphic graphic={<MaterialIcon icon='settings'/>} />
          <ListItemText primaryText='Nav Item'/>
        </ListItem>
      </List>
    </DrawerContent>
  </Drawer>
);

export default Nav;