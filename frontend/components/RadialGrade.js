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
      <Box p={1} align="right" className="radial-grade">
        <CircularProgress className="radial-background" variant="determinate" size={120} thickness={6} value={100} />
        <CircularProgress variant="determinate" size={120} thickness={6} value={this.props.grade} />
        <Box className="radial-info" align="center" >
          <Typography className="radial-info-grade" color="primary" variant="h4">{this.props.grade}</Typography>
          <Typography className="radial-info-label" color="primary" variant="body2">Grade</Typography>
        </Box>
      </Box>
    );
  }
}
export default RadialGrade;