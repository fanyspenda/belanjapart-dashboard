import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, deleteData } from '@actions/fee.action';
import DeleteAction from '@components/tableActions/DeleteAction';
import EditAction from '@components/tableActions/EditAction';
import { NavLink } from 'react-router-dom';
import TableListingPage from './component/TableListingPage';

class Fee extends Component {
  static columns = ({ history, deleteData }) => {
    const columns = [
      {
        dataField: 'name',
        text: 'City Name',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${history.location.pathname}/detail/${row.id}`}
            className="button-table"
            activeClassName="active"
          >
            {row.name ? row.name : '-'}
          </NavLink>
        )
      },
      {
        dataField: 'action',
        text: 'Action',
        headerClasses: 'disabled-sorting text-right',
        classes: 'text-right',
        formatter: (cell, row) => (
          <div>
            <EditAction data={row} />
            {/* <DeleteAction row={row} deleteData={deleteData} /> */}
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
  data: state.fee
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData
})(
  TableListingPage({
    name: 'MASTER DELIVERY FEE',
    columns: Fee.columns,
    enableParentFilter: false,
    disableAddBtn: true
  })(Fee)
);
