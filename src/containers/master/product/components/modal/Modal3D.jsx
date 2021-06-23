import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullPicture } from '@actions/file.action';
import FieldDropzoneUpload3D from '@components/dropzone/FieldDropzoneUpload3D';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faDownload } from '@fortawesome/free-solid-svg-icons';

export const Modal3DDetail = ({ dataPdf2s }) => {
  // console.log('testtt', dataImages.path);
  return (
    <Fragment>
      <ModalHeader className="modal-head-product">
        <div className="row">
          <div className="col-md-12 pt-2">
            <p className="mb-0">PDF 3D</p>
          </div>
        </div>
      </ModalHeader>
      <ModalBody className="modal-body-product">
        <div className="row">
          <a href={dataPdf2s.path} target="_blank" className="ml-5 pl-5">
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

class Modal3D extends PureComponent {
  state = {
    imageRequired: false
  };

  componentDidMount() {
    // console.log('didMount called', this.props.index);
  }

  render() {
    const {
      index,
      pdf2,
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
              <p className="mb-0">INPUT FILE 3D</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <FieldDropzoneUpload3D
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
                  updateField(index, 'pdf2', pdf2);
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

export default connect(null, { nullPicture })(Modal3D);
