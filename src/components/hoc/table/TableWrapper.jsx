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
import RangePickerFilter from '@components/antd/RangePickerFilter';
import _ from 'lodash';
import SearchOptionTransaction from '@components/antd/SearchOption';
import SearchLimit from '@components/antd/SearchLimit';
import SearchOption from '@components/tableActions/SearchOption';
import SearchTable from './SearchTable';
import { selectField } from '../../Field';

const TableWrapper = ({
  categories,
  data,
  page,
  sizePerPage,
  handleSearch,
  handleChange,
  handleFilter,
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
  enableGroupFilter,
  enableCategoryFilter,
  enableParentFilter,
  enableDateFilter,
  enableStatusFilter,
  handleChangeOption,
  searchCall,
  filterBy,
  limit,
  type,
  opt
}) => {
  let customClassName = '';
  if(route.name === 'TRANSACTION') {
    customClassName = 'col-md-10';
  } else if(route.name === 'Group Category'){
    customClassName = 'col-md-8';
  } else {
    customClassName = 'col-md-7';
  }
  return (
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
          <div className={`${customClassName} d-flex justify-content-end mb-2`}>
            {enableDateFilter && (
              // <select
              //   className="custom-select w-auto ml-4"
              //   component={selectField}
              // >
              //   <option value="">All Date</option>
              //   <option value={0}>...</option>
              // </select>
              <RangePickerFilter handleFilter={handleFilter} />
            )}

            {enableStatusFilter && (
              <select
                className="custom-select w-auto ml-4"
                component={selectField}
                onChange={handleChange}
              >
                <option value="">All Status</option>
                <option value="Waiting Payment">Waiting Payment</option>
                <option value="Paid">Paid</option>
                <option value="Processing Shipment">Processing Shipment</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Complete">Complete</option>
                <option value="On Hold">On Hold</option>
                <option value="Refunded">Refunded</option>
                <option value="Canceled">Canceled</option>
              </select>
            )}

            {route.name === 'TRANSACTION' ? (
              <SearchOptionTransaction route={route} searchCall={searchCall} handleChangeOption={handleChangeOption} filterBy={filterBy} />
            ) : opt && (
              <SearchOption route={route} searchCall={searchCall} handleChangeOption={handleChangeOption} type={type} opt={opt} />
            )}
            

            {!disableAddBtn && (
              <div className="mr-2 mx-2">
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

          {enableGroupFilter && (
            <select
              className="custom-select w-auto ml-4"
              name="parent_id"
              component={selectField}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value={0}>Group Category</option>
              <option value={1}>Sub Group</option>
            </select>
          )}

          {enableCategoryFilter && (
            <select
              className="custom-select w-auto ml-4"
              name="group_id"
              component={selectField}
              onChange={handleChange}
            >
              <option value="">All</option>
              <option value={0}>Category</option>
              <option value={1}>Sub Category</option>
            </select>
          )}

          {enableParentFilter && (
            <select
              className="custom-select w-auto ml-4"
              name="group_id"
              onChange={handleChange}
            >
              <option key="0" value="">
                All
              </option>
              {categories.map(x => (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              ))}
            </select>
          )}

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
  )
};

export default TableWrapper;
