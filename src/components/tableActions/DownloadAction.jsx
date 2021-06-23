import React from 'react';
import { withRouter } from 'react-router-dom';

const EditAction = ({ data }) => (
  <button
    className="btn btn-outline-valet btn-xs p-1 mr-2"
    onClick={() => window.open(data.path, '_blank')}
    type="button"
  >
    <i className="fa fa-download m-0" />
  </button>
);

export default withRouter(EditAction);
