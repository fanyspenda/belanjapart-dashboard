/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { createPictureBulk } from '@actions/file.action';
import { Progress } from 'reactstrap';
import { message } from 'antd';

const ProgressBar = ({ value }) => (
  <Progress value={value} color="success" className="progress-xl m-3">
    {`${value}%`}
  </Progress>
);
class FieldDropzoneUpload extends Component {
  handleDrop = files => {
    const {
      createPictureBulk,
      toggle,
      nullPicture,
      typeImage,
      handleChangeType
    } = this.props;

    // combinePictures(files);
    // toggle();
    // console.log('picture', pictures);
    // if (files.length > 0) {
    //   files.forEach((element, i) => {
    //     const formData = new FormData();
    //     // formData.append(`files[${i}][files]`, element);
    //     formData.append('type', typePicture);
    //     formData.append('file', files[i], files[i].name);
    //     // console.log('formdata', formData);
    //     createPicture(formData);
    //   });
    // }
    if (typeImage) {
      if (files.length > 0) {
        const formData = new FormData();
        formData.append('type', typeImage);
        for (const key in files) {
          formData.append('file', files[key]);
        }
        createPictureBulk(formData).then(() => {
          toggle();
          handleChangeType(null);
          nullPicture();
        });
      } else {
        message.warning(`File doesn't supported`);
      }
    } else {
      message.warning('Please select type for image first');
    }
  };

  render() {
    const { disabled, file } = this.props;
    return (
      <div className="pb-3">
        <p className="font-weight-bold text-center">
          Upload Bulk Gambar (.jpg/.png only max 1 mb)
        </p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={10000000}
            accept="image/jpeg, image/png, image/jpg"
            multiple
            disabled={disabled}
          >
            {file.isLoading ? (
              <ProgressBar value={file.progress} />
            ) : (
              <div className="border-dash">
                <img alt="thumbnail" src="/public/images/icon/Group 1717.png" />
                <p className="text-muted">Drag and drop to upload</p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, { createPictureBulk })(FieldDropzoneUpload);
