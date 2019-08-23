import Select, {Option} from '@material/react-select';

class FontImportSelect extends React.Component {
  state = {value: 'merriweather-light'};

  onEnhancedChange = (index, item) => (
    this.setState({value: item.getAttribute('data-value')})
  );

  render() {
    return (
      <Select
        enhanced
        className="font-selection"
        value={this.state.value}
        onEnhancedChange={this.onEnhancedChange}
      >
        <Option value='merriweather-light'>Merriweather Light</Option>
        <Option value='merriweather-light-italic'>Merriweather Light Italic</Option>
        <Option value='merriweather-regular'>Merriweather Regular</Option>
        <Option value='merriweather-regular-italic'>Merriweather Regular Italic</Option>
        <Option value='merriweather-bold'>Merriweather Bold</Option>
        <Option value='merriweather-bold-italic'>Merriweather Bold Italic</Option>
        <Option value='merriweather-black'>Merriweather Black</Option>
        <Option value='merriweather-black-italic'>Merriweather Black Italic</Option>
      </Select>
    );
  }
}

export default FontImportSelect;