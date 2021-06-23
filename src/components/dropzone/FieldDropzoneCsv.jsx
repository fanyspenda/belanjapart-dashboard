/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';
import { uploadFile } from '@actions/file.action';
import { message } from 'antd';

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
    const {
      uploadFile,
      path,
      toggle,
      nullFile,
      pagination,
      code,
      typeCsv
    } = this.props;
    const formData = new FormData();
    let futurePage = 1;
    if (pagination) {
      futurePage =
        pagination.lastPage * pagination.recordPerPage === pagination.count
          ? pagination.lastPage + 1
          : pagination.lastPage;
    }
    formData.append('file', files[0]);
    if (files.length === 0) {
      return message.warning(`File doesn't supported`);
    }

    const tempFile = files[0].name.split('.');
    if (tempFile[tempFile.length - 1].toLowerCase() !== 'csv') {
      return message.warning(`File doesn't supported`);
    }

    if (path === 'secondary_product') {
      formData.append('product_code', code);
      uploadFile(formData, path, 1, code).then(() => {
        toggle();
        nullFile();
      });
    } else if (path === 'product') {
      if (!typeCsv) {
        message.warning('Please select type for csv first');
      } else {
        uploadFile(formData, typeCsv, 1, code).then(() => {
          toggle();
          nullFile();
          this.props.handleChangeType(null);
        });
      }
    } else {
      uploadFile(formData, path, 1, code).then(() => {
        toggle();
        nullFile();
      });
    }
    // console.log(files);
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
            // maxSize={2000000}
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
  file: state.fileupload
});

export default connect(mapStateToProps, { uploadFile })(FieldDropzoneUpload);
