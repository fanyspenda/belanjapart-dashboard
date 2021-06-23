/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React, { Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Table, Modal } from 'reactstrap';
import ButtonLoader from '@components/ButtonLoader';
import { withRouter } from 'react-router-dom';
import { detailData } from '@actions/product.action';
import ButtonCancel from '@components/button/ButtonCancel';
import PageLoader from '@components/PageLoader';
import { message } from 'antd';
import { exportCsv } from '@actions/file.action';
import { ModalAttributeDetail } from './components/modal/ModalAttribute';
import { ModalImageDetail } from './components/modal/ModalImage';
import { Modal2DDetail } from './components/modal/Modal2D';
import { Modal3DDetail } from './components/modal/Modal3D';

class ProductSecondaryDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalAttribute: false,
      modalImage: false,
      modal2D: false,
      modal3D: false,
      keyUpload: '',
      dataAttr: '',
      dataImage: '',
      dataPdf1: '',
      dataPdf2: ''
    };
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { dataFile } = this.props;

    if (nextProps.dataFile.csv !== dataFile.csv) {
      if (!nextProps.dataFile.csv.data) {
        message.warning('Link Export CSV attribute does not valid');
      } else {
        window.open(nextProps.dataFile.csv.data, '_blank');
      }
    }
  }

  toggleAttribute = () =>
    this.setState(state => ({ modalAttribute: !state.modalAttribute }));

  toggleImage = () =>
    this.setState(state => ({ modalImage: !state.modalImage }));

  toggle2D = () => this.setState(state => ({ modal2D: !state.modal2D }));

  toggle3D = () => this.setState(state => ({ modal3D: !state.modal3D }));

  handleExportCsv = () => {
    const { current } = this.props.data;
    this.props.exportCsv('secondary_product', current.code);
  };

  render() {
    const {
      modalAttribute,
      modalImage,
      modal2D,
      modal3D,
      keyUpload,
      dataAttr,
      dataImage,
      dataPdf1,
      dataPdf2
    } = this.state;
    const { data, history, match } = this.props;
    // console.log('data second', data.dataDetail);
    return (
      <Fragment>
        <div className="content-wrapper">
          <div className="row pt-5">
            <div className="col-md-12 grid-margin">
              <div className="container">
                {/* <div className="container my-3 pb-3 rounded"> */}
                <div className="row mb-3 pt-3">
                  <div className="col-md-5">
                    <h5 className="font-weight-bold">
                      DETAIL SECONDARY PRODUCT
                    </h5>
                  </div>
                  <div className="form-group m-0 pl-5 drop-header">
                    <div className="input-group input-group-valet">
                      <button
                        onClick={() => this.handleExportCsv()}
                        className="btn btn-link text-green border-light-green text-decoration-none"
                      >
                        Export CSV
                      </button>
                    </div>
                  </div>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <Table className="table-secondary" responsive>
                        <thead>
                          <tr>
                            <th>SKU</th>
                            <th>Unit</th>
                            <th>Manufacture</th>
                            <th>List Attributes</th>
                            <th>Quantity</th>
                            <th>Price/unit</th>
                            <th>True Weight</th>
                            <th>Dimensional Weight</th>
                            <th>Image</th>
                            <th>File PDF (2D)</th>
                            <th>File PDF (3D)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.isLoading ? (
                            <PageLoader />
                          ) : (
                            data.dataDetail &&
                            data.dataDetail.secondary &&
                            data.dataDetail.secondary.map((val, index) => (
                              <tr>
                                <td>{val.code}</td>
                                <td>{val.unit}</td>
                                <td>{val.manufacture}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      this.toggleAttribute();
                                      this.setState({
                                        keyUpload: index,
                                        dataAttr: val.attribute
                                      });
                                    }}
                                    className="btn btn-link"
                                  >
                                    View Value
                                  </button>
                                </td>
                                <td>{val.quantity}</td>
                                <td>{`Rp. ${val.price}`}</td>
                                <td>{val.weight}</td>
                                <td>{val.dimensional_weight}</td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      this.toggleImage();
                                      this.setState({
                                        keyUpload: index,
                                        dataImage: val.picture
                                      });
                                    }}
                                    className="btn btn-link"
                                  >
                                    View Image
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      this.toggle2D();
                                      this.setState({
                                        keyUpload: index,
                                        dataPdf1: val.file1
                                      });
                                    }}
                                    className="btn btn-link"
                                  >
                                    View File
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      this.toggle3D();
                                      this.setState({
                                        keyUpload: index,
                                        dataPdf2: val.file2
                                      });
                                    }}
                                    className="btn btn-link"
                                  >
                                    View File
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  <div className="row pt-5 mb-0">
                    <div className="col-md-1">
                      <ButtonCancel className="btn btn-green-outline text-white">
                        Cancel
                      </ButtonCancel>
                    </div>
                    <div className="col-md-3 pl-5">
                      <ButtonLoader
                        type="submit"
                        className="btn btn-green-dark text-white mt-3"
                        onClick={() => {
                          history.push(
                            `/master/product/edit/${match.params.id}`
                          );
                        }}
                      >
                        EDIT
                      </ButtonLoader>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Modal
            size="sm"
            isOpen={modalAttribute}
            toggle={this.toggleAttribute}
          >
            <ModalAttributeDetail
              toggle={this.toggleAttribute}
              dataAttribute={dataAttr}
              key={keyUpload}
            />
          </Modal>
          <Modal size="sm" isOpen={modalImage} toggle={this.toggleImage}>
            <ModalImageDetail
              toggle={this.toggleImage}
              dataImages={dataImage}
              key={keyUpload}
            />
          </Modal>
          <Modal size="sm" isOpen={modal2D} toggle={this.toggle2D}>
            <Modal2DDetail
              toggle={this.toggle2D}
              dataPdf1s={dataPdf1}
              key={keyUpload}
            />
          </Modal>
          <Modal size="sm" isOpen={modal3D} toggle={this.toggle3D}>
            <Modal3DDetail
              toggle={this.toggle3D}
              dataPdf2s={dataPdf2}
              key={keyUpload}
            />
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product,
  dataFile: state.file
  // dataSecondary: state.secondary
});

export default reduxForm({
  form: 'detailProductSecondaryForm'
})(
  connect(mapStateToProps, { detailData, exportCsv })(
    withRouter(ProductSecondaryDetail)
  )
);
