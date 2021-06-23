/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { FormGroup } from 'reactstrap';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import {
  renderField,
  required,
  textAreaField,
  emailValid,
  normalizeNumberWithLimit
} from '../../components/Field';
import ButtonLoader from '../../components/ButtonLoader';
import { createData } from '../../actions/user.action';
// import SelectCity from '../../components/select/SelectCity';
// import SelectDistrict from '../../components/select/SelectDistrict';
// import SelectProvince from '../../components/select/SelectProvince';
import SelectProvCityDist from '../../components/select/SelectProvCityDist';
import ButtonBack from '../../components/button/ButtonBack';

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password mismatched';
  }

  return errors;
};
class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(change('createUserForm', 'codePhone', '+62'));
  }

  onChangeCategory = () => {
    const { dispatch } = this.props;
    dispatch(change('createUserForm', 'city_id', null));
  };

  onChangeCity = () => {
    const { dispatch } = this.props;
    dispatch(change('createUserForm', 'district_id', null));
  };

  onSubmit(value) {
    const obj = {};
    obj.name = value.name;
    obj.address = value.address;
    obj.email = value.email;
    obj.zip_code = value.zip_code;
    obj.password = value.password;
    obj.status = true;
    obj.phone = `${value.codePhone}${value.phone || ''}`;

    if (typeof value.city_id === 'object') {
      obj.city_id = value.city_id.value;
    } else {
      obj.city_id = value.city_id;
    }

    if (typeof value.district_id === 'object') {
      obj.district_id = value.district_id.value;
    } else {
      obj.district_id = value.district_id;
    }

    if (typeof value.province_id === 'object') {
      obj.province_id = value.province_id.value;
    } else {
      obj.province_id = value.province_id;
    }

    const { createData } = this.props;
    createData(obj);
  }

  render() {
    const { handleSubmit, data } = this.props;
    // console.log('test', data);
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-3">
                <ButtonBack>CREATE NEW USER</ButtonBack>
              </div>
            </div>
            <form
              className="forms-sample pl-5 pt-3"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <div className="row">
                <div className="col-md-5">
                  <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Full Name"
                    id="inputName"
                    placeholder="Input User Full Name"
                    validate={[required]}
                  />
                  <Field
                    name="address"
                    type="text"
                    component={textAreaField}
                    label="Address"
                    id="inputAddress"
                    placeholder="Input Address"
                    validate={[required]}
                  />
                  <SelectProvCityDist
                    validate={[required]}
                    onChangeCategory={this.onChangeCategory}
                    onChangeCity={this.onChangeCity}
                  />
                </div>
                <div className="col-md-5 pl-5">
                  <Field
                    name="zipcode"
                    type="number"
                    component={renderField}
                    label="Zipcode"
                    id="inputZipcode"
                    placeholder="Zipcode"
                    validate={[required]}
                    min={0}
                  />
                  <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email Address"
                    id="inputEmail"
                    placeholder="user@email.com"
                    validate={[required, emailValid]}
                  />
                  <div className="row">
                    <div className="col-md-12 mb-0">
                      <div className="form-group mb-0">
                        <label htmlFor="handphone">Handphone Number</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <Field
                        name="codePhone"
                        type="text"
                        component={renderField}
                        noLabel
                        id="inputPhone"
                        placeholder="+62"
                        disabled
                        // normalize={normalizeNumberWithLimit(2)}
                      />
                    </div>
                    <div className="col-md-8 pl-0">
                      <Field
                        name="phone"
                        type="text"
                        noLabel
                        component={renderField}
                        id="inputPhone"
                        placeholder="8xxxxxxx"
                        normalize={normalizeNumberWithLimit(20)}
                      />
                    </div>
                  </div>
                  <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password"
                    id="inputPassword"
                    placeholder="Input Password"
                  />
                  <Field
                    name="confirmPassword"
                    type="password"
                    component={renderField}
                    label="Confirm Password"
                    id="inputConfirmPassword"
                    placeholder="Input Confirm Password"
                  />
                  <ButtonLoader
                    type="submit"
                    className="btn btn-green-dark text-white mt-3 ml-3 align-items-end"
                    loader={data.isLoading}
                  >
                    + Create New User
                  </ButtonLoader>
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
  data: state.user
});

export default reduxForm({
  form: 'createUserForm', // a unique identifier for this form
  validate
})(connect(mapStateToProps, { createData })(UserCreate));
