/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
// import { FormGroup } from 'reactstrap';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import {
  renderField,
  required,
  textAreaField,
  normalizeNumberWithLimit
} from '../../components/Field';
import ButtonLoader from '../../components/ButtonLoader';
import PageLoader from '../../components/PageLoader';
import { updateData, detailData } from '../../actions/user.action';
import SelectProvCityDist from '../../components/select/SelectProvCityDist';
import ButtonBack from '../../components/button/ButtonBack';

const validate = values => {
  const errors = {};
  if (values.password) {
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Password mismatched';
    }
  }
  return errors;
};

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;
    const initInput = [
      'name',
      'email',
      'address',
      // 'password',
      'zip_code',
      'phone',
      'province_id',
      'city_id',
      'district_id'
    ];
    if (data.dataDetail !== nextProps.data.dataDetail) {
      initInput.map(data => {
        dispatch(change('editUserForm', data, nextProps.data.dataDetail[data]));
      });

      // handle phone number
      if (nextProps.data.dataDetail.phone) {
        let phoneNumber = '';
        if (nextProps.data.dataDetail.phone.includes('+')) {
          phoneNumber = parsePhoneNumberFromString(
            nextProps.data.dataDetail.phone
          );
        } else {
          phoneNumber = parsePhoneNumberFromString(
            `+${nextProps.data.dataDetail.phone}`
          );
        }
        // const codePhone = phoneNumber && phoneNumber.countryCallingCode;
        const nationalPhone = phoneNumber && phoneNumber.nationalNumber;
        dispatch(change('editUserForm', 'codePhone', '+62'));
        dispatch(change('editUserForm', 'phone', nationalPhone || ''));
      }
    }
  }

  onChangeCategory = () => {
    const { dispatch } = this.props;
    dispatch(change('editUserForm', 'city_id', null));
  };

  onChangeCity = () => {
    const { dispatch } = this.props;
    dispatch(change('editUserForm', 'district_id', null));
  };

  onSubmit(value) {
    const obj = {};
    obj.name = value.name;
    obj.address = value.address;
    obj.email = value.email;
    obj.zip_code = value.zip_code;
    obj.password = value.password;
    obj.status = true;
    if (value.phone) {
      obj.phone = `${value.codePhone}${value.phone}`;
    }

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

    const { updateData, match } = this.props;
    updateData(obj, match.params.id);
  }

  render() {
    const { handleSubmit, data } = this.props;
    // console.log('tesstss', data);
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-3">
                <ButtonBack>EDIT USER</ButtonBack>
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
                    {data.dataDetail && (
                      <SelectProvCityDist
                        valueProvince={data.dataDetail.province_id}
                        valueCity={data.dataDetail.city_id}
                        validate={[required]}
                        onChangeCategory={this.onChangeCategory}
                        onChangeCity={this.onChangeCity}
                      />
                    )}
                    <ButtonLoader
                      type="submit"
                      className="btn btn-green-dark text-white mt-3 ml-3"
                      loader={data.isLoading}
                    >
                      Save
                    </ButtonLoader>
                  </div>
                  <div className="col-md-5 pl-5">
                    <Field
                      name="zip_code"
                      type="number"
                      component={renderField}
                      label="Zipcode"
                      id="inputZipcode"
                      placeholder="Zipcode"
                      min={0}
                    />
                    <Field
                      name="email"
                      type="email"
                      component={renderField}
                      label="Email Address"
                      id="inputEmail"
                      placeholder="user@email.com"
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
                          validate={[required]}
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
                          validate={[required]}
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
  data: state.user
  // current: state.auth.data
});

export default reduxForm({
  form: 'editUserForm', // a unique identifier for this form
  validate
})(connect(mapStateToProps, { updateData, detailData })(UserEdit));
