import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';
import {Button , Body1} from '@material/react-typography';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import List, {ListItem, ListItemText} from '@material/react-list';
import ImagesTab from '../components/EditorImagesImport/ImagesTab';
import EditorTab from '../components/EditorImagesImport/EditorTab';
import ImportTab from '../components/EditorImagesImport/ImportTab';

class EditorImagesImport extends React.Component {
  state = {activeIndex: 2};

  handleActiveIndexUpdate = (activeIndex) => this.setState({activeIndex});

  render() {
    return (
      <Grid className="editor-images-import">
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