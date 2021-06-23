/* eslint-disable no-nested-ternary */
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
import { selectField } from '@components/Field';
import DatePickerFilter from '@components/antd/DatePickerFilter';

const TableWrapper = ({
  data,
  page,
  sizePerPage,
  handleSearch,
  handleChange,
  onTableChange,
  onPageChange,
  onLimitChange,
  totalSize,
  columns,
  loading,
  route,
  disablePagination,
  enableStatusFilter,
  limit,
  handleFilter
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
            {/* datepicker */}
            <DatePickerFilter handleFilter={handleFilter} />

            {enableStatusFilter && (
              <select
                className="custom-select w-auto ml-4"
                component={selectField}
                onChange={handleChange}
              >
                <option value="">All Type</option>
                <option value="Product">Product</option>
                <option value="Secondary Product">Secondary Product</option>
                <option value="Bulk Secondary Product">Bulk Secondary Product</option>
                <option value="Group Category">Group Category</option>
                <option value="Category">Category</option>
                <option value="Attribute">Attribute</option>
                <option value="Delivery Fee">Delivery Fee</option>
              </select>
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
