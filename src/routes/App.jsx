/* eslint-disable import/no-cycle */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import cx from 'classnames';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened:
        document.documentElement.className.indexOf('nav-open') !== -1
    };
  }

  componentDidMount() {}

  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };

  render() {
    const { route, location, auth, app, current } = this.props;

    const publicPath = ['/login'];
    if (location.pathname.includes(publicPath)) {
      if (auth) {
        window.location.href = '/transaction';
      }
      return renderRoutes(route.routes);
    }

    if (auth) {
      if (location.pathname === '/') {
        return <Redirect to="/transaction" />;
      }
      return (
        <div
          className={cx('container-scroller', {
            'sidebar-toggle': app.miniSidebar
          })}
        >
          <Header {...this.props} />
          {current && (
            <div className="container-fluid page-body-wrapper">
              <Sidebar {...this.props} />
              <div className="main-panel">{renderRoutes(route.routes)}</div>
            </div>
          )}
        </div>
      );
    }
    if (!auth) {
      const authed = false; // <-- You can change this
      const authPath = '/reset-password-token'; // <-- You can change this
      if (location.pathname === '/reset-password-token') {
        // return <Redirect to="/forgot-password" />;
        return renderRoutes(route.routes, authed, authPath);
      }
    }

    return <Redirect to="/login" />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  current: state.admin.current,
  app: state.app
});

export default connect(mapStateToProps, null)(App);
