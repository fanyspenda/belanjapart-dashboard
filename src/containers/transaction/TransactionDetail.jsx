import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  addTrackingNumber,
  detailData,
  updateStatusData
} from '@actions/transaction.action';
import PageLoader from '@components/PageLoader';
import ButtonBack from '@components/button/ButtonBack';
import {
  Dropdown,
  Menu,
  Icon,
  Button,
  Modal,
  Input,
  Form,
  message
} from 'antd';
import PriceFormat from '../../helpers/numberFormat';
import TransactionHistory from './TransactionHistory';
import 'antd/es/dropdown/style/css';
import 'antd/es/modal/style/css';

const { confirm } = Modal;

class TransactionDetail extends React.Component {
  state = {
    listOfImage: [],
    menuTransaction: null,
    isEdit: true,
    formValues: {}
  };

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    const { formValues } = this.state;
    if (nextProps.data.dataDetail !== data.dataDetail) {
      this.setState(prevState => {
        let { menuTransaction, formValues } = prevState;
        formValues = nextProps.data.dataDetail;
        if (nextProps.data.dataDetail.status === 'Paid') {
          menuTransaction = (
            <Menu onClick={this.handleClickMenu}>
              <Menu.Item key="Processing Shipment">
                Processing Shipment
              </Menu.Item>
              <Menu.Item key="On Hold">On Hold</Menu.Item>
              <Menu.Item key="Refunded">Refunded</Menu.Item>
            </Menu>
          );
        } else if (nextProps.data.dataDetail.status === 'Processing Shipment') {
          menuTransaction = (
            <Menu onClick={this.handleClickMenu}>
              <Menu.Item key="Shipped">Shipped</Menu.Item>
              <Menu.Item key="On Hold">On Hold</Menu.Item>
              <Menu.Item key="Refunded">Refunded</Menu.Item>
            </Menu>
          );
        } else if (nextProps.data.dataDetail.status === 'Shipped') {
          menuTransaction = (
            <Menu onClick={this.handleClickMenu}>
              <Menu.Item key="Delivered">Delivered</Menu.Item>
              <Menu.Item key="On Hold">On Hold</Menu.Item>
              <Menu.Item key="Refunded">Refunded</Menu.Item>
            </Menu>
          );
        } else if (nextProps.data.dataDetail.status === 'Delivered') {
          menuTransaction = (
            <Menu onClick={this.handleClickMenu}>
              <Menu.Item key="On Hold">On Hold</Menu.Item>
              <Menu.Item key="Complete">Complete</Menu.Item>
              <Menu.Item key="Refunded">Refunded</Menu.Item>
            </Menu>
          );
        } else if (nextProps.data.dataDetail.status === 'On Hold') {
          menuTransaction = (
            <Menu onClick={this.handleClickMenu}>
              <Menu.Item key="Processing Shipment">
                Processing Shipment
              </Menu.Item>
              <Menu.Item key="Shipped">Shipped</Menu.Item>
              <Menu.Item key="Delivered">Delivered</Menu.Item>
              <Menu.Item key="Complete">Complete</Menu.Item>
              <Menu.Item key="Refunded">Refunded</Menu.Item>
            </Menu>
          );
        }

        return { menuTransaction, formValues };
      });
    }
  }

  handleEditTrackingNumber = () => {
    const { isEdit, formValues } = this.state;
    const { form, detailData, addTrackingNumber } = this.props;

    if (!isEdit) {
      const formData = {
        tracking_number: form.getFieldValue('TrackingNumber')
      };
      addTrackingNumber(formValues.id, formData).then(res => {
        detailData(formValues.id);
      });
    }
    this.setState(prevState => ({
      isEdit: !prevState.isEdit
    }));
  };

  handleClickMenu = e => {
    const { updateStatusData, match } = this.props;
    const data = {
      status: e.key
    };
    confirm({
      title: `Do you want change status to ${e.key}?`,
      onOk() {
        updateStatusData(match.params.id, data);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  handleDownloadInvoice = val => {
    if (val === '') {
      message.warning('Invoice url not found');
    } else {
      window.open(val, '_blank');
    }
  };

  render() {
    const { data, form } = this.props;
    const { listOfImage, menuTransaction, isEdit, formValues } = this.state;

    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-4">
                <ButtonBack>DETAIL TRANSACTION</ButtonBack>
              </div>
            </div>
            {data.isLoadingDetail ? (
              <PageLoader />
            ) : (
              <form className="forms-sample pl-5 pt-3">
                <div className="row">
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Buyer&apos;s Name
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.user_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="parent_id">
                        Transaction Number
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && `#${data.dataDetail.code}`}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        District
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.district_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Zip Code
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.zip_code}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Email
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.user_email}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="parent_id">
                        Transaction Date
                      </label>
                      <div className="detail-value font-weight-bold">
                        {moment(data.dataDetail.created_at).format(
                          'DD MMMM YYYY'
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        City
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.city_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Shipping Price
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail.total && (
                          <PriceFormat value={data.dataDetail.shipping_fee} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Handphone Number
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.phone}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="parent_id">
                        Shipping Address
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.address}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Province
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.province_name}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Total Transaction Price
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail.total && (
                          <PriceFormat value={data.dataDetail.total} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Status
                      </label>
                      <div className="detail-value font-weight-bold">
                        <div className="btn btn-status-process btn-block text-white font-weight-bold">
                          {data.dataDetail.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  {menuTransaction && (
                    <div className="col-md-3">
                      <div
                        className="mt-4"
                        id="components-dropdown-demo-dropdown-button"
                      >
                        <Dropdown overlay={menuTransaction} trigger={['click']}>
                          <Button>
                            Change status <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                  )}
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Tracking Number
                      </label>
                      <div className="detail-value font-weight-bold">
                        {form.getFieldDecorator('TrackingNumber', {
                          initialValue: formValues.tracking_number || ''
                        })(
                          <Input
                            disabled={isEdit}
                            addonAfter={
                              <Icon
                                onClick={() => this.handleEditTrackingNumber()}
                                type={isEdit ? 'edit' : 'save'}
                              />
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Invoice
                      </label>
                      <div className="detail-value font-weight-bold">
                        <button
                          type="button"
                          className="btn btn-green-dark text-white"
                          onClick={() =>
                            this.handleDownloadInvoice(
                              data.dataDetail.url_invoice
                            )
                          }
                        >
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <TransactionHistory
                  listOfImage={listOfImage}
                  productPurchased={data.dataDetail.transaction_detail || []}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.transaction
});

export default connect(mapStateToProps, {
  detailData,
  updateStatusData,
  addTrackingNumber
})(Form.create()(TransactionDetail));
