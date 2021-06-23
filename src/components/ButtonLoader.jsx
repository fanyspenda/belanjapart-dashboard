/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const ButtonLoader = props => (
  <button {...props} disabled={props.loader} type="submit">
    {props.loader && <i className="lds-dual-ring" />}
    {props.children}
  </button>
);

ButtonLoader.defaultProps = {
  loader: false
};

ButtonLoader.propTypes = {
  loader: PropTypes.bool
};

export default ButtonLoader;
