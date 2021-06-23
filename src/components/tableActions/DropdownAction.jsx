/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class DropdownAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onChangeStatus(val) {
    const { updateStatusData, data } = this.props;
    const formData = new FormData();

    formData.append('status', val);

    updateStatusData(formData, data.id);
  }

  render() {
    const { data } = this.props;
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          caret
          className={`btn-xs  ${
            data.statusActive ? 'btn-success' : 'btn-danger'
          }`}
        >
          {data.statusActive ? 'Active' : 'Inactive'}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.onChangeStatus.bind(this, true)}>
            Active
          </DropdownItem>
          <DropdownItem onClick={this.onChangeStatus.bind(this, false)}>
            Inactive
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropdownAction;
