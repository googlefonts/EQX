import MaterialIcon from '@material/react-material-icon';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import { Headline4, Body1, Body2 } from '@material/react-typography';
import Fab from '@material/react-fab'
import Button from '@material/react-button';
import List, {ListItem, ListItemText, ListItemGraphic, ListItemMeta} from '@material/react-list';
import TextField, {Input} from '@material/react-text-field';

import CommentBox from '../components/CommentBox';

import "../styles/main.scss"

const QuinnAvi = props => (
  <img src="static/img/quinn-avi.png" alt="avatar"/>
);

const EbenAvi = props => (
  <img src="static/img/eben-avi.jpeg" alt="avatar"/>
);

class AnswerQuestionFields extends React.Component {

  state = {
    lightboxOpen: false,
    questionNumber: '9',
    questionValue: 'Is it easy to find the italic parts in the sample?',
    descriptionValue: 'Note: In Merriweather Display we want it to be easy to detect the italics. But we want this to be the result of textural difference and not because of a difference in apparent weight or greyness in text.',
  };

  closeLightbox = () => {
    this.setState({lightboxOpen:false})
  };

  openLightbox = () => {
    this.setState({lightboxOpen:true})
  };

  render() {
    return (
      <div>
        <Grid>
          <Row className="answer-question-fields">
            <Cell desktopColumns={2}></Cell>
            <Cell columns={8}>
              <Body1 className="question-number">Question #{this.state.questionNumber}</Body1>
              <Headline4 tag="h1" className="question">{this.state.questionValue}</Headline4>
              <Body1>{this.state.descriptionValue}</Body1>
            </Cell>
          </Row>
        </Grid>
        <div className="answer-question-images-comments">
          <div className="column">
            <div className="question-image-wrapper">
              <img className="question-image" src="static/img/type-example.png" alt=""/>
              <Fab 
                className="question-image-fab" 
                icon={<MaterialIcon icon="fullscreen"/>}
                onClick={this.openLightbox} />
            </div>
            {/*<Button className="next" raised icon={<MaterialIcon icon="arrow_forward"/>}>Next Question</Button>*/}

          </div>
          <div className="answer-comments-wrapper column">
            <Body1 className="your-answer">Your answer</Body1>
            <Button className="yes" outlined>Yes</Button>
            <Button className="no" outlined>No</Button>
            <Button className="next" raised icon={<MaterialIcon icon="arrow_forward"/>}>Next Question</Button>
            <CommentBox size="small"/>
          </div>
        </div>
        <div 
          className={`lightbox ${this.state.lightboxOpen ? 'open' : null }`}
          onClick={this.closeLightbox}
          >
          <Grid>
            <Row>
              <Cell desktopColumns={1}></Cell>
              <Cell desktopColumns={10}>
                  <img className="lightbox-image" src="static/img/type-example.png" alt=""/>
                  <CommentBox/>
              </Cell>
            </Row>
          </Grid>
        </div>
      </div>

    );
  }
}

export default AnswerQuestionFields;