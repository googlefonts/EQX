import {Cell, Grid, Row} from '@material/react-layout-grid';
import CommentBox from '../components/CommentBox';

class Lightbox extends React.Component {

	state = {
    open: true,
  };

  hideLightbox = (e) => {
  	e.stopPropagation();
  	console.log(this);
  	this.setState({open:false})
	};

  render() {
    return (
      <div 
      	className={`lightbox ${this.state.open ? 'open' : null }`}
      	onClick={this.hideLightbox}
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

    );
  }
}

export default Lightbox;


