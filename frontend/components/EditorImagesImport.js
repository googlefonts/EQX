import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';
import {
  Button
} from '@material/react-typography';

// Images Tab
const ImagesTab = props => (
  <div className="images-tab">
    <input type="file" name="images-tab-upload" id="images-tab-upload" accept="image/png, image/jpeg"/>
    <label for="images-tab-upload" className="images-tab-upload-label"><MaterialIcon className="paperclip-icon" icon='attachment' /><Button>Attach your images here</Button></label>
  </div>
)

// Editor Tab
const EditorTab = props => (
    <p>Editor tab</p>
)

// Import Tab
const ImportTab = props => (
    <p>Import tab</p>
)

class EditorImagesImport extends React.Component {
  state = {activeIndex: 1};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});

  render() {
    return (
      <div className="editor-images-import">
        <TabBar
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={this.handleActiveIndexUpdate}
          className="editor-images-import-tab-bar"
        >
          <Tab>
            <span className='mdc-tab__text-label'>Editor</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Images</span>
          </Tab>
          <Tab>
            <span className='mdc-tab__text-label'>Import</span>
          </Tab>
        </TabBar>
        {this.state.activeIndex == 0 ? <EditorTab/> : null}
        {this.state.activeIndex == 1 ? <ImagesTab/> : null}
        {this.state.activeIndex == 2 ? <ImportTab/> : null}
      </div>
    );
  }
}

export default EditorImagesImport;