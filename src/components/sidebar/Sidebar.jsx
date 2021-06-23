/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { Cookies } from 'react-cookie';
import { Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Routes from '../../routes/Routes';
import Submenu from './Submenu';
import { toggleSidebar } from '../../reducers/app.reducer';
import { currentData } from '../../actions/admin.action';

const cookies = new Cookies();

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    const { currentData } = this.props;
    currentData();
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  activeRoute = routeName =>
    this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';

  clickMenu = () => {
    const { isMobile } = this.state;
    const { toggleSidebar } = this.props;
    if (isMobile) {
      toggleSidebar();
    }
  };

  mainMenu = (prop, key) => {
    const { current } = this.props;
    const roleName = current.role_name;
    const isMenu = prop.role.includes(roleName);

    if (isMenu) {
      return (
        <li className={`${this.activeRoute(prop.path)} nav-item`} key={key}>
          <NavLink
            to={prop.path}
            className="nav-link"
            activeClassName="active"
            onClick={this.clickMenu}
          >
            <i className={`menu-icon ${prop.iconFont}`} />
            {/* <img alt="" className="menu-icon" src={prop.icon} /> */}
            <span className="menu-title">{prop.name}</span>
          </NavLink>
        </li>
      );
    }

    return '';
  };

  render() {
    const { app, data } = this.props;

    return (
      <nav className="sidebar sidebar-offcanvas mt-5" id="sidebar">
        <div className="side-username text-center">
          <img
            src="/public/images/faces-clipart/pic-2.png"
            alt="icon-side"
            className="img-logo"
          />
          {app.miniSidebar ? (
            <Fragment>
              <h4 className="text-white font-weight-bold pt-2">HT</h4>
              <p className="text-warning">SA</p>
            </Fragment>
          ) : (
            <Fragment>
              <h4 className="text-white font-weight-bold pt-2">
                {data.current && data.current.name}
              </h4>
              <p className="text-warning">
                {data.current && data.current.role_name}
              </p>
            </Fragment>
          )}
        </div>
        <Nav className="pl-4 pt-4">
          {Routes[0].routes.map((prop, key) =>
            prop.menu && !prop.routes
              ? this.mainMenu(prop, key)
              : prop.menu && <Submenu {...prop} {...this.props} />
          )}
        </Nav>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  current: state.admin.current,
  data: state.admin
});

export default connect(mapStateToProps, { currentData, toggleSidebar })(
  Sidebar
);
