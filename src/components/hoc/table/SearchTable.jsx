import React from 'react';

const SearchTable = ({ handleSearch, route }) => (
  <div className="form-group my-search mr-2">
    <div className="input-group input-group-valet">
      <input
        type="text"
        className="form-control"
        placeholder={route.placehold ? route.placehold : 'Search'}
        onChange={handleSearch}
      />
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="fas fa-search" />
        </span>
      </div>
    </div>
  </div>
);

export default SearchTable;
