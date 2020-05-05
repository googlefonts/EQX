import MaterialIcon from '@material/react-material-icon';
import { Button } from '@material/react-typography';
import axios from 'axios';
import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = publicRuntimeConfig.API_URL || 'http://localhost:1337';
import Cookies from "js-cookie";

class SvgTab extends React.Component {
  constructor() {
    super()
    this.state = {
      imageUrl: "",
    };
    this.loadFile = this.loadFile.bind(this)
  }

  loadFile(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", e.target.files[0]);

    axios
      .post(apiUrl + '/upload', formData, {
        headers: {
          'Authorization': 'Bearer ' + Cookies.get("jwt")
        }
      })
      .then(response => {
        if (response.data[0].url.includes("storage.googleapis.com")) {
          this.props.onImageUpload(response.data[0].url)
          return
        }
        this.props.onImageUpload(apiUrl + response.data[0].url)
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const hasImage = Boolean(this.props.imageUrl);
    return (
      <div className="images-tab">
        <input type="file" name="images-tab-upload" id="images-tab-upload" accept="image/*" onChange={this.loadFile} />
        <label htmlFor="images-tab-upload" className="images-tab-upload-label">
          {!hasImage && (
            <div className="circle">
              <MaterialIcon className="paperclip-icon" icon='attach_file' />
              <Button>Upload your image here</Button>
            </div>
          )}
          <img id="output-image" src={this.props.imageUrl} />
        </label>
      </div>
    );
  }
}

export default SvgTab;