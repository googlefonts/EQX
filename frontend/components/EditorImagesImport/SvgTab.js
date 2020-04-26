import MaterialIcon from '@material/react-material-icon';
import {Button } from '@material/react-typography';
import axios from 'axios';
const apiUrl = process.env.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";

class SvgTab extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: "",
    };
  }

	loadFile(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", e.target.files[0]);

    axios
      .post(apiUrl+'/upload', formData, { 
        headers: { 
          'Authorization': 'Bearer ' + Cookies.get("jwt"),
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => { 
      var output = document.getElementById('output-image');
      output.src = apiUrl+response.data[0].url
    })
    .catch(error => { 
      console.log(error); 
    });
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