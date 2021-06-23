/* eslint-disable prettier/prettier */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React, { Component, Fragment } from 'react';
import { Field, reduxForm, change, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import { updateData, detailData } from '@actions/fee.action';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';
import PageLoader from '@components/PageLoader';
import { debounce } from 'lodash';

const renderInputField = ({
  input,
  placeholder,
  type,
  step,
  hidden,
  min,
  meta: { touched, error, warning }
}) => (
  <div className="col" style={{ display: hidden ? 'none' : 'block' }}>
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
    if (fields.length === 0) {
      // fields.removeAll();
      fields.push();
    }
  }

  handleDeleteField = index => {
    const { fields, handleDeleteExpedition } = this.props;
    const tempField = fields.get(index);
    if(tempField.id){
      handleDeleteExpedition(tempField);
    }
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
                    <h6>Input Expedition</h6>
                  </div>
                  <Field
                    name={`${range}.name`}
                    type="text"
                    component={renderInputField}
                    placeholder="expedition name"
                  />{' '}
                  -{' '}
                  <Field
                    name={`${range}.price`}
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

class AtributEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      deletedExpedition: []
    }

    this.changeUrl = debounce(this.changeUrl, 1000);
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;
    if (data.dataDetail !== nextProps.data.dataDetail) {
      const dispatchEdit = (name, data) =>
        dispatch(change('editFeeForm', name, data));

      dispatchEdit('name', nextProps.data.dataDetail.name)
      dispatchEdit('expedisi', nextProps.data.dataDetail.expedisi);
    }
  }

  changeUrl = () => {
    window.location.href = '/master/fee';
  }

  onSubmit = value => {
    const { deletedExpedition } = this.state;
    const obj = {
      name: '',
      expedisi: []
    };
    const { updateData, match } = this.props;

    obj.name = value.name;

    for (let index = 0; index < value.expedisi.length; index++) {
      obj.expedisi.push({
        name_kurir: value.expedisi[index].name,
        price: parseInt(value.expedisi[index].price),
        id: value.expedisi[index].id || '',
        is_deleted: false
      });
    }

    obj.expedisi = obj.expedisi.concat(deletedExpedition);
    updateData(match.params.id, obj).then(() => {
      this.changeUrl();
      this.setState({ deletedExpedition: [] });
    });
  };

  handleDeleteExpedition = val => {
    this.setState(prevState => {
      const { deletedExpedition } = prevState;

      deletedExpedition.push({
        name_kurir: val.name,
        price: val.price,
        id: val.id,
        is_deleted: true
      });

      return { deletedExpedition };
    })
  }

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>EDIT FEE</ButtonBack>
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
                    <FieldArray name="expedisi" component={renderTypeRange} handleDeleteExpedition={this.handleDeleteExpedition} />
                    <div className="row">
                      <div className="col-md-4">
                        <ButtonCancel>Cancel</ButtonCancel>
                      </div>
                      <div className="col-sm-8">
                        <ButtonLoader
                          type="submit"
                          className="btn btn-green-dark text-white mt-3 w-100"
                          loader={data.isLoading}
                        >
                          Save
                        </ButtonLoader>
                      </div>
                    </div>
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
  data: state.fee
});

export default reduxForm({
  form: 'editFeeForm'
})(connect(mapStateToProps, { updateData, detailData })(AtributEdit));
