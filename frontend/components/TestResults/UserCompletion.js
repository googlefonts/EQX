import {Headline5, Body2} from '@material/react-typography';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import LinearProgress from '@material/react-linear-progress';

const UserCompletion = props => (
  <Grid className="user-completion">
    <Row>
      <Cell desktopColumns={9}>
        <LinearProgress
          className="user-completion-progress-bar"
          progress={0.82}
          buffer={1}
          bufferingDots={false}
        />
      </Cell>
      <Cell desktopColumns={3}>
        <Headline5 className="user-completion-percentage mdc-typography--medium">82% Complete</Headline5>
      </Cell>
    </Row>
    <Row>
      <Cell desktopColumns={12}>
        <Body2 className="user-completion-fraction">Completed by 4 of 5 users</Body2>
      </Cell>
    </Row>
  </Grid>
);

export default UserCompletion; 