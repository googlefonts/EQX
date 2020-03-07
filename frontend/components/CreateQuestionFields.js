import React from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';


class CreateQuestionFields extends React.Component {
  state = {
    questionValue: '',
    descriptionValue: ''
  };
  /*
  state = {
    questionValue: 'Does the middle dot on “Ŀ” align with  the center bar of “R”?',
    descriptionValue: 'Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit.'
  };
  */

  render() {
    return (
      <Grid className="create-question-fields">
        <Row>
          <Cell desktopColumns={2}></Cell>
          <Cell desktopColumns={8}>
            <TextField
              className="field"
              label='Question #1'
              textarea  
            >
              <Input
                className="question-field-input"
                value={this.state.questionValue}
                onChange={(e) => this.setState({questionValue: e.currentTarget.value})} />
            </TextField>
          </Cell>
        </Row>
        <Row>
          <Cell desktopColumns={2}></Cell>
          <Cell desktopColumns={8}>
            <TextField
              className="field"
              label='Description'
              textarea  
            >
              <Input
                value={this.state.descriptionValue}
                onChange={(e) => this.setState({descriptionValue: e.currentTarget.value})} />
            </TextField>
          </Cell>
        </Row>
      </Grid>
    );
  }
}

export default CreateQuestionFields;