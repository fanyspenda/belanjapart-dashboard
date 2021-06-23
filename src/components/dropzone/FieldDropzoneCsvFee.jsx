/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import { uploadFile } from '@actions/fee.action';

const RenderImage = ({ data }) =>
  data ? (
    <div className="border-dash">
      <i className="fa fa-file-csv fa-4x mb-3" />
      <p className="text-dark">Update file csv</p>
    </div>
  ) : (
    <div className="border-dash">
      <i className="fa fa-file-csv fa-4x mb-3 text-muted" />
      <p className="text-muted">Drag and drop to upload</p>
    </div>
  );

const ProgressBar = ({ value }) => (
  <Progress value={value} color="success" className="progress-xl m-3">
    {`${value}%`}
  </Progress>
);

class FieldDropzoneUpload extends Component {
  handleDrop = files => {
    const { uploadFile, toggle, nullFile, pagination } = this.props;
    const formData = new FormData();
    let futurePage = 1;
    if (pagination) {
      futurePage =
        pagination.last_page * pagination.record_per_page === pagination.count
          ? pagination.last_page + 1
          : pagination.last_page;
    }

    formData.append('file', files[0]);
    uploadFile(formData, futurePage).then(() => {
      toggle();
      nullFile();
    });
  };

  render() {
    const { file, disabled, required = false } = this.props;
    return (
      <div className="pb-3">
        <p className="font-weight-bold text-center">Upload CSV File</p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={2000000}
            accept=".xlsx, .xls, .csv"
            multiple={false}
            disabled={disabled}
          >
            {file.isLoading ? (
              <ProgressBar value={file.progress} />
            ) : (
              <RenderImage data={file.data} />
            )}
          </Dropzone>
        </div>
        {required ? <span className="form-error">Required</span> : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.fee
});

export default connect(mapStateToProps, { uploadFile })(FieldDropzoneUpload);
