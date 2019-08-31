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
        <Link href="/dashboard"><a>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='dashboard'/>} />
            <ListItemText primaryText='Dashboard'/>
          </ListItem>
        </a></Link>
        <Link href="/tests"><a>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='note'/>} />
            <ListItemText primaryText='Your Tests'/>
          </ListItem>
        </a></Link>
        <Link href="/shared-tests"><a>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
            <ListItemText primaryText='Shared Tests'/>
          </ListItem>
        </a></Link>
        <Link href="/projects"><a>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='work'/>} />
            <ListItemText primaryText='Projects'/>
          </ListItem>
        </a></Link>
        <Link href="/groups"><a>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='group'/>} />
            <ListItemText primaryText='Groups'/>
          </ListItem>
        </a></Link>
        <Link href="/settings"><a>
          <ListItem>
            <ListItemGraphic graphic={<MaterialIcon icon='settings'/>} />
            <ListItemText primaryText='Settings'/>
          </ListItem>
        </a></Link>
      </List>
    </DrawerContent>
  </Drawer>
);

export default Nav;