/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { loginUser, forgotPassword } from '../../actions/auth.action';
import { getToken } from '../../actions/firebase.action';
import ButtonLoader from '../../components/ButtonLoader';

export let globalFcmToken = '';

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      type: 'password'
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.getToken();
  }

  onSubmit(values) {
    const { loginUser } = this.props;
    loginUser(Object.assign(values, { token_notif: window.fcnToken }));
  }

  onSubmitEmail = () => {
    const { forgotPassword } = this.props;
    const doc = document.getElementById('emailRequest');
    const obj = {
      email: doc.value
    };
    forgotPassword(obj);
    this.setState({
      modal: !this.state.modal
    });
  };

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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

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
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-envelope" />
                          </span>
                        </div>
                        <Field
                          name="email"
                          type="email"
                          component={renderField}
                          placeholder="Email"
                          validate={[required, emailValid]}
                        />
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text right"
                            id="basic-addon1"
                            {...customWitdh}
                          />
                        </div>
                      </div>
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
                    <p className="forgot-pass text-right">
                      Forgot &nbsp;
                      <a href="#" onClick={this.toggle}>
                        Password?
                      </a>
                    </p>
                    <div className="form-group">
                      <ButtonLoader
                        loader={auth.isLoading}
                        type="submit"
                        style={styleInput}
                        className="btn btn-green-dark text-white btn-block"
                      >
                        Login
                      </ButtonLoader>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="text-center pt-5">
          <Modal
            size="sm"
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle} className="modal-head">
              <div className="row">
                <div className="col-md-12 pt-2">
                  <p>
                    Enter your email and we will email you a link to reset your
                    password
                  </p>
                </div>
              </div>
            </ModalHeader>
            <ModalBody className="modal-bod">
              <div className="row">
                <div className="col-md-12">
                  <form>
                    <div className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="fa fa-envelope" />
                          </span>
                        </div>
                        <input
                          id="emailRequest"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text right"
                            id="basic-addon1"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="modal-foot border border-0">
              <div className="row text-center mx-auto">
                <div className="col-md-12">
                  <Button
                    type="submit"
                    onClick={this.onSubmitEmail}
                    className="btn-send text-white"
                  >
                    SEND
                  </Button>{' '}
                  <Button className="btn-cancel" onClick={this.toggle}>
                    CANCEL
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  firebase: state.firebase
});

export default reduxForm({
  form: 'loginForm' // a unique identifier for this form
})(connect(mapStateToProps, { loginUser, forgotPassword, getToken })(Login));
