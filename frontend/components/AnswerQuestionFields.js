import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline4, Body1, Body2 } from '@material/react-typography';

import "../styles/main.scss"

class AnswerQuestionFields extends React.Component {
  state = {
    questionNumber: '9',
    questionValue: 'Does the middle dot on “Ŀ” align with  the center bar of “R”?',
    descriptionValue: 'Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit.'
  };

  render() {
    return (

      <Grid>
        <Row>
          <Cell desktopColumns={2}></Cell>
          <Cell columns={8} className="answer-question-fields">
            <Body1 className="question-number">Question #{this.state.questionNumber}</Body1>
            <Headline4 tag="h1" className="question">{this.state.questionValue}</Headline4>
            <Body1>{this.state.descriptionValue}</Body1>
          </Cell>
        </Row>
      </Grid>

    );
  }
}

export default AnswerQuestionFields;