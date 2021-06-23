import React, { Fragment } from 'react';
import { renderRoutes } from 'react-router-config';

const Master = ({ route }) => <Fragment>{renderRoutes(route.routes)}</Fragment>;

export default Master;
