/* eslint-disable react/jsx-one-expression-per-line */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["imagePreview"] }] */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { head } from 'lodash';
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

class FieldDropzoneProduct extends Component {
  state = {
    pictureID: [],
    picture: []
  };

  componentDidMount() {
    this.setState({
      picture: this.props.dataSrc
    });
  }

  componentDidUpdate() {
    const { pictureID } = this.state;
    const { handleFileDrop } = this.props;

    if (pictureID.length) {
      handleFileDrop(pictureID);
    }
  }

  imagePreview = data => (
    <div className="img-holder">
      <div className="aspect-ratio-1-1">
        <div>
          <img className="img-ctr" src={data.path} alt={data.name} />
        </div>
      </div>
    </div>
  );

  handleDrop = files => {
    const { createPicture, typePicture } = this.props;
    const formData = new FormData();

    formData.append('type', typePicture);
    formData.append('file', files[0], files[0].name);

    createPicture(formData).then(res => {
      this.setState(state => ({
        pictureID: [res.data.data.id],
        picture: [res.data.data]
      }));
    });
  };

  render() {
    const { picture } = this.state;
    const { file, disabled, required = false, dataSrc = [] } = this.props;
    return (
      <div className="pb-3">
        <p>Upload Image (.png/.jpg only max 300 kb)</p>
        <div className={`dropzone-ui border ${disabled && 'disabled'}`}>
          <Dropzone
            className="dropzone-input-ui"
            onDrop={this.handleDrop}
            maxSize={2000000}
            accept="image/jpeg, image/png, image/jpg"
            multiple
            disabled={disabled}
          >
            {file.isLoading ? (
              <ProgressBar value={file.progress} />
            ) : (
              <RenderImage
                data={head(picture)}
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

export default connect(mapStateToProps, { createPicture })(
  FieldDropzoneProduct
);
