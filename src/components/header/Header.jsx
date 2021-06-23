/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { fetchAllData, readData } from '@actions/log.action';
import RightHeader from './RightHeader';
import renderHeadRoute from '../../routes/renderHeadRoute';
import { toggleSidebar } from '../../reducers/app.reducer';
import { URL_SOCKET } from '../../config/keys';

const client = new W3CWebSocket(URL_SOCKET);

class Header extends Component {
  state = {};

  componentDidMount() {
    const { fetchAllData } = this.props;
    fetchAllData();
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = message => {
      if (message && message.data) {
        fetchAllData();
      }
    };
  }

  onToggle = e => {
    e.preventDefault();
    const { toggleSidebar } = this.props;
    toggleSidebar();
  };

  render() {
    const { app, route, history, log, readData } = this.props;

    return (
      <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-top">
          {!app.miniSidebar && (
            <a
              className="navbar-brand "
              style={{ marginLeft: '2.5rem' }}
              href="/dashboard"
            >
              <img src="/public/images/icon/logo.png" alt="logo" />
            </a>
          )}
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center">
          <div className="d-flex align-items-center">
            <a className="pl-3" href="/" onClick={this.onToggle}>
              <img src="/public/images/icon/notes.png" alt="icon" />
            </a>
            <a
              className="navbar-brand ml-2 logo-toggle-brand"
              href="/dashboard"
            >
              <img
                src="/public/images/icon/logo.png"
                alt="logo"
                className="logo-header-2"
              />
            </a>

            {renderHeadRoute(route.routes)}
          </div>

          <RightHeader history={history} log={log} readData={readData} />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app,
  log: state.log
});

export default connect(mapStateToProps, {
  toggleSidebar,
  fetchAllData,
  readData
})(Header);
