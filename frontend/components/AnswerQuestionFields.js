import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline4, Body2 } from '@material/react-typography';

import "../styles/main.scss"

class AnswerQuestionFields extends React.Component {
  state = {
    questionValue: 'Does the middle dot on “Ŀ” align with  the center bar of “R”?',
    descriptionValue: 'Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit.'
  };

  render() {
    return (

      <Grid>
        <Row>
          <Cell columns={12} className="answer-question-fields">
            <Headline4>{this.state.questionValue}</Headline4>
            <Body2>{this.state.descriptionValue}</Body2>
          </Cell>
        </Row>
      </Grid>

    );
  }
}

export default AnswerQuestionFields;