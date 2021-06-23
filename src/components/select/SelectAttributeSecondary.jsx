import React from 'react';
import { Field } from 'redux-form';
import { renderSelectInput } from '@components/Field';

const SelectAttributeSecondary = ({ data }) => {
  const options = data.reduce((acc, value) => {
    acc.push({
      label: value.code,
      value: value.id
    });
    return acc;
  }, []);

  // console.log('sdasad', options);

  return (
    <Field
      name="attribute_id"
      component={renderSelectInput}
      // requiredStar
      label="Attribute"
      options={options}
      id="inputAttribute"
      placeholder="Choose Attribute"
    />
  );
};

export default SelectAttributeSecondary;
