// import {MDCSlider} from '@material/slider';
import { Slider } from '@rmwc/slider';
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
		    			<Caption className="slider-name">Font Size</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
		    		<div className="sliders-wrapper">
		    			<Caption className="slider-name">Letter Space</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
		    		<div className="sliders-wrapper">
		    			<Caption className="slider-name">Line Height</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
		    		<div className="sliders-wrapper">
		    			<Caption className="slider-name">Blur</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
		    		<div className="sliders-wrapper">
		    			<Caption className="slider-name">Opacity</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
		    		<div className="sliders-wrapper">
		    			<Caption className="slider-name">Perspective</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
		    		<div className="sliders-wrapper">
		    			<Caption className="slider-name">Test</Caption>
				    	<Slider discrete min={0} max={100} step={1} />
					</div>
				</div>
				<div className="editor-main">
					<div id="editor-content" className="editor-content">
						<div className='item item-1'>Aa</div>
					</div>
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
				{/* <script
					src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
					integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="
					crossOrigin="anonymous"></script>
				<script src="static/js/editor.js"></script> */}
		  	</div>
		);
	}

}

export default EditorTab;