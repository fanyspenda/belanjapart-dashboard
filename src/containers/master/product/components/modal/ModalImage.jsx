import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { nullPicture } from '@actions/file.action';
import FieldDropzoneUpload from '@components/dropzone/FieldDropzoneUpload';
import { Field } from 'redux-form';

export const ModalImageDetail = ({ dataImages }) => {
  // console.log('testtt', dataImages.path);
  return (
    <Fragment>
      <ModalHeader className="modal-head-product">
        <div className="row">
          <div className="col-md-12 pt-2">
            <p className="mb-0">Images</p>
          </div>
        </div>
      </ModalHeader>
      <ModalBody className="modal-body-product">
        <div className="row">
          <img
            className="img-fluid"
            src={dataImages.path}
            alt="images secondary"
          />
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

class ModalImage extends PureComponent {
  state = {
    imageRequired: false
  };

  componentDidMount() {
    // const { dataSrc } = this.props;
  }

  render() {
    const {
      index,
      picture,
      updateField,
      toggle,
      nullPicture,
      handleFileDrop,
      dataSrc
    } = this.props;
    // console.log('datas', dataSrc);
    return (
      <Fragment>
        <ModalHeader className="modal-head-product">
          <div className="row">
            <div className="col-md-12 pt-2">
              <p className="mb-0">UPLOAD IMAGE (.jpg/.png only max 1 mb)</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="modal-body-product">
          <div className="row">
            <div className="col-md-12">
              <Field
                name="picture_id"
                type="text"
                component={FieldDropzoneUpload}
                id="inputImage"
                handleFileDrop={handleFileDrop}
                typePicture="product"
                dataSrc={dataSrc}
                required={this.state.imageRequired}
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
                  updateField(index, 'image', picture);
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

export default connect(null, { nullPicture })(ModalImage);
