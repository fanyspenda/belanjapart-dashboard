import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Modal } from 'reactstrap';
import { Field } from 'redux-form';
import { renderFieldNoBorder } from '@components/Field';
import { createPicture, nullPicture } from '@actions/file.action';
import { isEmpty } from 'lodash';
import { setCurrentSecondary } from '@actions/secondary.action';
import ModalAttributeEdit from './modal/ModalAttributeEdit';
import ModalImage from './modal/ModalImage';
import Modal2D from './modal/Modal2D';
import Modal3D from './modal/Modal3D';

class RenderSecondaryProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAttribute: false,
      modalImage: false,
      modal2D: false,
      modal3D: false,
      file: '',
      fieldData: '',
      keyUpload: ''
    };
    const { dataSecondary } = this.props;
    const data = [];
    // console.log('data', dataSecondary);
    if (dataSecondary && dataSecondary.productattribute) {
      dataSecondary.productattribute.map(value => {
        if (value.attribute.type === 'string') {
          data.push({
            attribute_id: value.attribute_id,
            attribute_type: value.attribute.type,
            attribute_code: value.code,
            string_value: ''
          });
        } else {
          data.push({
            attribute_id: value.attribute_id,
            attribute_type: value.attribute.type,
            attribute_code: value.code,
            int_value: ''
          });
        }
      });
    }

    const removeDuplicateData = Object.values(
      data.reduce((acc, data) => {
        acc[data.attribute_id] = {
          ...data,
          attribute_id: data.attribute_id
        };
        return acc;
      }, [])
    );

    this.fileObject = {
      attribute: removeDuplicateData,
      picture: '',
      pdf1_id: '',
      pdf2_id: ''
    };
  }

  componentDidMount() {
    const { fields, dataSecondary } = this.props;
    if (dataSecondary) {
      if (dataSecondary.secondary) {
        fields.removeAll();
        dataSecondary.secondary.map(val => {
          fields.push(val);
        });
      } else {
        fields.removeAll();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dataSecondary, fields } = this.props;
    if (
      dataSecondary &&
      dataSecondary.secondary !== nextProps.dataSecondary.secondary
    ) {
      fields.removeAll();
      nextProps.dataSecondary.secondary.map(val => fields.push(val));
    }

    if (fields !== nextProps.fields) {
      this.props.setCurrentSecondary(nextProps.fields.length);
    }
    // console.log('next', nextProps);
  }

  getFieldData = index => {
    const { fields } = this.props;

    const field = fields.get(index);
    this.setState({ fieldData: field });
    // console.log(`field ${index}`, field);
  };

  toggleAttribute = () =>
    this.setState(state => ({ modalAttribute: !state.modalAttribute }));

  toggleImage = () =>
    this.setState(state => ({ modalImage: !state.modalImage }));

  toggle2D = () => this.setState(state => ({ modal2D: !state.modal2D }));

  toggle3D = () => this.setState(state => ({ modal3D: !state.modal3D }));

  // handleFileDrop for secondary product
  handleFileDrop = file => this.setState({ file });

  render() {
    const {
      modalAttribute,
      modalImage,
      modal2D,
      modal3D,
      keyUpload,
      file,
      fieldData
    } = this.state;
    const { fields, updateField, nullPicture } = this.props;

    let dataAttribute = '';
    let dataSrc = '';
    let dataPdf1 = '';
    let dataPdf2 = '';
    if (!isEmpty(fieldData)) {
      dataAttribute = fieldData.attribute;
      dataSrc = fieldData.picture;
      dataPdf1 = fieldData.file1;
      dataPdf2 = fieldData.pdf2_id;
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-12 mb-3">
            <Table className="table-secondary" responsive width="1500">
              <thead>
                <tr>
                  <th style={{ minWidth: 150 }}>SKU &emsp;</th>
                  <th style={{ minWidth: 100 }}>Unit &emsp;</th>
                  <th style={{ minWidth: 100 }}>Manufacture &emsp;</th>
                  <th>List Attributes</th>
                  <th style={{ minWidth: 100 }}>Quantity</th>
                  <th style={{ minWidth: 120 }}>Price/unit</th>
                  <th>True Weight</th>
                  <th>Dimensional Weight</th>
                  <th>Image</th>
                  <th>File PDF (2D)</th>
                  <th>File PDF (3D)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((secondary, index) => (
                  <tr key={`${index}row`}>
                    <td>
                      <Field
                        name={`${secondary}.code`}
                        type="text"
                        component={renderFieldNoBorder}
                        placeholder="Input SKU"
                      />
                    </td>
                    <td>
                      <Field
                        name={`${secondary}.unit`}
                        type="text"
                        component={renderFieldNoBorder}
                        placeholder="Input Unit"
                      />
                    </td>
                    <td>
                      <Field
                        name={`${secondary}.manufacture`}
                        type="text"
                        component={renderFieldNoBorder}
                        placeholder="Input Manufacture"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          this.toggleAttribute();
                          this.getFieldData(index);
                          this.setState({
                            keyUpload: index
                          });
                        }}
                        className="btn btn-link p-0"
                      >
                        Input Value
                      </button>
                    </td>
                    <td>
                      <Field
                        name={`${secondary}.quantity`}
                        type="number"
                        component={renderFieldNoBorder}
                        placeholder="Input Quantity"
                        min={0}
                      />
                    </td>
                    <td>
                      <Field
                        name={`${secondary}.price`}
                        type="number"
                        component={renderFieldNoBorder}
                        placeholder="Input Price/Unit"
                        min={-1}
                      />
                    </td>
                    <td>
                      <Field
                        name={`${secondary}.weight`}
                        type="text"
                        component={renderFieldNoBorder}
                        placeholder="Input True Weight"
                      />
                    </td>
                    <td>
                      <Field
                        name={`${secondary}.dimensional_weight`}
                        type="text"
                        component={renderFieldNoBorder}
                        placeholder="Input Dimensional Weight"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          nullPicture();
                          this.toggleImage();
                          this.getFieldData(index);
                          this.setState({ keyUpload: index });
                        }}
                        className="btn btn-link p-0"
                      >
                        Upload Image
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          nullPicture();
                          this.toggle2D();
                          this.getFieldData(index);
                          this.setState({ keyUpload: index });
                        }}
                        className="btn btn-link p-0"
                      >
                        Upload File
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          nullPicture();
                          this.toggle3D();
                          this.getFieldData(index);
                          this.setState({ keyUpload: index });
                        }}
                        className="btn btn-link p-0"
                      >
                        Upload File
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-valec btn-xs p-1"
                        onClick={() => fields.remove(index)}
                      >
                        <i className="fas fa-trash m-0" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-12">
            <button
              className="btn btn-green-outline btn-block font-weight-bolder m-0"
              style={{ borderStyle: 'dashed' }}
              type="button"
              onClick={() => fields.push(this.fileObject)}
            >
              Add Secondary Product
            </button>
          </div>
        </div>

        <div className="text-center">
          <Modal
            key={keyUpload}
            size="sm"
            isOpen={modalAttribute}
            toggle={this.toggleAttribute}
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ModalAttributeEdit
              index={keyUpload}
              toggle={this.toggleAttribute}
              updateField={updateField}
              dataSrc={dataAttribute}
              dataFields={fields}
            />
          </Modal>
          <Modal
            key={keyUpload}
            size="sm"
            isOpen={modalImage}
            toggle={this.toggleImage}
          >
            <ModalImage
              index={keyUpload}
              handleFileDrop={this.handleFileDrop}
              updateField={updateField}
              picture={file}
              toggle={this.toggleImage}
              dataSrc={dataSrc}
            />
          </Modal>
          <Modal
            key={keyUpload}
            size="sm"
            isOpen={modal2D}
            toggle={this.toggle2D}
          >
            <Modal2D
              index={keyUpload}
              handleFileDrop={this.handleFileDrop}
              updateField={updateField}
              pdf1={file}
              toggle={this.toggle2D}
              dataSrc={dataPdf1}
            />
          </Modal>
          <Modal
            key={keyUpload}
            size="sm"
            isOpen={modal3D}
            toggle={this.toggle3D}
          >
            <Modal3D
              index={keyUpload}
              handleFileDrop={this.handleFileDrop}
              updateField={updateField}
              pdf2={file}
              toggle={this.toggle3D}
              dataSrc={dataPdf2}
            />
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  file: state.file,
  secondary: state.secondary
});

export default connect(mapStateToProps, {
  createPicture,
  nullPicture,
  setCurrentSecondary
})(RenderSecondaryProduct);
