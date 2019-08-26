import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline4, Body1, Body2 } from '@material/react-typography';
import Fab from '@material/react-fab'

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
        <Row className="answer-question-fields">
          <Cell desktopColumns={2}></Cell>
          <Cell columns={8}>
            <Body1 className="question-number">Question #{this.state.questionNumber}</Body1>
            <Headline4 tag="h1" className="question">{this.state.questionValue}</Headline4>
            <Body1>{this.state.descriptionValue}</Body1>
          </Cell>
        </Row>
        <Row className="answer-question-images-comments">
          <Cell desktopColumns={6} className="question-image-wrapper">
            <img className="question-image" src="static/type-example.png" alt=""/>
            <Fab className="question-image-fab" icon={<MaterialIcon icon="fullscreen"/>}/>
          </Cell>
          <Cell desktopColumns={6}>
            <Body1>Your answer</Body1>
          </Cell>
        </Row>
      </Grid>

    );
  }
}

export default AnswerQuestionFields;