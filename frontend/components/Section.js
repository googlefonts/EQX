
import React from "react";
import { Box, Container, Grid } from '@material-ui/core';

class Section extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
     };
   }
 
   render() {
      return (
         <Box bgcolor={this.props.bgcolor ? this.props.bgcolor : "background.paper"} pt={6} pb={9}>
            <Container maxWidth={false}>
               <Grid container alignContent="center">
                  <Grid item xs={12}>
                     {this.props.children}
                  </Grid>
               </Grid>
            </Container>
         </Box>
      );
   }
}

export default Section;
