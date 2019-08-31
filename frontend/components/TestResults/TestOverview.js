import { Headline4, Body1, Body2} from '@material/react-typography';
import {Cell, Grid, Row} from '@material/react-layout-grid';

const TestOverview = props => (
	<Grid className="test-overview">
		<Row>
			<Cell desktopColumns={9}>
				<Body1 className="project-title">Merriweather Extension v.2.11</Body1>
				<Headline4 className="test-title" tag="h1">Extended Latin Support <span>v.1.12</span></Headline4>
        <ul className="action-list">
          <li><Body2>Answers</Body2></li>
          <li><Body2>Comments</Body2></li>
          <li><Body2>Archive</Body2></li>
          <li><Body2>Remind</Body2></li>
          <li><Body2>Share</Body2></li>
        </ul>
			</Cell>
			<Cell desktopColumns={3}>
				{/* grade circle tbd */}
			</Cell>
		</Row>
	</Grid>
);

export default TestOverview;