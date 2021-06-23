import React from 'react';
import { withRouter } from 'react-router-dom';

const DetailAction = ({ data, history }) => (
  <button
    className="btn btn-outline-valec btn-xs p-1 mr-2"
    onClick={() => {
      history.push(`${history.location.pathname}/detail/${data.id}`);
    }}
  >
    <i className="fas fa-eye m-0" />
  </button>
);

export default withRouter(DetailAction);
