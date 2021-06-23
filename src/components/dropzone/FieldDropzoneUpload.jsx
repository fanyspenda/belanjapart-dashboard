/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import { createPicture } from '@actions/file.action';

const RenderImage = ({ data, imagePreview }) =>
  data ? (
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

class FieldDropzoneUpload extends Component {
  state = {};

  componentDidUpdate() {
    const { file, handleFileDrop } = this.props;
    if (file.data) {
      handleFileDrop(file.data);
    }
  }

  imagePreview = data => (
    <img
      className="img-fluid"
      style={{ maxHeight: 200, width: '-webkit-fill-available' }}
      src={data.path}
      alt={data.name}
    />
  );

  handleDrop = files => {
    const { createPicture, typePicture } = this.props;
    const formData = new FormData();

    formData.append('type', typePicture);

    formData.append('file', files[0], files[0].name);
    createPicture(formData);
    // console.log(files);
  };

  render() {
    const {
      file,
      disabled,
      dataSrc,
      required = false,
      meta: { touched, error, warning }
    } = this.props;
    const customStyle = {
      style: {
        // width: '370px',
        height: '200px'
      }
    };
    return (
      <div className="pb-3">
        <p>Upload Image (.png/.jpg only max 300 kb)</p>
        <div
          className={`dropzone-ui border ${disabled && 'disabled'}`}
          {...customStyle}
        >
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={2000000}
            accept="image/jpeg, image/png, image/jpg"
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
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file
});

export default connect(mapStateToProps, { createPicture })(FieldDropzoneUpload);
