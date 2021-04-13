import React from 'react';
import {IconButton, MenuItem, Menu, Container, Grid, Button, Typography, TextField, DialogActions, DialogContent, Dialog, DialogTitle, DialogContentText } from '@material-ui/core';

// import IconButton from '@material/react-icon-button';
// import MaterialIcon from '@material/react-material-icon';
import { unsetToken, checkAuth } from "../../lib/auth";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
      <IconButton style={{marginTop: "5px"}} onClick={handleClick}>
        <AccountCircleIcon style={{fontSize: "26px"}}/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{zIndex:9999}}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem> */}
        <MenuItem onClick={unsetToken}>Logout</MenuItem>
      </Menu>
    </>
  );
}