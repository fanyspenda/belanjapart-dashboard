/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required, renderSelectInput } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import { updateData, detailData } from '@actions/atribut.action';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';
import FieldDropzoneUpload from '@components/dropzone/FieldDropzoneUpload';
import PageLoader from '@components/PageLoader';
import validate from './validate';
import { cekImageExt } from '@helpers/image';
import { regexStartEndSpace } from '@helpers/textConfig';

const renderInputField = ({
  input,
  placeholder,
  type,
  step,
  meta: { touched, error, warning }
}) => (
  <div className="col">
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className="form-control"
      step={step && step}
    />
    {touched &&
      ((error && <span className="form-error">{error}</span>) ||
        (warning && <span className="form-error">{warning}</span>))}
  </div>
);

class renderTypeRange extends Component {
  componentWillMount() {
    const { fields } = this.props;
    if (fields.length === 0) {
      // fields.removeAll();
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
              {fields.map((range, index) => (
                <Fragment key={index}>
                  <div className="col-12 mt-2">
                    <h6>Input range integer</h6>
                  </div>
                  {/* <button
                    type="button"
                    title="Remove Range"
                    onClick={() => fields.remove(index)}
                  >
                    x
                  </button> */}
                  <Field
                    name={`${range}.min_value`}
                    type="number"
                    component={renderInputField}
                    placeholder="0"
                    validate={[required]}
                  />{' '}
                  -{' '}
                  <Field
                    name={`${range}.max_value`}
                    type="number"
                    component={renderInputField}
                    placeholder="0"
                    validate={[required]}
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
            Add Range Integer
          </button>
        </div>
      </Fragment>
    );
  }
}

class renderTypeRangeFloat extends Component {
  componentWillMount() {
    const { fields } = this.props;
    if (fields.length === 0) {
      fields.push();
    }
  }

  render() {
    const { fields } = this.props;
    return (
      <Fragment>
        <div>
          <div className="form-group">
            <div className="row mb-3">
              {fields.map((range, index) => (
                <Fragment key={index}>
                  <div className="col-12 mt-2">
                    <h6>Input range float</h6>
                  </div>
                  {/* <button
                      type="button"
                      title="Remove Range"
                      onClick={() => fields.remove(index)}
                    >
                      x
                    </button> */}
                  <Field
                    name={`${range}.min_value`}
                    type="number"
                    component={renderInputField}
                    placeholder="0"
                    step={0.01}
                  />{' '}
                  -{' '}
                  <Field
                    name={`${range}.max_value`}
                    type="number"
                    component={renderInputField}
                    placeholder="0"
                    step={0.01}
                  />
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
            Add Range Float
          </button>
        </div>
      </Fragment>
    );
  }
}

class AtributEdit extends Component {
  state = {
    type: '',
    picture: null,
    picture_id: ''
  };

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;
    const initInput = ['name', 'code'];
    if (data.dataDetail !== nextProps.data.dataDetail) {
      const {
        dataDetail,
        dataDetail: { type, picture, picture_id, option }
      } = nextProps.data;
      const dispatchEdit = (name, data) =>
        dispatch(change('editAtributForm', name, data));

      // map initInput to change Field's value with same name
      initInput.map(data => dispatchEdit(data, dataDetail[data]));

      // setState using shorthand, if data and state same
      this.setState({ picture, picture_id });

      // reduce data from option to get 'min_value' and 'max_value'
      const reduceOption = (acc, data) => {
        acc.push({
          min_value: Number(data.min_value),
          max_value: Number(data.max_value)
        });
        return acc;
      };

      // array need to be reversed then reduce and dispatch data to FieldArray
      let attrOption = [];
      if(option){
        attrOption = option.reverse().reduce(reduceOption, []);
      }
      // show option value based on type 1 till 4
      if (type === 'string') {
        dispatchEdit('type', 1);
        this.setState({ type: 1 });
      } else if (type === 'int') {
        dispatchEdit('type', 2);
        dispatchEdit('range', attrOption);
        this.setState({ type: 2 });
      } else if (type === 'float') {
        dispatchEdit('type', 3);
        // dispatchEdit('rangeFloat', attrOption);
        this.setState({ type: 3 });
      }
    }
  }

  onSubmit = value => {
    const data = {};
    const { name, code, range, rangeFloat } = value;
    const { picture, type } = this.state;
    const { updateData, match } = this.props;

    data.name = name;
    data.code = code;
    if (type === 2) {
      data.type ='int';
      const attrOption = range.reduce((acc, data) => {
        acc.push({
          min_value: Number(data.min_value),
          max_value: Number(data.max_value),
          status: true
        });
        return acc;
      }, []);
      data.attribute_option = attrOption;
    }
    if (type === 3) {
      data.type = 'float';
      // const attrOption = rangeFloat.reduce((acc, data) => {
      //   acc.push({
      //     min_value: Number(data.min_value),
      //     max_value: Number(data.max_value),
      //     status: true
      //   });
      //   return acc;
      // }, []);
      // data.attribute_option = attrOption;
    }
    if (type === 1) {
      data.type = 'string';
    }
    data.picture_id = picture.id ? picture.id : data.picture_id;
    data.status = true;

    updateData(data, match.params.id);
    // console.log('data', data);
    // console.log('state type', this.state);
  };

  handleFileDrop = file => {
    this.setState({ picture: file });
  };

  render() {
    const { handleSubmit, data } = this.props;
    const { picture } = this.state;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>EDIT ATRIBUT</ButtonBack>
              </div>
            </div>
            {data.isLoadingDetail ? (
              <PageLoader />
            ) : (
              <form
                className="forms-sample pl-5 pt-3"
                onSubmit={handleSubmit(this.onSubmit)}
              >
                <div className="row">
                  <div className="col-md-4">
                    <Field
                      name="name"
                      type="text"
                      component={renderField}
                      label="Atribut Name"
                      id="inputAtributName"
                      placeholder="Input atribut name"
                      validate={[required]}
                    />
                    <Field
                      name="code"
                      type="text"
                      component={renderField}
                      label="Atribut ID"
                      id="inputAtributId"
                      placeholder="Input atribut id"
                      validate={[required]}
                    />
                    <Field
                      name="type"
                      component={renderSelectInput}
                      label="Type"
                      options={[
                        {
                          value: 1,
                          label: 'String',
                          code: 'string'
                        },
                        {
                          value: 2,
                          label: 'Integer',
                          code: 'int'
                        },
                        {
                          value: 3,
                          label: 'Float',
                          code: 'float'
                        }
                      ]}
                      id="inputType"
                      placeholder="Choose Type"
                      validate={[required]}
                      onChange={event => this.setState({ type: event.value })}
                    />
                    <Fragment>
                      {this.state.type === 2 && (
                        <FieldArray name="range" component={renderTypeRange} />
                      )}
                      {/* {this.state.type === 3 && (
                        <FieldArray name="rangeFloat" component={renderTypeRangeFloat} />
                      )} */}
                    </Fragment>
                    <div className="row">
                      <div className="col-md-4">
                        <ButtonCancel>Cancel</ButtonCancel>
                      </div>
                      <div className="col-sm-3">
                        <ButtonLoader
                          type="submit"
                          className="btn btn-green-dark text-white mt-3"
                          loader={data.isLoading}
                        >
                          Save
                        </ButtonLoader>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 pl-5">
                  <Field
                      name="picture_id"
                      type="text"
                      component={FieldDropzoneUpload}
                      id="inputImage"
                      handleFileDrop={this.handleFileDrop}
                      typePicture="attribute"
                      dataSrc={cekImageExt(picture) ? picture : null}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.atribut
});

export default reduxForm({
  form: 'editAtributForm',
  validate
})(connect(mapStateToProps, { updateData, detailData })(AtributEdit));
