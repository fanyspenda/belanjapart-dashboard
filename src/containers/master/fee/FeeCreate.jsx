/* eslint-disable radix */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, FieldArray, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import { createData } from '@actions/fee.action';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';

const renderInputField = ({
  input,
  placeholder,
  type,
  step,
  min,
  meta: { touched, error, warning }
}) => (
  <div className="col">
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className="form-control"
      step={step && step}
      min={min}
    />
    {touched &&
      ((error && <span className="form-error">{error}</span>) ||
        (warning && <span className="form-error">{warning}</span>))}
  </div>
);

class renderTypeRange extends Component {
  componentWillMount() {
    const { fields } = this.props;
    if (fields) {
      fields.removeAll();
      fields.push();
    }
  }

  handleDeleteField = index => {
    const { fields } = this.props;
    fields.remove(index);
  };

  render() {
    const { fields } = this.props;
    return (
      <Fragment>
        <div>
          <div className="form-group">
            <div className="row mb-3">
              {fields.map((name, index) => (
                <Fragment key={index}>
                  <div className="col-12 mt-2">
                    <h6>Input Expedition</h6>
                  </div>
                  <Field
                    name={`${name}.name`}
                    type="text"
                    component={renderInputField}
                    placeholder="expedition name"
                  />{' '}
                  -{' '}
                  <Field
                    name={`${name}.price`}
                    type="number"
                    component={renderInputField}
                    placeholder="price"
                    min={0}
                  />
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      type="button"
                      style={{ height: '30px' }}
                      className="btn btn-danger"
                      onClick={() => this.handleDeleteField(index)}
                    >
                      <i className="fas fa-trash-alt m-0" />
                    </button>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="form-group">
          <button
            className="btn btn-green-outline btn-block font-weight-bolder m-0"
            style={{ borderStyle: 'dashed' }}
            type="button"
            onClick={() => fields.push({})}
          >
            Add Expedition
          </button>
        </div>
      </Fragment>
    );
  }
}

class FeeCreate extends Component {
  state = {};

  onSubmit = value => {
    const obj = {
      name: '',
      expedisi: []
    };
    const { createData, dispatch } = this.props;

    obj.name = value.name;

    for (let index = 0; index < value.expedisi.length; index++) {
      obj.expedisi.push({
        name: value.expedisi[index].name,
        price: parseInt(value.expedisi[index].price)
      });
    }

    createData(obj).then(() => {
      dispatch(reset('createFeeForm'));
    });
  };

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>CREATE NEW FEE</ButtonBack>
              </div>
            </div>
            <form
              className="forms-sample pl-5 pt-3"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="City Name"
                    id="inputCityName"
                    placeholder="Input city name"
                    validate={[required]}
                  />
                  <FieldArray name="expedisi" component={renderTypeRange} />

                  <div className="row">
                    <div className="col-md-4">
                      <ButtonCancel>Cancel</ButtonCancel>
                    </div>
                    <div className="col-sm-8">
                      <ButtonLoader
                        type="submit"
                        className="btn btn-green-dark text-white mt-3 pr-2 w-100"
                        loader={data.isLoading}
                      >
                        + Create New Fee
                      </ButtonLoader>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.fee
});

export default reduxForm({
  form: 'createFeeForm'
})(connect(mapStateToProps, { createData })(withRouter(FeeCreate)));
