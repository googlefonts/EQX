import React from "react";
import { TextField, Box, Icon } from '@material-ui/core';
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
      value: "",
      icon: "edit",
    };
    this.widthTarget = React.createRef();
    this.inputElement = React.createRef();
  }
  componentDidUpdate(nextProps) {
    const { value } = this.props
    if (nextProps.value !== value ) {
      this.setState({value: this.props.value});
    }
    if ( this.state.width !== this.widthTarget.current.offsetWidth) {
      this.setState({width: this.widthTarget.current.offsetWidth});
    }
  }
  textFieldChange = (e) => {
		this.setState({
      value: e,
      width: this.widthTarget.current.offsetWidth
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
      if (this.state.value !== ""){
        this.setState({
          item1Opacity: 0,
          item1Events: "none",
          item2Opacity: 1,
          icon: "edit",
        });
        axios
          .put(apiUrl + '/' + this.props.type + 's/' + this.props.item.id, {
            name: this.state.value
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
        <TextField 
          onChange={e => {this.textFieldChange(e.currentTarget.value)}}
          value={this.state.value} 
          type="text" 
          label={this.props.label} 
          style={{ letterSpacing: 0, opacity: this.state.item1Opacity, pointerEvents: this.state.item1Events, zIndex: 2, position: "absolute" }}
          InputProps={{ style: { fontSize: "inherit" } }} 
          inputProps={{ ref: this.inputElement, style: { minWidth: "20px", width: this.state.width+"px" } }} 
        />
        <Box style={{ minWidth: "20px", display: "inline-block", letterSpacing: 0, opacity: this.state.item2Opacity }} ref={this.widthTarget} component="span">{this.state.value}</Box>
        <Box component="span" color="grey.400"> v.{this.props.item.major_version}.{this.props.item.minor_version}</Box>
        <Icon fontSize="inherit" onClick={this.toggle} className="edit-event" color="primary">&nbsp; {this.state.icon}</Icon>
      </>
    );
  }
}
export default EditableTitle;