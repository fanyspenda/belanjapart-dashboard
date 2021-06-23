import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import ButtonLoader from '../../../../../components/ButtonLoader';
import { renderField } from '../../../../../components/Field';

class ModalValue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  // onSubmit = value => {
  //   const { forgotPassReq, toggle } = this.props;
  //   // console.log(value);
  //   forgotPassReq(value).then(
  //     () => {
  //       toggle();
  //     },
  //     () => {}
  //   );
  // };

  render() {
    const { handleSubmit, data } = this.props;

    return (
      <form>
        <ModalHeader toggle={this.toggle} className="modal-head-product">
          <div className="row">
            <div className="col-md-12 pt-2">
              <p className="mb-0">INPUT VALUE ATTRIBUTES</p>
              <span>98474468</span>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-5">
              <p className="pt-2">Thread Size</p>
            </div>
            <div className="col-md-7 pl-0">
              <Field
                name="thread"
                type="text"
                // label="Email"
                component={renderField}
                placeholder="Input Thread Size"
                // validate={required}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="pt-2">Min Thick</p>
            </div>
            <div className="col-md-7 pl-0">
              <Field
                name="thick"
                type="text"
                // label="Email"
                component={renderField}
                placeholder="Input Min Thick"
                // validate={required}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <p className="pt-2">Dia(Head)</p>
            </div>
            <div className="col-md-7 pl-0">
              <Field
                name="head"
                type="text"
                // label="Email"
                component={renderField}
                placeholder="Input Dia (Head)"
                // validate={required}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="modal-foot border border-0">
          <div className="row text-center">
            <div className="col-md-6">
              <Button type="submit" className="btn btn-green-dark text-white">
                Save
              </Button>
            </div>
          </div>
        </ModalFooter>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product
});

export default reduxForm({
  form: 'formValue' // a unique identifier for this form
})(
  connect(mapStateToProps, {
    // forgotPassReq
  })(ModalValue)
);
