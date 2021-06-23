import React, { Fragment } from 'react';
// import { renderRoutes } from 'react-router-config';
import renderHeadRoute from '../../routes/renderHeadRoute';

const MasterHeader = ({ route }) => (
  <Fragment>{renderHeadRoute(route.routes)}</Fragment>
);

export default MasterHeader;
