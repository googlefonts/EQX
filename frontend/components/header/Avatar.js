import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import { unsetToken, checkAuth } from "../../lib/auth";

export default function Avatar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton className="header-notifications header-avatar" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MaterialIcon icon='avatar' />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={unsetToken}>Logout</MenuItem>
      </Menu>
    </>
  );
}