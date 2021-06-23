/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { uploadBulk } from '@actions/fileLibrary.action';
import { Progress } from 'reactstrap';
import { message } from 'antd';

const ProgressBar = ({ value }) => (
  <Progress value={value} color="success" className="progress-xl m-3">
    {`${value}%`}
  </Progress>
);
class FieldDropzoneUpload extends Component {
  handleDrop = files => {
    const { uploadBulk, toggle, nullPicture, typeImage } = this.props;

    if (files.length > 0) {
      const formData = new FormData();
      formData.append('type', typeImage);
      for (const key in files) {
        formData.append('file', files[key]);
      }
      uploadBulk(formData).then(() => {
        toggle();
        nullPicture();
      });
    } else {
      message.warning(`File doesn't supported`);
    }
  };

  render() {
    const { disabled, fileLibrary } = this.props;
    return (
      <div className="pb-3">
        <p className="font-weight-bold text-center">
          Upload Bulk File 2D and 3D
        </p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={10000000}
            multiple
            disabled={disabled}
          >
            {fileLibrary.isLoading ? (
              <ProgressBar value={fileLibrary.progress} />
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
  fileLibrary: state.fileLibrary
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, { uploadBulk })(FieldDropzoneUpload);
