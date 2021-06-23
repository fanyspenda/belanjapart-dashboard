import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Select, Input } from 'antd';
import 'antd/es/input/style/css';
import 'antd/es/select/style/css';

const InputGroup = Input.Group;
const { Option } = Select;
const { Search } = Input;

class SearchOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSearch = _.debounce(this.handleSearch, 1000);
  }

  handleOnchangeOptionGroup = val => {
    const { handleChangeOption } = this.props;
    handleChangeOption(val);
  };

  handleSearch = val => {
    const { searchCall } = this.props;
    searchCall(val);
  };

  handleChange = e => {
    this.handleSearch(e.target.value);
  };

  render() {
    const { type, opt } = this.props;
    return (
      <InputGroup compact className="text-right">
        <Select
          value={type}
          onChange={e => this.handleOnchangeOptionGroup(e)}
          style={{ width: 150, height: 38 }}
        >
          {opt.map(val => (
            <Option value={val.value}>{val.label}</Option>
          ))}
        </Select>
        <Search
          placeholder="input search text"
          onSearch={value => this.handleSearch(value)}
          onChange={this.handleChange}
          style={{ width: 180, height: 38 }}
        />
      </InputGroup>
    );
  }
}

export default SearchOption;
