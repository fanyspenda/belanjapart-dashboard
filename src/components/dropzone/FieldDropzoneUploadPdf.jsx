/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import { createPicture as createPdf } from '@actions/file.action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faDownload } from '@fortawesome/free-solid-svg-icons';

const RenderPdf = ({ data, pdfPreview }) =>
  data ? (
    <div className="dropzone-holder-image">
      {pdfPreview(data)}
      <div className="dropzone-holder-label">
        <p className="text-muted">Update pdf. max 10mb</p>
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

class FieldDropzoneUploadPdf extends Component {
  componentDidUpdate() {
    const { file, handleFileDrop } = this.props;
    if (file.data) {
      handleFileDrop(file.data);
    }
  }

  pdfPreview = data => (
    <div className="text-center my-3">
      <FontAwesomeIcon icon={faFilePdf} size="4x" />
      <h6 className="py-2">{data.name}</h6>
    </div>
  );

  handleDrop = files => {
    const { createPdf, typePdf } = this.props;
    const formData = new FormData();

    formData.append('type', typePdf);

    formData.append('file', files[0], files[0].name);
    createPdf(formData);
    // console.log(files);
  };

  render() {
    const { file, disabled, dataSrc, required = false } = this.props;
    return (
      <div className="pb-3">
        <p>Upload PDF (.pdf only max 10 MB) *</p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={10000000}
            accept="application/pdf"
            multiple={false}
            disabled={disabled}
          >
            {file.isLoading ? (
              <ProgressBar value={file.progress} />
            ) : (
              <RenderPdf
                data={file.data || dataSrc}
                pdfPreview={this.pdfPreview}
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

export default connect(mapStateToProps, { createPdf })(FieldDropzoneUploadPdf);
