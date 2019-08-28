import React from 'react';
import MaterialIcon from '@material/react-material-icon';
import { Body1, Body2 } from '@material/react-typography';
import Fab from '@material/react-fab'
import Button from '@material/react-button';
import List, {ListItem, ListItemText, ListItemGraphic, ListItemMeta} from '@material/react-list';
import TextField, {Input} from '@material/react-text-field';

import "../styles/main.scss"

const QuinnAvi = props => (
  <img src="static/quinn-avi.png" alt="avatar"/>
);

const EbenAvi = props => (
  <img src="static/eben-avi.jpeg" alt="avatar"/>
);

class CommentBox extends React.Component {
  state = {
    commentNumber: '1',
    numberOfComments: '5',
    commentValue: '',
  };

  render() {
    return (

      <div className={`comment-box ${this.props.size}`}>
        <div className="comment-box-header">
          <Body1 className="number">{this.state.commentNumber}</Body1>
          <div className="header-text">
            <Body1>{this.state.numberOfComments} comment{this.state.numberOfComments > 1 ? 's' : null}</Body1> 
            <Body1>Created 10/13/2019</Body1>
          </div>
        </div>
        <List twoLine className="comment-list">
          <ListItem>
            <ListItemGraphic graphic={<EbenAvi/>} />
            <ListItemText
              primaryText='Eben Sorkin'
              secondaryText='Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita.'
               />
            <ListItemMeta meta='5:30pm' />
          </ListItem>
          <ListItem>
            <ListItemGraphic graphic={<QuinnAvi/>} />
            <ListItemText
              primaryText='Quinn Keaveney'
              secondaryText='Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita.'
              />
            <ListItemMeta meta='5:37pm' />
          </ListItem>
          <ListItem>
            <ListItemGraphic graphic={<EbenAvi/>} />
            <ListItemText
              primaryText='Eben Sorkin'
              secondaryText='Certe, inquam, pertinax non numquam eius modi tempora incidunt, ut ita.'
               />
            <ListItemMeta meta='7:03pm' />
          </ListItem>
          <Fab className="comment-list-fab" icon={<MaterialIcon icon="expand_more"/>}/>
        </List>
        <div className="add-comment-wrapper">
          <TextField
            inputType='textarea'
            fullWidth
            label="Add a comment"
          >
            <Input
              placeholder="Add a comment"
              value={this.state.commentValue}
              onChange={(e) => this.setState({commentValue: e.currentTarget.value})} />
          </TextField>
        </div>
        <div className="post-cancel-wrapper">
          <Button raised className="post">Post</Button>
          <Button>Cancel</Button>
        </div>
      </div>

    );
  }
}

export default CommentBox;