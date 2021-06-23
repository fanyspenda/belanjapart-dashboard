import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import { Router } from 'react-router-dom';
import './styles/style.scss';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { currentData } from './actions/admin.action';
import store from './helpers/store';
import Routes from './routes/Routes';

const history = createBrowserHistory();

store.dispatch(currentData());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>{renderRoutes(Routes)}</div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
