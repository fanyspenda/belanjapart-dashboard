/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider
} from 'react-bootstrap-table2-paginator';
import _ from 'lodash';

const TableWrapper = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  totalSize,
  columns,
  loading
}) => (
    <PaginationProvider
      pagination={paginationFactory({
        custom: true,
        page,
        sizePerPage,
        totalSize,
        alwaysShowAllBtns: true,
        prePageText: 'Prev', // the text of previous page button
        nextPageText: 'Next',
        withFirstAndLast: false
      })}
    >
      {({ paginationProps, paginationTableProps }) => (
        <Fragment>
          <br />

          <div className="card rounded w-100" style={{ border: 'none' }}>
            <div className="card-body pt-0">
              <div className="grid-margin stretch-card">
                <div className="table-responsive table-ui table-striped">
                  <BootstrapTable
                    remote
                    keyField="id"
                    data={data}
                    columns={columns}
                    bordered={false}
                    loading={loading}
                    onTableChange={onTableChange}
                    noDataIndication={() => (
                      <div className="text-center">Empty Data</div>
                    )}
                    overlay={overlayFactory({
                      spinner: true,
                      background: 'rgba(192,192,192,0.3)'
                    })}
                    wrapperClasses="table-responsive"
                    {...paginationTableProps}
                  />
                </div>
              </div>
              <div className="float-left">
                <p className="text-muted">
                  Showing{' '}
                  <span className="font-weight-bold text-dark">
                    {`${data ? data.length : 0}`}
                  </span>{' '}
                  entries
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </PaginationProvider>
  );

export default TableWrapper;
