import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const PriceFormat = ({ value, noPrefix }) => (
  <NumberFormat
    displayType="text"
    thousandSeparator="."
    decimalSeparator=","
    prefix={noPrefix ? '' : 'Rp '}
    value={value}
  />
);

PriceFormat.propTypes = {
  value: PropTypes.number.isRequired
};

export default PriceFormat;
