import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullFile } from '@actions/file.action';
import FieldDropzoneCsv from '@components/dropzone/FieldDropzoneCsv';
import { reduxForm } from 'redux-form';

class ModalCsv extends Component {
  handleToggle = callback => {
    const { toggle, handleChangeType } = this.props;
    toggle();
    callback();
    if (handleChangeType) {
      handleChangeType(null);
    }
  };

  render() {
    const { nullFile, SelectType, handleChangeType, optType } = this.props;
    // console.log('datas', dataSrc);
    return (
      <Fragment>
        <ModalHeader className="modal-head-product" />
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <FieldDropzoneCsv {...this.props} />
            </div>
            {optType && (
              <div className="col-md-12">
                <SelectType
                  opt={optType}
                  onChange={e => handleChangeType(e.value)}
                />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="modal-foot border border-0">
          <div className="row text-center">
            <div className="col-md-6">
              <Button
                type="button"
                className="btn btn-green-dark text-white"
                onClick={() => this.handleToggle(nullFile)}
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

export default reduxForm({ form: 'formSecondaryBulk' })(
  connect(null, { nullFile })(ModalCsv)
);
