import MaterialIcon from '@material/react-material-icon';
import {Button } from '@material/react-typography';

class SvgTab extends React.Component {

	loadFile(event) {
		console.log("run loadfile");
	  var output = document.getElementById('output-image');
	  output.src = URL.createObjectURL(event.target.files[0]);
	};
	
	render() {
		return(
		  <div className="images-tab">
		    <input type="file" name="images-tab-upload" id="images-tab-upload" accept="image/*" onChange={this.loadFile}/>
		    <label htmlFor="images-tab-upload" className="images-tab-upload-label">
		    	<div className="circle">
		    		<MaterialIcon className="paperclip-icon" icon='attach_file' />
		    		<Button>Upload your SVG here</Button>
		    	</div>
		    	<img id="output-image"/>
		    </label>
		  </div>
		);
	}
}

export default SvgTab;