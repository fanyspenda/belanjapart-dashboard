/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Nav, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const rotate0 = {
  transform: 'rotate(0deg)'
};

const rotate90 = {
  transform: 'rotate(90deg)'
};

class Subsubmenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    const { collapse } = this.state;
    const { reroutes, names } = this.props;

    return (
      <li className={`${this.activeRoute('/test')} nav-item`}>
        <NavLink
          to="#"
          className="nav-link"
          activeClassName="active"
          onClick={this.toggle.bind(this)}
        >
          {/* <i className={`menu-icon ${iconFont}`} /> */}
          <span className="menu-title">{names}</span>
          <i className="menu-arrow" style={collapse ? rotate90 : rotate0} />
        </NavLink>
        <Collapse isOpen={collapse}>
          <Nav className="flex-column sub-menu">
            {reroutes.map(
              (prop, key) =>
                prop.menu && (
                  <li
                    className={`${this.activeRoute('/tes/submenu')} nav-item`}
                    key={key}
                  >
                    <NavLink
                      to={prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      {prop.name}
                    </NavLink>
                  </li>
                )
            )}
          </Nav>
        </Collapse>
      </li>
    );
  }
}

export default Subsubmenu;
