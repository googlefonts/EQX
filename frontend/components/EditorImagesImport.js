import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';
import {
  Button
} from '@material/react-typography';
import {Cell, Grid, Row} from '@material/react-layout-grid';

// Images Tab
const ImagesTab = props => (
  <div className="images-tab">
    <input type="file" name="images-tab-upload" id="images-tab-upload" accept="image/png, image/jpeg"/>
    <label htmlFor="images-tab-upload" className="images-tab-upload-label"><MaterialIcon className="paperclip-icon" icon='attach_file' /><Button>Attach your images here</Button></label>
  </div>
)

// Editor Tab
const EditorTab = props => (
    <p>Editor tab</p>
)

// Import Tab
const ImportTab = props => (
  <div className="import-tab">
    <div className="import-html">
        <input type="file" name="import-html-upload" id="import-html-upload"/>
        <label htmlFor="import-html-upload" className="import-html-upload-label"><MaterialIcon className="paperclip-icon" icon='attach_file' /><Button>Attach your images here</Button></label>
      </div>
      <div className="import-css">
        <input type="file" name="import-css-upload" id="import-css-upload"/>
        <label htmlFor="import-css-upload" className="import-css-upload-label"><MaterialIcon className="paperclip-icon" icon='attach_file' /><Button>Attach your images here</Button></label>
      </div>
    <div className="import-fonts">
      <ul>
        <li>
          list item
        </li>
        <li>
          list item
        </li>
      </ul>
    </div>
  </div>
)

class EditorImagesImport extends React.Component {
  state = {activeIndex: 2};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});

  render() {
    return (
      <Grid>
        <Row>
          <Cell columns={12}>
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
          </Cell>
        </Row>
      </Grid>
    );
  }
}

export default EditorImagesImport;