/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
// import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';

export default class CheckboxGroup extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    ).isRequired
  };

  field = ({ input, meta, options, requiredStar }) => {
    const { name, onChange } = input;
    const { touched, error, warning } = meta;
    const inputValue = input.value;

    const checkboxes = options.map((props, index) => {
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(props.id);
        } else {
          arr.splice(arr.indexOf(props.id), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue.includes(props.id);
      return (
        <Fragment>
          <label key={`checkbox-${props.id}`}>
            <input
              type="checkbox"
              name={`${name}[${index}]`}
              value={props.id}
              checked={checked}
              onChange={handleChange}
              className="mr-2"
            />
            <span>{props.content}</span>
          </label>
          <br />
        </Fragment>
      );
    });

    return (
      <div className="form-group">
        {checkboxes.length > 0 ? (
          <div>{checkboxes}</div>
        ) : (
          <div className="mr-1" />
        )}
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
      </div>
    );
  };

  render() {
    const { validate } = this.props;
    return (
      <Field
        {...this.props}
        type="checkbox"
        requiredStar
        component={this.field}
        validate={validate}
      />
    );
  }
}
