import React from 'react';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';



class CreateQuestionFields extends React.Component {
  state = {
    questionValue: 'Does the middle dot on “Ŀ” align with  the center bar of “R”?',
    descriptionValue: 'Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita ruant itaque turbent, ut de voluptate ponit.'
  };

  render() {
    return (
      <div class="create-question-fields">
        <TextField
          className="field"
          label='Question #9'
          textarea  
        >
          <Input
            className="question-field-input"
            value={this.state.questionValue}
            onChange={(e) => this.setState({questionValue: e.currentTarget.value})} />
        </TextField>
        <TextField
          className="field"
          label='Description'
          textarea  
        >
          <Input
            value={this.state.descriptionValue}
            onChange={(e) => this.setState({descriptionValue: e.currentTarget.value})} />
        </TextField>
      </div>
    );
  }
}

export default CreateQuestionFields;