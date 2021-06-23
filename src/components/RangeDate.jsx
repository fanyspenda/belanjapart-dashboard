/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id');

class RangeDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      startDate: null,
      endDate: null
    };
    this.toggle = this.toggle.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = () => {
    const { startDate, endDate } = this.state;
    this.props.handleClick(startDate, endDate);
    this.setState({ dropdownOpen: false });
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { startDate, endDate } = this.state;
    return (
      <Dropdown
        isOpen={this.state.dropdownOpen}
        toggle={this.toggle}
        className="mx-2"
      >
        <DropdownToggle caret className="form-control dropdown-date h-100">
          {startDate && endDate ? (
            <span>
              {moment(startDate).format('ll')} - {moment(endDate).format('ll')}
            </span>
          ) : (
            'Date'
          )}
        </DropdownToggle>
        <DropdownMenu>
          <div className="form-group m-0">
            <div className="m-2">
              <label htmlFor="startDate">Start Date</label>
              <input
                className="dropdown-item input-date"
                name="startDate"
                id="startDate"
                type="date"
                onChange={this.handleChange}
                value={startDate}
                required
              />
            </div>
            <div className="m-2">
              <label htmlFor="endDate">End Date</label>
              <input
                className="dropdown-item input-date"
                name="endDate"
                id="endDate"
                type="date"
                onChange={this.handleChange}
                value={endDate}
                required
              />
            </div>
            <div className="text-right m-2">
              <button onClick={this.onClick} className="btn-xs btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default RangeDate;
