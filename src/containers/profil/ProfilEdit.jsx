/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  renderField,
  required,
  renderSelectInput,
  emailValid
} from '../../components/Field';
import ButtonLoader from '../../components/ButtonLoader';
import PageLoader from '../../components/PageLoader';
import { updateData, detailData } from '../../actions/admin.action';
import SelectRole from '../../components/select/SelectRole';
import ButtonBack from '../../components/button/ButtonBack';
// import FieldDropzone from '../../components/dropzone/FieldDropzone';

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

class ProfilEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
    this.dispatchChange = _.debounce(this.dispatchChange, 500);
  }

  componentDidMount() {
    const { detailData, match, data } = this.props;
    if (!data.current) {
      window.location.href = '/transaction';
    }
    if (data.current) {
      if (data.current.role_slug === 'admin') {
        this.dispatchChange();
      } else if (data.current.role_slug === 'superadmin') {
        detailData(match.params.id);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;
    const initInput = ['name', 'email'];
    if (data.dataDetail !== nextProps.data.dataDetail) {
      initInput.map(data => {
        dispatch(
          change('editAdminForm', data, nextProps.data.dataDetail[data])
        );
      });
    }
  }

  onSubmit(value) {
    const obj = value;
    // if (typeof value.status === 'object') {
    //   obj.status = value.status.value;
    // } else {
    //   obj.status = value.status;
    // }

    // if (typeof value.role_id === 'object') {
    //   obj.role_id = value.role_id.value;
    // } else {
    //   obj.role_id = value.role_id;
    // }
    // console.log(obj)
    const { updateData, match } = this.props;
    updateData(obj, match.params.id);
  }

  dispatchChange = () => {
    const { data, dispatch } = this.props;
    const initInput = ['name', 'email'];
    initInput.map(val => {
      dispatch(change('editAdminForm', val, data.current[val]));
    });
  };

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-3">
                <h4 className="font-weight-bold mb-0">EDIT PROFILE</h4>
              </div>
            </div>
            {data.isLoadingDetail &&
            data.current &&
            data.current.role_slug === 'superadmin' ? (
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
                      requiredStar
                      type="text"
                      component={renderField}
                      label="Name"
                      id="inputName"
                      placeholder="Enter Name"
                      validate={[required]}
                    />

                    <ButtonLoader
                      type="submit"
                      className="btn btn-green-dark text-white mt-3 ml-3"
                      loader={data.isLoading}
                    >
                      Save
                    </ButtonLoader>
                  </div>
                  <div className="col-md-6">
                    <Field
                      name="email"
                      requiredStar
                      type="email"
                      component={renderField}
                      label="Email"
                      id="inputEmail"
                      placeholder="Enter Email"
                      validate={[required, emailValid]}
                    />
                    {/* <Field
                      name="status"
                      component={renderSelectInput}
                      requiredStar
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
                      placeholder="Select status"
                      validate={[required]}
                    />
                    <SelectRole validate={[required]} /> */}
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
  data: state.admin
});

export default reduxForm({
  form: 'editAdminForm', // a unique identifier for this form
  validate
})(connect(mapStateToProps, { updateData, detailData })(ProfilEdit));
