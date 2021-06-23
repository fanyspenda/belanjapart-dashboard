/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  renderField,
  required,
  renderSelectInput,
  emailValid
} from '../../components/Field';
import ButtonLoader from '../../components/ButtonLoader';
import { createData } from '../../actions/admin.action';
import SelectRole from '../../components/select/SelectRole';
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
class AdminCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {}

  onSubmit(value) {
    const obj = value;
    if (typeof value.status === 'object') {
      obj.status = value.status.value;
    } else {
      obj.status = value.status;
    }

    if (typeof value.role_id === 'object') {
      obj.role_id = value.role_id.value;
    } else {
      obj.role_id = value.role_id;
    }

    const { createData } = this.props;
    createData(obj);
  }

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>CREATE NEW ADMIN</ButtonBack>
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
                    label="Name"
                    id="inputName"
                    placeholder="Input Admin Name"
                    validate={[required]}
                  />
                  <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email"
                    id="inputEmail"
                    placeholder="admin@email.com"
                    validate={[required, emailValid]}
                  />
                  <Field
                    name="status"
                    component={renderSelectInput}
                    label="Status"
                    options={[
                      {
                        label: 'Active',
                        value: true
                      },
                      {
                        label: 'Inactive',
                        value: false
                      }
                    ]}
                    id="inputStatus"
                    placeholder="Choose status"
                    validate={[required]}
                  />
                  <ButtonLoader
                    type="submit"
                    className="btn btn-green-dark text-white mt-3 ml-3"
                    loader={data.isLoading}
                  >
                    + Create New Admin
                  </ButtonLoader>
                </div>
                <div className="col-md-5 pl-5">
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
                  <SelectRole validate={[required]} />
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
  data: state.admin
});

export default reduxForm({
  form: 'createAdminForm', // a unique identifier for this form
  validate
})(
  connect(
    mapStateToProps,
    { createData }
  )(AdminCreate)
);
