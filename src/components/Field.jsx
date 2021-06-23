/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
import React from 'react';
import Select from 'react-select';
import Rating from 'react-rating';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { customStyles } from '../helpers/styleSelect';

export const required = value => (value ? undefined : 'Required');
export const requiredArray = value =>
  value && value.length > 0 ? undefined : 'Required';

export function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}

export const normalizeNumber = value => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  return formatNumber(onlyNums);
};

export const normalizeNumberSeparatorPoint = value => {
  if (!value) {
    return value;
  }
  return value.match(/^[0-9]*\.?[0-9]*$/);
};

export const normalizeNumberWithLimit = max => value => {
  if (!value) {
    return value;
  }

  const onlyNums = value.replace(/[^\d]/g, '');

  if (onlyNums.length >= max) {
    return onlyNums.slice(0, max);
  }
  return onlyNums;
};

export const emailValid = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength300 = maxLength(300);

export const capitalize = value =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const renderField = ({
  input,
  placeholder,
  type,
  disabled,
  noLabel,
  label,
  requiredStar,
  id,
  altLabel,
  min,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group">
      {!noLabel && (
        <span htmlFor={id}>
          {label}
          {altLabel && (
            <span
              style={{ fontStyle: 'italic', fontSize: 11 }}
            >{` ${altLabel}`}</span>
          )}
          {requiredStar === true ? (
            <span className="text-required"> *</span>
          ) : (
            ''
          )}
        </span>
      )}

      <input
        {...input}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        id={id}
        className="form-control"
        onBlur={() => input.onBlur(input.value)}
        min={min}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  </div>
);

export const renderFieldFloat = ({
  input,
  placeholder,
  type,
  disabled,
  noLabel,
  label,
  requiredStar,
  id,
  altLabel,
  step,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group">
      {!noLabel && (
        <span htmlFor={id}>
          {label}
          {altLabel && (
            <span
              style={{ fontStyle: 'italic', fontSize: 11 }}
            >{` ${altLabel}`}</span>
          )}
          {requiredStar === true ? (
            <span className="text-required"> *</span>
          ) : (
            ''
          )}
        </span>
      )}

      <input
        {...input}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        id={id}
        className="form-control"
        // step="0.01"
        // lang="en-US"
        pattern="[0-9]+([\.][0-9])?"
        onBlur={() => input.onBlur(input.value)}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  </div>
);

export const renderFieldNoBorder = ({
  input,
  placeholder,
  type,
  disabled,
  min,
  noLabel,
  label,
  requiredStar,
  id,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group m-0">
      {/* {!noLabel && (
        <span htmlFor={id}>
          {label}
          {requiredStar === true ? (
            <span className="text-required"> *</span>
          ) : (
            ''
          )}
        </span>
      )} */}

      <input
        {...input}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        id={id}
        className="form-control p-0"
        style={{ border: 'none' }}
        min={min}
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  </div>
);

export const renderArrayField = ({ fields, meta: { error, submitFailed } }) => (
  <ul className="col-md-12">
    {fields.map((member, index) => (
      <li key={index}>
        <p className="detail-key font-weight-bold m-0">Field {index + 1}</p>
        <div className="row">
          <Field
            name={`${member}.point`}
            type="number"
            component={renderField}
            label="Poin"
            className="col-md-3 ml-2"
          />
          <Field
            name={`${member}.percent`}
            type="number"
            component={renderField}
            label="Percentage %"
            className="col-md-3 ml-2"
          />
          <button
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
            className="btn btn-secondary mt-4 mb-4 ml-2 p-2"
          >
            <i className="fas fa-trash align-self-center" />
          </button>
        </div>
      </li>
    ))}
    <li>
      <button
        className="btn btn-secondary p-2"
        type="button"
        onClick={() => fields.push({})}
      >
        Add Field
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
  </ul>
);

export const ratingField = ({
  input,
  label,
  requiredStar,
  id,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {requiredStar === true ? <span className="text-required"> *</span> : ''}
      </label>
      <div>
        <Rating
          {...input}
          initialRate={Number(input.value)}
          emptySymbol={<i className="far fa-star" />}
          fullSymbol={<i className="fas fa-star" />}
        />
      </div>
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  </div>
);

export const renderCheckbox = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const CheckboxComp = (
    <Checkbox
      {...input}
      onChange={event => input.onChange(event.target.checked)}
      value={input.value}
      checked={input.value}
      {...custom}
    >
      {children}
    </Checkbox>
  );

  return (
    <FormControl error={Boolean(touched && error)} fullWidth>
      <FormControlLabel label={label} control={CheckboxComp} />
      {touched && error && <span className="form-error">{error}</span>}
    </FormControl>
  );
};

export const checkField = ({
  input,
  disabled,
  label,
  id,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group">
      <div className="form-check">
        <label className="form-check-label">
          <input
            {...input}
            checked={input.value === true}
            disabled={disabled}
            type="checkbox"
            className="form-check-input"
          />
          {label}
          <i className="input-helper" />
        </label>
      </div>
    </div>

    {touched &&
      ((error && <span className="form-error">{error}</span>) ||
        (warning && <span className="form-error">{warning}</span>))}
  </div>
);

export const selectField = ({
  input,
  placeholder,
  type,
  disabled,
  label,
  children,
  requiredStar,
  id,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {requiredStar === true ? <span className="text-required"> *</span> : ''}
      <select
        {...input}
        type={type}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        className="form-control"
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {children}
      </select>
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  </div>
);

export const renderSelectInput = ({
  input,
  options,
  name,
  id,
  label,
  disabled,
  placeholder,
  requiredStar,
  meta: { touched, error, warning },
  note
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      {requiredStar === true ? <span className="text-required"> *</span> : ''}
    </label>
    <Select
      {...input}
      id={id}
      name={name}
      isSearchable
      isDisabled={disabled}
      styles={customStyles}
      placeholder={placeholder}
      options={options}
      value={
        input.value && options.find(option => option.value === input.value)
      }
      isClearable
      onChange={value => {
        input.onChange(value);
      }}
      onBlur={() => {
        input.onBlur(input.value);
      }}
    />
    {touched &&
      ((error && <span className="form-error">{error}</span>) ||
        (warning && <span className="form-error">{warning}</span>))}
    {note && <p className="text-right pt-1">{note}</p>}
  </div>
);

export const textAreaField = ({
  input,
  placeholder,
  type,
  label,
  id,
  disabled,
  requiredStar,
  rows,
  meta: { touched, error, warning }
}) => (
  <div>
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {requiredStar === true ? <span className="text-required"> *</span> : ''}
      </label>
      <textarea
        {...input}
        placeholder={placeholder}
        type={type}
        rows={rows}
        disabled={disabled}
        className="form-control"
      />
      {touched &&
        ((error && <span className="form-error">{error}</span>) ||
          (warning && <span className="form-error">{warning}</span>))}
    </div>
  </div>
);

export const multipleCheckField = ({
  input,
  disabled,
  label,
  options,
  id,
  meta: { touched, error, warning }
}) =>
  options.map((option, index) => (
    <div>
      <div className="form-group" keys={index}>
        <div className="form-check">
          <label className="form-check-label">
            <input
              type="checkbox"
              name={`${input.name}[${index}]`}
              value={option.content}
              // checked={option.answerQuestionId.length !== 0}
              checked={input.value.indexOf(option.id) !== -1}
              onChange={event => {
                const newValue = [...input.value];
                if (event.target.checked) {
                  newValue.push(option.id);
                } else {
                  newValue.splice(newValue.indexOf(option.id), 1);
                }

                return input.onChange(newValue);
              }}
            />
            {option.content}
            <i className="input-helper" />
          </label>
        </div>
      </div>
    </div>
  ));
