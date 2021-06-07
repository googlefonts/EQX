import Link from "next/link";
import { Container, Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Unfinished, just sample shows where to place items
const Footer = () => (
  <Box displayPrint="none">
  <footer>
      <Container maxWidth={false}>
        <Grid container>
          <Grid item xs={12}>
            {/* <Typography variant="h5" className="logo" display="inline" style={{fontWeight:700}}>EQX</Typography> */}
            <ul style={{display: 'inline-flex', padding: "0"}}>
              <li>
                <Typography variant="body1" gutterBottom><Link href="https://github.com/SorkinType/EQX"><a>GitHub Repository</a></Link></Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom><Link href="https://github.com/quitequinn/EQX-Visual-Generator"><a>EQX Visual Generator</a></Link></Typography>
              </li>
              <li>
                <Typography variant="body1" gutterBottom><Link href="https://github.com/SorkinType/EQX/blob/master/LICENSE"><a>Apache License 2.0</a></Link></Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Container>
  </footer>
  </Box>
);

export default Footer;