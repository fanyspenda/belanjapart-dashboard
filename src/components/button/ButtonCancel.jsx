import React from 'react';
import { withRouter } from 'react-router-dom';

const ButtonBack = ({ history, children }) => (
  <button
    type="button"
    className="btn btn-green-outline text-white mt-3 ml-3"
    onClick={() => history.goBack()}
  >
    {children}
  </button>
);

export default withRouter(ButtonBack);
