import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchData, deleteData } from '@actions/transaction.action';
import DeleteAction from '@components/tableActions/DeleteAction';
import TableListingPage from '@components/hoc/table/TableListingPageTransaction';
import { NavLink } from 'react-router-dom';
import { connectSocket } from '@actions/notification.action';
import PriceFormat from '../../helpers/numberFormat';

const Status = ({ className, text }) => (
  <div
    className={`btn ${className} btn-block text-white font-weight-bold text-center`}
  >
    {text}
  </div>
);

const STATUS_STATES = {
  'Waiting Payment': (
    <Status className="btn-status-waiting" text="Waiting Payment" />
  ),
  Paid: <Status className="btn-status-process" text="Paid" />,
  'Processing Shipment': (
    <Status className="btn-status-paid" text="Processing Shipment" />
  ),
  Shipped: <Status className="btn-status-sent" text="Shipped" />,
  Delivered: <Status className="btn-status-delivered" text="Delivered" />,
  Complete: <Status className="btn-status-success" text="Complete" />,
  'On Hold': <Status className="btn-status-hold" text="On Hold" />,
  Refunded: <Status className="btn-status-refund" text="Refunded" />,
  Canceled: <Status className="btn-status-cancel" text="Canceled" />
};

class Transaction extends Component {
  static columns = ({ history }) => {
    const columns = [
      {
        dataField: 'user_name',
        text: 'Name',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`/user/detail/${row.user_id}`}
            className="button-table"
            activeClassName="active"
          >
            {row.user_name || '-'}
          </NavLink>
        )
      },
      {
        dataField: 'code',
        text: 'Transaction Number',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${history.location.pathname}/${row.id}`}
            className="button-table"
            activeClassName="active"
          >
            {`#${row.code}` || '-'}
          </NavLink>
        )
      },
      {
        dataField: 'created_at',
        text: 'Transaction Date',
        sort: true,
        formatter: cell => (cell ? moment(cell).format('DD MMMM YYYY') : '-')
      },
      {
        dataField: 'total',
        text: 'Price (Rp)',
        sort: true,
        formatter: cell => <PriceFormat value={cell} noPrefix />
      },
      {
        dataField: 'status',
        text: 'Status',
        formatter: cell => STATUS_STATES[cell]
      },
      {
        dataField: 'updated_at',
        text: 'Updated',
        formatter: (cell, row) =>
          cell
            ? `${moment(cell).format('DD MMM YYYY')} by ${row.user_name}`
            : '-'
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
  deleteData,
  connectSocket
})(
  TableListingPage({
    name: 'TRANSACTION',
    columns: Transaction.columns,
    enableActiveStatusFilter: true,
    disableAddBtn: true,
    enableDateFilter: true,
    enableStatusFilter: true
  })(Transaction)
);
