/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
// import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
// import { createPicture } from '@actions/file.action';
import { Upload, Icon, Modal } from 'antd';
import 'antd/dist/antd.css';
// import { createPicture } from '@actions/file.action';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class FieldAntdUploadMultiple extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="https://apidev-mcmaster.twisdev.com/v1/api-admin/picture"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file
});

export default connect(mapStateToProps, {})(FieldAntdUploadMultiple);
