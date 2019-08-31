import React from 'react';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import MaterialIcon from '@material/react-material-icon';
import {Button , Body1} from '@material/react-typography';
import {Cell, Grid, Row} from '@material/react-layout-grid';
import List, {ListItem, ListItemText} from '@material/react-list';
import SvgTab from '../components/EditorImagesImport/SvgTab';
import EditorTab from '../components/EditorImagesImport/EditorTab';
import HtmlCssTab from '../components/EditorImagesImport/HtmlCssTab';

class EditorImagesImport extends React.Component {
  state = {activeIndex: 0};

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
                <span className='mdc-tab__text-label'>SVG</span>
              </Tab>
              <Tab>
                <span className='mdc-tab__text-label'>HTML/CSS</span>
              </Tab>
            </TabBar>
            {this.state.activeIndex == 0 ? <EditorTab/> : null}
            {this.state.activeIndex == 1 ? <SvgTab/> : null}
            {this.state.activeIndex == 2 ? <HtmlCssTab/> : null}
          </Cell>
        </Row>
      </Grid>
    );
  }
}

export default EditorImagesImport;