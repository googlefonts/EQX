import MaterialIcon from '@material/react-material-icon';
import { Button } from '@material/react-typography';
import axios from 'axios';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";

class UploadTab extends React.Component {
  constructor() {
    super()
    this.state = {
      imageData: {}
    };
  }

  componentDidMount = () => {
    this.update();
  }

	componentDidUpdate(nextProps) {
		if (nextProps.test.questions[Number(nextProps.questionNumber - 1)].uploaded_image !== this.props.test.questions[Number(this.props.questionNumber - 1)].uploaded_image) {
			this.update();
		}
  }
  
  pageUpdate = () => {
    this.update();
  }

  update = () => {
    this.setState({ imageData: this.props.test.questions[Number(this.props.questionNumber - 1)].uploaded_image });
  }

  uploadFile = (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    axios
      .post(apiUrl + '/upload', formData, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("jwt")
        }
      })
      .then(response => {
        var image = response.data[0];
        this.setState({ imageData: image });
        axios
          .put('http://localhost:1337/questions/' + this.props.test.questions[Number(this.props.questionNumber - 1)].id, {
            uploaded_image: image
          }, { headers: { Authorization: 'Bearer ' + Cookies.get("jwt") } 
          }).catch(error => { console.log(error); // Handle Error
          }).then(response => { // Handle success
            console.log(response)
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="images-tab">
        <input type="file" name="images-tab-upload" id="images-tab-upload" accept="image/*" onChange={this.uploadFile} />
        <label htmlFor="images-tab-upload" className="images-tab-upload-label">
          <div className="icon-wrap">
            <MaterialIcon className="paperclip-icon" icon='attach_file' />
            <Button>Upload your image here</Button>
          </div>
          <img id="output-image" src={this.state.imageData ? apiUrl + this.state.imageData.url : ""} />
        </label>
      </div>
    );
  }
}

export default UploadTab;