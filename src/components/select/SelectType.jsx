/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { renderSelectInput } from '../Field';

class SelectType extends React.Component {
  state = {};

  render() {
    const { opt } = this.props;

    return (
      <Field
        name="type_id"
        component={renderSelectInput}
        onChange={this.props.onChange}
        requiredStar
        label="Type"
        options={opt}
        id="inputType"
        placeholder="Choose Type"
      />
    );
  }
}

export default connect(null, {})(SelectType);
