/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchAllData as fetchData } from '@actions/log.action';
import TableListingPage from './component/TableListingPage';

class LogCsv extends Component {
  static columns = () => {
    const columns = [
      {
        dataField: 'title',
        text: 'Title',
        sort: true
      },
      {
        dataField: 'content',
        text: 'Content',
        sort: true
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
  data: state.log
});

export default connect(mapStateToProps, {
  fetchData
})(
  TableListingPage({
    name: 'NOTIFICATION',
    columns: LogCsv.columns,
    enableActiveStatusFilter: true,
    enableDateFilter: true,
    enableStatusFilter: true
  })(LogCsv)
);
