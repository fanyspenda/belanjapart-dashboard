import React, { Component } from 'react';
import Select from 'react-select';
import { message } from 'antd';
import { connect } from 'react-redux';
import { customStyles } from '../../helpers/styleSelect';
import 'antd/lib/message/style/css';
// import CustomOption from './CustomOption';

const transformValue = (value, options, multi) => {
  if (multi && typeof value === 'string') return [];

  const filteredOptions = options.filter(option =>
    multi ? value.indexOf(option.value) !== -1 : option.value === value
  );

  return multi ? filteredOptions : filteredOptions[0];
};

class MultiSelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onBlur = e => {
    const blurHandler = this.props.input.onBlur;
    if (blurHandler) {
      blurHandler({
        type: 'blur',
        target: {
          value: e.target.value
        }
      });
    }
  };

  multiChangeHandler = func => values => {
    const { status, secondary } = this.props;
    if (status === 'edit') {
      if (secondary && secondary.currentSecondary === 0) {
        func(values.map(value => value.value));
      } else {
        message.warning(
          'You can change attribute when your secondary product is still there'
        );
      }
    } else {
      func(values.map(value => value.value));
    }
  };

  render() {
    const {
      input,
      options,
      name,
      id,
      label,
      disabled,
      placeholder,
      requiredStar,
      defaultValue,
      meta: { touched, error, warning }
    } = this.props;
    const transformedValue = transformValue(input.value, options, true);

    return (
      <div>
        <div className="form-group">
          <label htmlFor={id}>
            {label}
            {requiredStar === true ? (
              <span className="text-required"> *</span>
            ) : (
              ''
            )}
          </label>
          <Select
            {...input}
            id={id}
            name={name}
            defaultValue={defaultValue}
            isSearchable
            isMulti
            isDisabled={disabled}
            className={`${touched && error ? 'focus-error-select' : ''}`}
            styles={customStyles}
            placeholder={placeholder}
            optionClassName="needsclick"
            options={options}
            // components={{ Option: CustomOption }}
            value={transformedValue}
            isClearable
            onChange={this.multiChangeHandler(input.onChange)}
            onBlur={() => this.props.input.onBlur(input.value)}
          />
          {touched &&
            ((error && <span className="form-error">{error}</span>) ||
              (warning && <span className="form-error">{warning}</span>))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  secondary: state.secondary
});

export default connect(mapStateToProps, {})(MultiSelectInput);