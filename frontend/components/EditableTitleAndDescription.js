import React from "react";
import { Typography, TextField, Box, Icon } from '@material-ui/core';
import Cookies from "js-cookie";
import axios from 'axios';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';


//////////////////////////////
// Flexible Textfield

class EditableTitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item1Opacity: 0,
      item1Events: "none",
      item2Opacity: 1,
      width: 0,
      nameValue: "",
      descValue: "",
      icon: "edit",
      widthChanges: 0,
    };
    this.widthTarget = React.createRef();
    this.inputElement = React.createRef();
  }

  componentDidUpdate(nextProps) {
    const { nameValue, descValue} = this.props
    if (nextProps.nameValue !== nameValue || nextProps.descValue !== descValue ) {
      this.setState({
        nameValue: this.props.nameValue,
        descValue: this.props.descValue,
      });
    }
    if ( this.state.width !== this.widthTarget.current.offsetWidth ) {
      this.setState({
        width: this.widthTarget.current.offsetWidth,
        widthChanges: this.state.widthChanges + 1
      });
    }
  }

  nameFieldChange = (e) => {
		this.setState({
      nameValue: e,
      width: this.widthTarget.current.offsetWidth
    });
  }

  descFieldChange = (e) => {
		this.setState({
      descValue: e
    });
  }

  toggle = () => {
    if (this.state.item1Opacity == 0){
      this.setState({
        item1Opacity: 1,
        item1Events: "initial",
        item2Opacity: 0,
        icon: "check_circle",
      });
      this.inputElement.current.select()
    } else {
      if (this.state.nameValue !== ""){
        this.setState({
          item1Opacity: 0,
          item1Events: "none",
          item2Opacity: 1,
          icon: "edit",
        });
        axios
          .put(apiUrl + '/' + this.props.type + 's/' + this.props.item.id, {
            name: this.state.nameValue.replace(/\s\s+/g, ' ').trim(),
            description: this.state.descValue ? this.state.descValue.replace(/\s\s+/g, ' ').trim() : ""
          }, {
            headers: { Authorization: 'Bearer ' + Cookies.get("jwt") }
          }).catch(err => { console.log(err); // Handle error
          }).then(response => { // Handle success

          });
      }
    }
  }

  render() {
    return (
      <>
        <Box pb={1}>
          <Typography style={{position: "relative"}} variant="h4">
            <TextField 
              multiline
              onChange={e => {this.nameFieldChange(e.currentTarget.value)}}
              value={this.state.nameValue ? this.state.nameValue : ""} 
              type="text" 
              label={this.props.label} 
              style={{ letterSpacing: 0, maxWidth: "100%" }}
              InputProps={{ 
                style: { fontSize: "inherit", paddingTop: "5px" },
                disableUnderline: this.state.item1Opacity ? false : true,
              }} 
              inputProps={{ 
                ref: this.inputElement, 
                style: { minWidth: "20px", display: "inline-block", width: ( this.state.width + 10 ) + "px" } 
              }}
            />
            <Box 
              style={{ pointerEvents: "none", minWidth: "20px", display: "inline-block", top: 0, left: 0, letterSpacing: 0, opacity: 0, position: "absolute", maxWidth: "100%" }} 
              ref={this.widthTarget} 
              component="span"
            >{this.state.nameValue}</Box>
            {/* <Box style={{ minWidth: "20px", display: "inline-block", letterSpacing: 0, opacity: this.state.item2Opacity }} ref={this.widthTarget} component="span">{this.state.nameValue}</Box> */}
            <Box component="span" color="grey.400"> v.{this.props.item.major_version}.{this.props.item.minor_version}</Box>
            <Icon fontSize="inherit" onClick={this.toggle} className="edit-event" color="primary">&nbsp; {this.state.icon}</Icon>
          </Typography>
        </Box>
        {( this.state.descValue || this.state.item1Opacity ) ?  
          <Box pb={1}>
            <Typography component="div" style={{ position: "relative" }} variant="body2">
              <TextField 
                fullWidth
                multiline
                placeholder="Optional description."
                onChange={e => {this.descFieldChange(e.currentTarget.value)}}
                value={this.state.descValue ? this.state.descValue : ""} 
                type="text" 
                label={this.props.label} 
                InputProps={{ 
                  style: { fontSize: "inherit", paddingTop: "5px" },
                  disableUnderline: this.state.item1Opacity ? false : true,
                }} 
              />
            </Typography>
          </Box>
        : "" }
      </>
    );
  }
}
export default EditableTitle;