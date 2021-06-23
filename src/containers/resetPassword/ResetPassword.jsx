/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { newPassword } from '../../actions/auth.action';
import ButtonLoader from '../../components/ButtonLoader';

const styleInput = {
  height: 45
};

const renderField = ({
  input,
  placeholder,
  type
  // meta: { touched, error }
}) => (
  <input
    {...input}
    placeholder={placeholder}
    style={styleInput}
    type={type}
    className="form-control pl-0"
  />
);

export const required = value => (value ? undefined : 'Required');

export const emailValid = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password'
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const { newPassword, location } = this.props;
    const key = location.search.replace('?key=', '');
    newPassword(Object.assign(values, { key }));
  }

  showPassword = () => {
    const { type } = this.state;

    if (type === 'password') {
      this.setState({
        type: 'text'
      });
    } else {
      this.setState({
        type: 'password'
      });
    }
  };

  render() {
    const { handleSubmit, auth } = this.props;
    const { type } = this.state;
    const customWitdh = {
      style: {
        width: '60px'
      }
    };

    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper auth-page">
          <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
            <div className="row w-100">
              <div className="col-md-5 mx-auto">
                <div className="auto-form-wrapper">
                  <div className="text-center mb-3">
                    <img src="/public/images/icon/logo.png" alt="" />
                    <h3>SUPERADMIN</h3>
                  </div>
                  <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-lock" />
                          </span>
                        </div>
                        <Field
                          name="password"
                          type={type}
                          component={renderField}
                          placeholder="Password"
                          validate={[required]}
                          onKeyPress={event => {
                            if (event.key === 'Enter') {
                              this.onSubmit();
                            }
                          }}
                        />
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text right"
                            id="basic-addon1"
                            {...customWitdh}
                          >
                            <i
                              className="fa fa-eye show-password"
                              onClick={this.showPassword}
                            />
                          </span>
                        </div>
                      </div>
                      {/* {touched && error && <small className="text-danger">{error}</small>} */}
                    </div>

                    {auth.errorMessage && (
                      <div className="form-group form-login-input">
                        <small className="text-danger">
                          {auth.errorMessage}
                        </small>
                      </div>
                    )}
                    <div className="form-group">
                      <ButtonLoader
                        loader={auth.isLoading}
                        type="submit"
                        style={styleInput}
                        className="btn btn-green-dark text-white btn-block"
                      >
                        Reset
                      </ButtonLoader>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default reduxForm({
  form: 'ResetPasswordForm' // a unique identifier for this form
})(connect(mapStateToProps, { newPassword })(ResetPassword));
