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
import SearchOption from '@components/tableActions/SearchOption';

const opt = [
  { value: 'name', label: 'Product Name' },
  { value: 'code', label: 'Product Code' }
]

const TableWrapper = ({
  limit,
  data,
  page,
  sizePerPage,
  onLimitChange,
  onTableChange,
  onPageChange,
  totalSize,
  columns,
  loading,
  history,
  route,
  disableAddBtn,
  customPath,
  disablePagination,
  handleChangeOption,
  searchCall,
  type
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
        <div className="d-flex justify-content-end mb-4 col-md-7">
          <SearchOption route={route} searchCall={searchCall} handleChangeOption={handleChangeOption} type={type} opt={opt} />
          {!disableAddBtn && (
            <div className="mx-2">
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
