/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-expressions */
import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import _ from 'lodash';
import SearchLimit from '@components/antd/SearchLimit';
import SearchTable from './SearchTable';

const TableWrapper = ({
  data,
  page,
  sizePerPage,
  handleSearch,
  onTableChange,
  onPageChange,
  onLimitChange,
  totalSize,
  columns,
  loading,
  history,
  route,
  disableAddBtn,
  customPath,
  disablePagination,
  limit
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
        <div className="col-md-7 d-flex justify-content-end mb-2">

          <SearchTable route={route} handleSearch={handleSearch} />

          {!disableAddBtn && (
            <div className="mr-2">
              <button
                onClick={() => {
                  customPath != null
                    ? history.push(customPath)
                    : history.push(`/${route.key}/create`);
                }}
                className="btn btn-green-dark text-white"
              >
                {`+ Create New ${route.name}`}
              </button>
            </div>
          )}
        </div>

        <div className="ml-3 d-flex align-items-center">
            <SearchLimit limit={limit} onLimitChange={onLimitChange} />
        </div>

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
                  {`${data.length} to ${sizePerPage}`}
                </span>{' '}
                entries
              </p>
            </div>
            {!disablePagination && (
              <div className="float-right">
                {data.length > 0 && (
                  <PaginationListStandalone
                    {...paginationProps}
                    onPageChange={onPageChange}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Fragment>
    )}
  </PaginationProvider>
);

export default TableWrapper;
