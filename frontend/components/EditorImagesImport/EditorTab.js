import {MDCSlider} from '@material/slider';
import FontImportSelect from '../FontImportSelect';
import {Caption} from '@material/react-typography';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

// const slider = new MDCSlider(document.querySelector('.mdc-slider'));
// slider.listen('MDCSlider:change', () => console.log(`Value changed to ${slider.value}`));

class EditorTab extends React.Component {

	render() {

		return(
		  <div className="editor-tab">
		    <div className="editor-side-bar">
		    	<FontImportSelect/>
	    		<div className="sliders-wrapper">
	    			<Caption className="slider-name">SliderName</Caption>
			    	{/* Non-react slider, currently not functional */}
			    	<div className="mdc-slider" tabIndex="0" role="slider"
					     aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"
					     aria-label="Select Value">
					  	<div className="mdc-slider__track-container">
					    	<div className="mdc-slider__track"></div>
					  	</div>
					  	<div className="mdc-slider__thumb-container">
						    <svg className="mdc-slider__thumb" width="21" height="21">
						      <circle cx="10.5" cy="10.5" r="7.875"></circle>
						    </svg>
					    	<div className="mdc-slider__focus-ring"></div>
					    </div>
					  </div>
					</div>
				</div>
				<div className="editor-main">
					<div className="editor-toolbar">
						<IconButton>
			        <MaterialIcon icon='format_color_fill' />
			      </IconButton>
						<IconButton>
			        <MaterialIcon icon='format_color_text' />
			      </IconButton>
						<IconButton>
			        <MaterialIcon icon='3d_rotation' />
			      </IconButton>
			      <IconButton>
			        <MaterialIcon icon='refresh' />
			      </IconButton>
					</div>
				</div>
		  </div>
		);
	}

}

export default EditorTab;