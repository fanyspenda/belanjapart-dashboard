import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Select, Input, Form } from 'antd';
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
    const { handleChangeOption, form } = this.props;
    form.resetFields(['Search']);
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
    const { filterBy, form } = this.props;
    return (
      <InputGroup compact style={{ width: '39%' }} className="text-right">
        <Select
          value={filterBy}
          onChange={e => this.handleOnchangeOptionGroup(e)}
          style={{ width: 130, height: 38 }}
        >
          <Option value={0}>Transaction</Option>
          <Option value={1}>Customer</Option>
          <Option value={2}>Price</Option>
        </Select>
        {form.getFieldDecorator('Search', {
          initialValue: ''
        })(
          <Search
            placeholder="input search text"
            onSearch={value => this.handleSearch(value)}
            onChange={this.handleChange}
            style={{ width: 200, height: 38 }}
            type={filterBy === 2 ? 'number' : 'text'}
          />
        )}
      </InputGroup>
    );
  }
}

export default Form.create()(SearchOption);
