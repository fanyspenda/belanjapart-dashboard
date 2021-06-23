import React, { Component, Fragment } from 'react';
import { DatePicker } from 'antd';
import 'antd/es/date-picker/style/css';

const dateFormat = 'YYYY-MM-DD';

class DatePickerFilter extends Component {
  handleChange = ranges => {
    const { handleFilter } = this.props;
    handleFilter(ranges);
  };

  render() {
    return (
      <Fragment>
        <DatePicker onChange={this.handleChange} format={dateFormat} />
      </Fragment>
    );
  }
}

export default DatePickerFilter;
