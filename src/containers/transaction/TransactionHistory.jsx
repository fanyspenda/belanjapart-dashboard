import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteData } from '@actions/atribut.action';
import DeleteAction from '@components/tableActions/DeleteAction';
import PriceFormat from '@helpers/numberFormat';
import TableListingPage from './components/TableListingPage';
import { URL_FILE } from '../../config/keys';
import DefaultImage from '../../../public/images/icon/error-image-generic.png';

class TransactionHistory extends Component {
  static columns = props => {
    const { deleteData } = props;

    const columns = [
      {
        dataField: 'name',
        text: 'Product Name',
        sort: true,
        formatter: (cell, row) => `${row.product_name}`
      },
      {
        dataField: 'code',
        text: 'SKU',
        sort: true,
        formatter: (cell, row) => `${row.sku}`
      },
      {
        dataField: 'image',
        text: 'Image',
        formatter: (cell, row) => (
          <img
            src={
              row.user_cart.banner === URL_FILE
                ? DefaultImage
                : row.user_cart.banner
            }
            alt=""
            style={{ height: 37, maxWidth: 50 }}
          />
        )
      },
      {
        dataField: 'qty',
        text: 'Quantity',
        sort: true,
        formatter: (cell, row) => `${row.qty}`
      },
      {
        dataField: 'price',
        text: 'Price/unit',
        sort: true,
        formatter: (cell, row) => <PriceFormat value={row.price} />
      },
      {
        dataField: 'total_price',
        text: 'Total Price',
        sort: true,
        formatter: (cell, row) => <PriceFormat value={row.price * row.qty} />
      }
    ];
    return columns;
  };

  render() {
    return (
      <Fragment>
        <div style={{ width: 200 }} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.transaction
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData
})(
  TableListingPage({
    name: 'PRODUCT PURCHASED',
    disablePagination: true,
    columns: TransactionHistory.columns
  })(TransactionHistory)
);
