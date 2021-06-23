/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone';

class FieldDropzoneAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0
    };
  }

  imagePreview(files) {
    if (typeof files === 'string') {
      return (
        <audio controls key={this.state.key}>
          <track kind="captions" {...this.props} />
          <source src={files} />
        </audio>
      );
    }
    return (
      <Fragment>
        <audio controls key={this.state.key}>
          <track kind="captions" {...this.props} />
          <source src={files.preview} />
        </audio>
        {files.name && <p>{files.name}</p>}
      </Fragment>
    );
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
      <div className="pb-4">
        <p>
          {label}
          {requiredStar === true ? (
            <span className="text-required"> *</span>
          ) : (
            ''
          )}
        </p>
        {this.imagePreview(files)}

        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            name={name}
            onDrop={filesToUpload => {
              this.setState(state => ({
                key: state.key + 1
              }));
              input.onChange(filesToUpload[0]);
            }}
            accept="audio/mpeg, audio/ogg, audio/mp3"
            multiple={false}
            disabled={disabled}
          >
            {files ? (
              <div className="border-dash">
                <img
                  alt=""
                  src="/public/images/icon/cloud-backup-up-arrow.png"
                />
                <p>Choose or drop Audio</p>
              </div>
            ) : (
              <div className="border-dash">
                <img
                  alt=""
                  src="/public/images/icon/cloud-backup-up-arrow.png"
                />
                <p>Choose or drop Audio</p>
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

export default FieldDropzoneAudio;
