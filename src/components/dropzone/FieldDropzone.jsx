/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class FieldDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  imagePreview(files) {
    if (typeof files === 'string') {
      return <img height="180" src={files} alt="" />;
    }
    return <img height="180" src={files.preview} alt={files.name} />;
  }

  render() {
    const {
      input,
      name,
      meta: { error, warning, touched },
      label,
      requiredStar,
      disabled
    } = this.props;
    const files = input.value;
    return (
      <div className="pb-3">
        <p>
          {label}
          {requiredStar === true ? (
            <span className="text-required"> *</span>
          ) : (
            ''
          )}
        </p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            name={name}
            onDrop={filesToUpload => input.onChange(filesToUpload[0])}
            maxSize={2000000}
            accept="image/jpeg, image/png, image/jpg"
            multiple={false}
            disabled={disabled}
          >
            {files ? (
              <div className="dropzone-holder-image">
                {this.imagePreview(files)}
                <div className="dropzone-holder-label">
                  <img alt="" src="/public/images/icon/Group 1717.png" />
                  <p className="text-muted">Update image. max 2mb</p>
                </div>
              </div>
            ) : (
              <div className="border-dash">
                <img alt="" src="/public/images/icon/Group 1717.png" />
                <p className="text-muted">Drag and drop to upload</p>
              </div>
            )}
          </Dropzone>
          {touched &&
            ((error && <span className="form-error">{error}</span>) ||
              (warning && <span className="form-error">{warning}</span>))}
        </div>
      </div>
    );
  }
}

export default FieldDropzone;
