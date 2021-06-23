import React from 'react';
import { withRouter } from 'react-router-dom';

const EditAction = ({ data, history }) => (
  <a
    className="btn btn-outline-valet btn-xs p-1 mr-2"
    href={`${history.location.pathname}/edit/${data.id}`}
  >
    <i className="fas fa-pencil-alt m-0" />
  </a>
);

export default withRouter(EditAction);
