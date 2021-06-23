/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import { createPicture as createPdf } from '@actions/file.action';
import { message } from 'antd';
import { validateImage } from '@helpers/image';

const RenderImage = ({ data, imagePreview }) =>
  data && data.path !== process.env.URL_FILE ? (
    <div className="dropzone-holder-image">
      {imagePreview(data)}
      <div className="dropzone-holder-label">
        <img alt="thumbnail" src="/public/images/icon/Group 1717.png" />
        <p className="text-muted">Update image. max 2mb</p>
      </div>
    </div>
  ) : (
    <div className="border-dash">
      <img alt="thumbnail" src="/public/images/icon/Group 1717.png" />
      <p className="text-muted">Drag and drop to upload</p>
    </div>
  );

const ProgressBar = ({ value }) => (
  <Progress value={value} color="success" className="progress-xl m-3">
    {`${value}%`}
  </Progress>
);

class FieldDropzoneUpload2D extends Component {
  componentDidUpdate() {
    const { file, handleFileDrop } = this.props;
    if (file.data) {
      handleFileDrop(file.data);
    }
  }

  imagePreview = data => (
    <img
      className="img-fluid"
      style={{ maxHeight: 200 }}
      src={data.path}
      alt={data.name}
    />
  );

  handleDrop = files => {
    const { createPdf, typePdf } = this.props;
    const formData = new FormData();

    if (files.length === 0) {
      return message.warning(`File doesn't supported`);
    }
    const tempFile = files[0].name.split('.');
    if (!validateImage(tempFile[tempFile.length - 1].toLowerCase())) {
      return message.warning(`File doesn't supported`);
    }

    formData.append('type', typePdf);

    formData.append('file', files[0], files[0].name);
    createPdf(formData);
    // console.log(files);
  };

  render() {
    const { file, disabled, dataSrc, required = false } = this.props;
    console.log(this.props)
    return (
      <div className="pb-3">
        <p>Upload 2D (.JPG/PNG only max 10 MB) *</p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={10000000}
            accept=".jpg, .jpeg, .png, .JPG, .JPEG, .PNG"
            multiple={false}
            disabled={disabled}
          >
            {file.isLoading ? (
              <ProgressBar value={file.progress} />
            ) : (
              <RenderImage
                data={file.data || dataSrc}
                imagePreview={this.imagePreview}
              />
            )}
          </Dropzone>
        </div>
        {required ? <span className="form-error">Required</span> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file
});

export default connect(mapStateToProps, { createPdf })(FieldDropzoneUpload2D);
