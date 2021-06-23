import React from 'react';

const PageLoader = () => (
  <div className="card-body" style={{ height: 150, position: 'relative' }}>
    <div className="row">
      <div className="loader-content">
        <i className="lds-dual-ring" />
      </div>
    </div>
  </div>
);

export default PageLoader;
