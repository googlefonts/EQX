import MaterialIcon from '@material/react-material-icon';
import {Button , Body1} from '@material/react-typography';
import FontImportSelect from '../FontImportSelect';

// Import Tab
const tagList = ['H1', 'H2', 'H3','H4','H5','H6', 'P'];

const ImportTab = props => (
  <div className="import-tab">
    <div className="column import-html">
        <input type="file" name="import-html-upload" id="import-html-upload"/>
        <label htmlFor="import-html-upload" className="import-html-upload-label"><MaterialIcon className="paperclip-icon" icon='attach_file' /><Button>Attach your HTML</Button></label>
      </div>
      <div className="column import-css">
        <input type="file" name="import-css-upload" id="import-css-upload"/>
        <label htmlFor="import-css-upload" className="import-css-upload-label"><MaterialIcon className="paperclip-icon" icon='attach_file' /><Button>Attach your CSS</Button></label>
      </div>
    <div className="column import-fonts">
      <ul>
        {tagList.map((tag, index) => (
          <li class="tag-list-item" key={index}>
            <Body1 className="tag-title mdc-typography--bold">{tag}</Body1>
            <FontImportSelect/>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default ImportTab;