import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Select } from 'antd';
import 'antd/es/select/style/css';

const { Option } = Select;

class SearchOption extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = value => {
    const { onLimitChange } = this.props;
    onLimitChange(value);
  };

  render() {
    const { limit } = this.props;
    return (
      <Fragment>
        <label htmlFor="selectLimit" className="m-0 mr-1">
          show :{' '}
        </label>
        <Select
          value={limit}
          style={{ width: 70 }}
          onChange={this.handleChange}
        >
          <Option value={10}>10</Option>
          <Option value={25}>25</Option>
          <Option value={50}>50</Option>
        </Select>
      </Fragment>
    );
  }
}

export default SearchOption;
