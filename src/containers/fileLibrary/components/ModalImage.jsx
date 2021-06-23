import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullPicture } from '@actions/fileLibrary.action';
import FieldDropzoneFile from '@components/dropzone/FieldDropzoneFile';
import { reduxForm } from 'redux-form';

class ModalImage extends PureComponent {
  state = {};

  render() {
    const { toggle, nullPicture } = this.props;
    return (
      <Fragment>
        <ModalHeader className="modal-head-product" />
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <FieldDropzoneFile {...this.props} {...this.state} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="modal-foot border border-0">
          <div className="row text-center">
            <div className="col-md-6">
              <Button
                type="button"
                className="btn btn-green-dark text-white"
                onClick={() => {
                  toggle();
                  nullPicture();
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Fragment>
    );
  }
}

export default reduxForm({ form: 'formImageBulk' })(
  connect(null, { nullPicture })(ModalImage)
);
