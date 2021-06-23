import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullPicture } from '@actions/file.action';
import FieldDropzoneUpload2D from '@components/dropzone/FieldDropzoneUpload2D';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faDownload } from '@fortawesome/free-solid-svg-icons';

export const Modal2DDetail = ({ dataPdf1s }) => {
  // console.log('testtt', dataImages.path);
  return (
    <Fragment>
      <ModalHeader className="modal-head-product">
        <div className="row">
          <div className="col-md-12 pt-2">
            <p className="mb-0">PDF 2D</p>
          </div>
        </div>
      </ModalHeader>
      <ModalBody className="modal-body-product">
        <div className="row">
          <a href={dataPdf1s.path} target="_blank" className="ml-5 pl-5">
            <FontAwesomeIcon icon={faFilePdf} size="4x" />
            <p>Preview</p>
          </a>
        </div>
      </ModalBody>
      <ModalFooter className="modal-foot border border-0">
        <div className="row text-center">
          <div className="col-md-6">
            {/* <Button className="btn btn-green-dark text-white">Save</Button> */}
          </div>
        </div>
      </ModalFooter>
    </Fragment>
  );
};

class Modal2D extends PureComponent {
  state = {
    imageRequired: false
  };

  componentDidMount() {
    // console.log('didMount called', this.props.index);
  }

  render() {
    const {
      index,
      pdf1,
      updateField,
      toggle,
      nullPicture,
      handleFileDrop,
      dataSrc
    } = this.props;
    return (
      <Fragment>
        <ModalHeader className="modal-head-product">
          <div className="row">
            <div className="col-md-12 pt-2">
              <p className="mb-0">INPUT FILE 2D</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <FieldDropzoneUpload2D
                handleFileDrop={handleFileDrop}
                typePdf="product"
                required={this.state.imageRequired}
                dataSrc={dataSrc}
              />
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
                  updateField(index, 'pdf1', pdf1);
                  toggle();
                  nullPicture();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </ModalFooter>
      </Fragment>
    );
  }
}

export default connect(null, { nullPicture })(Modal2D);
