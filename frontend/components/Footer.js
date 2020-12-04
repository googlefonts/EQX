import Link from "next/link";
import { Container, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Unfinished, just sample shows where to place items
const Footer = () => (
  <footer>
    <Container maxWidth={false}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="logo" display="inline" style={{fontWeight:700}}>EQX</Typography>
          <ul style={{display: 'inline-flex'}}>
            <li>
              <Typography variant="body1" gutterBottom><Link href="#"><a>Privacy</a></Link></Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom><Link href="#"><a>Terms</a></Link></Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom><Link href="#"><a>Contact</a></Link></Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom><Link href="#"><a>Developers</a></Link></Typography>
            </li>
            <li>
              <Typography variant="body1" gutterBottom><Link href="#"><a>About</a></Link></Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Container>
  </footer>
);

export default Footer;