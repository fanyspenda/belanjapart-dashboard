import React from 'react';
import { Modal } from 'reactstrap';
import ModalUploadCsv from '@components/modal/ModalUploadCsv';
import { connect } from 'react-redux';
import SelectType from '@components/select/SelectType';
import { Icon, message, Spin } from 'antd';
import ModalExport from './modal/ModalExport';
import { reduxForm } from 'redux-form';

const antIcon = <Icon type="loading" style={{ fontSize: 20 }} spin />;

class ProductHeader extends React.Component {
  state = {
    isOpen: false,
    isOpenExport: false,
    typeCsv: null,
    optType: [
      { label: 'product', value: 'product' },
      { label: 'Secondary Product Bulk', value: 'secondary_product_bulk' }
    ]
  };

  componentWillReceiveProps(nextProps) {
    const { dataFile } = this.props;

    if (nextProps.dataFile.csv !== dataFile.csv) {
      if (!nextProps.dataFile.csv.data) {
        message.warning('Link Export CSV product does not valid');
      } else {
        window.open(nextProps.dataFile.csv.data, '_blank');
      }
    }
  }

  toggleModal = () => this.setState(state => ({ isOpen: !state.isOpen }));

  toggleModalExport = () =>
    this.setState(state => ({ isOpenExport: !state.isOpenExport }));

  handleChangeType = type => {
    this.setState({ typeCsv: type });
  };

  render() {
    const { isOpen, isOpenExport } = this.state;
    const { data, dataFile } = this.props;
    return (
      <React.Fragment>
        <div className="form-group m-0 pl-5 drop-header">
          <div className="input-group input-group-valet">
            <button
              className="btn btn-link text-green border-light-green text-decoration-none"
              onClick={this.toggleModal}
            >
              Upload CSV
            </button>
          </div>
        </div>
        <div className="form-group m-0 pl-1 drop-header">
          <div className="input-group input-group-valet">
            <button
              className="btn btn-link text-green border-light-green text-decoration-none"
              onClick={() => this.toggleModalExport()}
            >
              {dataFile.isLoadingCsv ? (
                <Spin indicator={antIcon} />
              ) : (
                'Export CSV'
              )}
            </button>
          </div>
        </div>
        <Modal size="md" isOpen={isOpen} toggle={this.toggleModal}>
          <ModalUploadCsv
            path="product"
            toggle={this.toggleModal}
            pagination={data.pagination}
            typeCsv={this.state.typeCsv}
            handleChangeType={this.handleChangeType}
            SelectType={SelectType}
            optType={this.state.optType}
          />
        </Modal>
        <Modal size="md" isOpen={isOpenExport} toggle={this.toggleModalExport}>
          <ModalExport toggle={this.toggleModalExport} />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product,
  dataFile: state.file
});

export default reduxForm({
  form: 'productHeaderForm'
})(connect(mapStateToProps, {})(ProductHeader));
