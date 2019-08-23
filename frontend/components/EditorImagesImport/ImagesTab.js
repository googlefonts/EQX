import MaterialIcon from '@material/react-material-icon';
import {Button } from '@material/react-typography';

// Images Tab
const ImagesTab = props => (
  <div className="images-tab">
    <input type="file" name="images-tab-upload" id="images-tab-upload" accept="image/png, image/jpeg"/>
    <label htmlFor="images-tab-upload" className="images-tab-upload-label"><MaterialIcon className="paperclip-icon" icon='attach_file' /><Button>Attach your images here</Button></label>
  </div>
)

export default ImagesTab;