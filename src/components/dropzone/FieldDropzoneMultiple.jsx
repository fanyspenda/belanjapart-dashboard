/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import ListImageCard from './ListImageCard';

class FieldDropzoneMultiple extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      input,
      name,
      meta: { error, warning, touched },
      label,
      requiredStar
    } = this.props;
    const files = input.value;
    return (
      <div className="pt-2">
        <p className="white">
          {label}
          {requiredStar === true ? (
            <span className="text-required">*</span>
          ) : (
            ''
          )}
        </p>
        <div className="dropzone-ui">
          <Dropzone
            className="dropzone-input-ui"
            name={name}
            onDrop={filesToUpload => {
              if (files === '') {
                input.onChange(filesToUpload);
              } else {
                input.onChange(filesToUpload.concat(files));
              }
            }}
            maxSize={2000000}
            accept="image/jpeg, image/png, image/jpg"
          >
            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (isDragActive) {
                return (
                  <div className="border-dash">
                    <img
                      alt=""
                      src="/public/assets/cloud-backup-up-arrow.png"
                    />
                    <p>This file is authorized</p>
                  </div>
                );
              }
              if (isDragReject) {
                return (
                  <div className="border-dash">
                    <img
                      alt=""
                      src="/public/assets/cloud-backup-up-arrow.png"
                    />
                    <p>This file is not authorized</p>
                  </div>
                );
              }
              return acceptedFiles.length || rejectedFiles.length ? (
                <div className="border-dash">
                  <img alt="" src="/public/images/icon/Group 1717.png" />
                  <p className="text-muted">Update image. max 2mb</p>
                </div>
              ) : (
                <div className="border-dash">
                  <img alt="" src="/public/images/icon/Group 1717.png" />
                  <p className="text-muted">Drag and drop to upload</p>
                </div>
              );
            }}
          </Dropzone>
          <div className="dropzone-list-thumbnail">
            {files && Array.isArray(files) && (
              <div className="row mt-3">
                {files.map((file, i) => (
                  <div className="col-md-6 mb-3" key={i}>
                    <ListImageCard file={file} {...this.props} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {touched &&
          ((error && <span className="form-error">{error}</span>) ||
            (warning && <span className="form-error">{warning}</span>))}
      </div>
    );
  }
}

export default FieldDropzoneMultiple;
