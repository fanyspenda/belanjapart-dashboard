/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '@actions/logCsv.action';
import DownloadAction from '@components/tableActions/DownloadAction';
import TableListingPage from './component/TableListingPage';
import moment from 'moment';

class LogCsv extends Component {
  static columns = props => {
    const columns = [
      {
        dataField: 'admin',
        text: 'Admin Name',
        sort: true
      },
      {
        dataField: 'type',
        text: 'CSV Type',
        sort: true
      },
      {
        dataField: 'created_at',
        text: 'Upload Date',
        sort: true,
        formatter: cell => moment(cell).format('LLLL')
      },
      {
        dataField: 'action',
        text: 'Action',
        headerClasses: 'disabled-sorting text-right',
        classes: 'text-right',
        formatter: (cell, row) => (
          <div>
            <DownloadAction data={row} />
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
  data: state.LogCsv
});

export default connect(mapStateToProps, {
  fetchData
})(
  TableListingPage({
    name: 'LOG CSV',
    columns: LogCsv.columns,
    enableActiveStatusFilter: true,
    enableDateFilter: true,
    enableStatusFilter: true
  })(LogCsv)
);
