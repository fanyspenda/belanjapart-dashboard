import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import RangePickerFilter from '@components/antd/RangePickerFilter';
import _ from 'lodash';
import SearchTable from '@components/hoc/table/SearchTable';
import { selectField } from '@components/Field';
// import SearchTable from './SearchTable';
// import { selectField } from '../../Field';

function filterData(data) {
  const listData = [];
  data.map(x => {
    if (
      _.findIndex(listData, {
        id: x.id,
        group_code: x.group_code
      }) === -1 ||
      _.findIndex(listData, {
        id: x.id,
        parent_name: x.parent_name
      }) === -1
    ) {
      listData.push(x);
    }
  });

  return listData;
}

const TableWrapper = ({
  categories,
  data,
  page,
//   sizePerPage,
  handleSearch,
  handleChange,
  handleFilter,
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
  enableGroupFilter,
  enableCategoryFilter,
  enableParentFilter,
  enableDateFilter,
  enableStatusFilter
}) => (
  //   <PaginationProvider
  //     pagination={paginationFactory({
  //       custom: true,
  //       page,
  //       sizePerPage,
  //       totalSize,
  //       alwaysShowAllBtns: true,
  //       prePageText: 'Prev', // the text of previous page button
  //       nextPageText: 'Next',
  //       withFirstAndLast: false
  //     })}
  //   >
  //     {({ paginationProps, paginationTableProps }) => (
  <ToolkitProvider
    bootstrap4
    keyField="id"
    columns={columns}
    // eslint-disable-next-line no-undef
    data={filterData(data)}
    search
  >
    {props => (
      <Fragment>
        <div
          className={`${
            route.name === 'TRANSACTION' ? 'col-md-10' : 'col-md-7'
          }  d-flex justify-content-end mb-4`}
        >
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
              <option value="0">Cancelled</option>
              <option value="1">Waiting for Payment</option>
              <option value="2">Being Processed</option>
              <option value="3">Being Sent</option>
              <option value="4">Successful</option>
            </select>
          )}

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
            <option value={0}>Parent Category</option>
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

        <div className="card rounded w-100" style={{ border: 'none' }}>
          <div className="card-body">
            <div className="grid-margin stretch-card">
              <div className="table-responsive table-ui table-striped">
                <BootstrapTable
                  {...props.baseProps}
                  // remote
                  keyField="id"
                  columns={columns}
                  bordered={false}
                  loading={loading}
                  pagination={paginationFactory({
                    sizePerPage: 10,
                    paginationSize: 3,
                    pageStartIndex: 1,
                    alwaysShowAllBtns: false, // Always show next and previous button
                    withFirstAndLast: false, // Hide the going to First and Last page button
                    hideSizePerPage: true, // Hide the sizePerPage dropdown always
                    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
                    firstPageText: 'First',
                    prePageText: 'Back',
                    nextPageText: 'Next',
                    lastPageText: 'Last',
                    nextPageTitle: 'First page',
                    prePageTitle: 'Pre page',
                    firstPageTitle: 'Next page',
                    lastPageTitle: 'Last page',
                    showTotal: true,
                    paginationTotalRenderer: (from, to, size) => (
                      <div className="float-left">
                        <p className="text-muted">
                          Showing{' '}
                          <span className="font-weight-bold text-dark">
                            {`${from} to ${to} of ${size}`}
                          </span>{' '}
                          entries
                        </p>
                      </div>
                    )
                  })}
                  //   onTableChange={onTableChange}
                  noDataIndication={() => (
                    <div className="text-center">Empty Data</div>
                  )}
                  overlay={overlayFactory({
                    spinner: true,
                    background: 'rgba(192,192,192,0.3)'
                  })}
                  wrapperClasses="table-responsive"
                  //   {...paginationTableProps}
                />
              </div>
            </div>
            {/* <div className="float-left">
                                  <p className="text-muted">
                                    Showing{' '}
                                    <span className="font-weight-bold text-dark">
                                      {`${data.length} to ${sizePerPage}`}
                                    </span>{' '}
                                    entries
                                  </p>
                                </div> */}
            {/* {!disablePagination && (
                                  <div className="float-right">
                                    {data.length > 0 && (
                                      <PaginationListStandalone
                                        {...paginationProps}
                                        onPageChange={onPageChange}
                                      />
                                    )}
                                  </div>
                                )} */}
          </div>
        </div>
      </Fragment>
    )}
  </ToolkitProvider>

  //     )}
  //   </PaginationProvider>
);

export default TableWrapper;
