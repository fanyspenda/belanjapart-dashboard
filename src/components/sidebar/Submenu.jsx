/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Nav, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Subsubmenu from './Subsubmenu';

const rotate0 = {
  transform: 'rotate(0deg)'
};

const rotate90 = {
  transform: 'rotate(90deg)'
};

class Submenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isHover: false
    };
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  mouseEnter = () => {
    this.setState({
      isHover: true
    });
  };

  mouseLeave = () => {
    this.setState({
      isHover: false
    });
  };

  renderText = prop => {
    const { app } = this.props;
    const { isHover } = this.state;
    if (app.miniSidebar) {
      if (isHover) {
        return prop.name;
      }
      return prop.code;
    }
    return prop.name;
  };

  render() {
    const { collapse } = this.state;
    const { routes, name, iconFont } = this.props;

    return (
      <li className={`${this.activeRoute('/test')} nav-item`}>
        <NavLink
          to="#"
          className="nav-link"
          activeClassName="active"
          onClick={this.toggle.bind(this)}
          onMouseEnter={this.mouseEnter}
          onMouseLeave={this.mouseLeave}
        >
          <i className={`menu-icon ${iconFont}`} />
          <span className="menu-title">{name}</span>
          <i className="menu-arrow" style={collapse ? rotate90 : rotate0} />
        </NavLink>
        <Collapse isOpen={collapse}>
          <Nav
            className="flex-column sub-menu"
            onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave}
          >
            {routes.map((prop, key) =>
              prop.menu && !prop.reroutes ? (
                <li
                  className={`${this.activeRoute('/tes/submenu')} nav-item`}
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {this.renderText(prop)}
                  </NavLink>
                </li>
              ) : (
                prop.menu && <Subsubmenu {...prop} {...this.props} />
              )
            )}
          </Nav>
        </Collapse>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app
});

export default connect(
  mapStateToProps,
  {}
)(Submenu);
