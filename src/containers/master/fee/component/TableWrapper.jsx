import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import SearchTable from '@components/hoc/table/SearchTable';
import { selectField } from '../../../../components/Field';
import SearchLimit from '@components/antd/SearchLimit';

const TableWrapper = ({
  data,
  page,
  sizePerPage,
  onLimitChange,
  handleSearch,
  onTableChange,
  onPageChange,
  totalSize,
  columns,
  loading,
  route,
  disablePagination,
  limit,
  disableAddBtn,
  history
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
          {!disableAddBtn && (
            <div className="mr-2 mx-2">
              <button
                onClick={() => history.push(`/${route.key}/create`)}
                className="btn btn-green-dark text-white"
              >
                {`+ Create New ${route.name}`}
              </button>
            </div>
          )}
          <SearchTable route={route} handleSearch={handleSearch} />
        </div>
        <div className="ml-3 d-flex align-items-center">
          <SearchLimit limit={limit} onLimitChange={onLimitChange} />
        </div>
        <div className="card rounded w-100" style={{ border: 'none' }}>
          <div className="card-body">
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
