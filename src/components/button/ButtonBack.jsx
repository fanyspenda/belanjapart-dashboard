import React from 'react';
import { withRouter } from 'react-router-dom';

const ButtonBack = ({ history, children }) => (
  <h4 className="font-weight-bold mb-0">
    <button
      className="btn btn-link p-0 pr-1"
      onClick={() => {
        history.goBack();
      }}
    >
      <i className="fas fa-arrow-left" style={{ fontSize: 22 }} />
    </button>
    {children}
  </h4>
);

export default withRouter(ButtonBack);
