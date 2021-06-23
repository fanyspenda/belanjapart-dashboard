import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullFile } from '@actions/fee.action';
import FieldDropzoneCsvFee from '@components/dropzone/FieldDropzoneCsvFee';

class ModalCSV extends Component {
  handleToggle = callback => {
    this.props.toggle();
    callback();
  };

  render() {
    const { nullFile } = this.props;
    // console.log('datas', dataSrc);
    return (
      <Fragment>
        <ModalHeader className="modal-head-product" />
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <FieldDropzoneCsvFee {...this.props} />
            </div>
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

export default connect(null, { nullFile })(ModalCSV);
