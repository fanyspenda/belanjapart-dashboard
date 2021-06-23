import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, FieldArray, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required, renderSelectInput } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import { createData } from '@actions/atribut.action';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';
import FieldDropzoneUpload from '@components/dropzone/FieldDropzoneUpload';
import { nullPicture } from '@actions/file.action';
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
                  />{' '}
                  -{' '}
                  <Field
                    name={`${range}.max_value`}
                    type="number"
                    component={renderInputField}
                    placeholder="0"
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
    if (fields) {
      fields.removeAll();
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
class AtributCreate extends Component {
  state = {
    type: '',
    picture: ''
  };

  componentWillReceiveProps(nextProps) {
    const { location, nullPicture } = this.props;
    if (nextProps.location === location) {
      nullPicture();
    }
  }

  onSubmit = value => {
    const obj = {};
    const { createData, dispatch, nullPicture } = this.props;
    const { type } = this.state;

    obj.name = value.atributName;
    obj.code = value.atributID;
    if (type === 2) {
      obj.type = 'int';
      const attrOption = value.range.reduce((acc, data) => {
        acc.push({
          min_value: Number(data.min_value),
          max_value: Number(data.max_value),
          status: true
        });
        return acc;
      }, []);
      obj.attribute_option = attrOption;
      // console.log('Data atribut', attrOption);
    }
    if (type === 3) {
      obj.type = 'float';
      // const attrOption = value.rangeFloat.reduce((acc, data) => {
      //   acc.push({
      //     min_value: Number(data.min_value),
      //     max_value: Number(data.max_value),
      //     status: true
      //   });
      //   return acc;
      // }, []);
      // obj.attribute_option = attrOption;
    }
    if (type === 1) {
      obj.type = 'string';
    }
    // if (this.state.picture === '') {
    //   this.setState({ imageRequired: true });
    // }
    obj.picture_id = this.state.picture.id;
    obj.status = true;
    // console.log(obj)
    createData(obj).then(
      () => {
        dispatch(reset('createAtributForm'));
        nullPicture();
        this.setState({ picture: '' });
      },
      () => {}
    );
    // if (this.state.picture) {
    //   // console.log('obj', obj);
    // }
  };

  handleFileDrop = file => this.setState({ picture: file });

  render() {
    const { type, picture } = this.state;
    const { handleSubmit, data } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>CREATE NEW ATRIBUT</ButtonBack>
              </div>
            </div>
            <form
              className="forms-sample pl-5 pt-3"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <div className="row">
                <div className="col-md-4">
                  <Field
                    name="atributName"
                    type="text"
                    component={renderField}
                    label="Atribut Name"
                    id="inputAtributName"
                    placeholder="Input atribut name"
                    validate={[required]}
                  />
                  <Field
                    name="atributID"
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

                  {type === 2 && (
                    <FieldArray name="range" component={renderTypeRange} />
                  )}
                  {/* {type === 3 && (
                    <FieldArray
                      name="rangeFloat"
                      component={renderTypeRangeFloat}
                    />
                  )} */}

                  <div className="row">
                    <div className="col-md-4">
                      <ButtonCancel>Cancel</ButtonCancel>
                    </div>
                    <div className="col-sm-3">
                      <ButtonLoader
                        type="submit"
                        className="btn btn-green-dark text-white mt-3 pr-2"
                        loader={data.isLoading}
                      >
                        + Create New Atribut
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
                    setCurrentPicture={this.setCurrentPicture}
                    dataSrc={cekImageExt(picture) ? picture : null}
                  />
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
  data: state.atribut
});

export default reduxForm({
  form: 'createAtributForm',
  validate
})(
  connect(mapStateToProps, { createData, nullPicture })(
    withRouter(AtributCreate)
  )
);
