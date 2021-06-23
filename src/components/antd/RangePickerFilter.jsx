import React, { Component, Fragment } from 'react';
import { DatePicker } from 'antd';
import 'antd/es/date-picker/style/css';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class RangePickerFilter extends Component {
  handleChange = ranges => {
    const { handleFilter } = this.props;
    handleFilter(ranges);
  };

  render() {
    return (
      <Fragment>
        <RangePicker onChange={this.handleChange} format={dateFormat} />
      </Fragment>
    );
  }
}

export default RangePickerFilter;
