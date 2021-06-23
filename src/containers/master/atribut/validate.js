const validate = values => {
  // console.log('value', values)
  const error = {};
  if (!values.range || !values.range.length) {
    error.range = { _error: 'At least one range must be entered' };
  } else {
    const rangeErrors = [];
    values.range.forEach((item, rangeIndex) => {
      const errors = {};

      if (item !== undefined) {
        if (!item.min_value) {
          errors.min_value = 'Required';
          rangeErrors[rangeIndex] = errors;
        } else if (isNaN(Number(item.min_value))) {
          errors.min_value = 'Must be a number';
          rangeErrors[rangeIndex] = errors;
        } else if (Number(item.min_value) >= Number(item.max_value)) {
          errors.min_value = 'Min value must less than max value';
          rangeErrors[rangeIndex] = errors;
        }

        if (!item.max_value) {
          errors.max_value = 'Required';
          rangeErrors[rangeIndex] = errors;
        } else if (isNaN(Number(item.max_value))) {
          errors.max_value = 'Must be a number';
          rangeErrors[rangeIndex] = errors;
        } else if (Number(item.max_value) <= Number(item.min_value)) {
          errors.max_value = 'Max value must greater than min value';
          rangeErrors[rangeIndex] = errors;
        }
      }
    });

    if (rangeErrors.length) {
      error.range = rangeErrors;
    }
  }

  return error;
};

export default validate;
