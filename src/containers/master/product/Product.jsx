import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteData } from '@actions/product.action';
import { fetchDataFilter } from '@actions/category.action';
import EditActionCode from '@components/tableActions/EditActionCode';
import DeleteAction from '@components/tableActions/DeleteAction';
import { NavLink } from 'react-router-dom';
import TableListingPage from './components/TableListingPage';
import { setParamUserAdmin } from '../../../reducers/app.reducer';

class Product extends Component {
  static columns = props => {
    const columns = [
      {
        dataField: 'category',
        text: 'Parent Name',
        sort: true,
        formatter: cell => <div>{cell ? cell[0].category.name : '-'}</div>
      },
      {
        dataField: 'name',
        text: 'Product Name',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${props.history.location.pathname}/detail/${row.code}`}
            className="button-table"
            activeClassName="active"
          >
            {cell || '-'}
          </NavLink>
        )
      },
      {
        dataField: 'code',
        text: 'Product Id'
      },
      {
        dataField: 'action',
        text: 'Action',
        headerClasses: 'disabled-sorting text-right',
        classes: 'text-right',
        formatter: (cell, row) => (
          <div>
            <EditActionCode data={row} />
            <DeleteAction row={row} deleteData={props.deleteData} {...props} />
          </div>
        )
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
  data: state.product,
  categories: state.category,
  app: state.app
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData,
  fetchDataFilter,
  setParamUserAdmin
})(
  TableListingPage({
    name: 'MASTER PRODUCT',
    columns: Product.columns,
    enableParentFilter: true
  })(Product)
);
