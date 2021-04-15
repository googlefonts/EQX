import React from "react";
import { CircularProgress, Typography, Box} from '@material-ui/core';

//////////////////////////////
// Radial Grade

class RadialGrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Box p={0} align="right" className="radial-grade-small" style={{opacity: this.props.grade === "?" ? "0.2" : "1"}}>
        <CircularProgress className="radial-background" variant="determinate" color="inherit" size={60} thickness={6} value={100} />
        <CircularProgress variant="determinate" color="inherit" size={60} thickness={6} value={this.props.grade !== "?" ? this.props.grade : 0} />
        <Box className="radial-info" align="center">
          <Typography className="radial-info-grade" variant="h6">{this.props.grade}</Typography>
        </Box>
      </Box>
    );
  }
}
export default RadialGrade;