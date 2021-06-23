import React from 'react';
import Switch from 'react-router/Switch';
import { Route } from 'react-router-dom';

const renderHeadRoute = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
            if (route.header) {
              return <route.header {...props} {...extraProps} route={route} />;
            }
            return '';
          }}
        />
      ))}
    </Switch>
  ) : null;

export default renderHeadRoute;
