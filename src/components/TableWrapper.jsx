/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment } from 'react';
// import { Field, reduxForm } from 'redux-form';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import { selectField, renderSelectInput } from './Field';
import RangeDate from './RangeDate';

const MySearch = props => {
  let input;
  const handleClick = () => {
    props.handleFilter(input.value);
  };
  return (
    <div className="form-group m-0">
      <div className="input-group input-group-valet">
        <input
          type="text"
          className="form-control"
          ref={n => (input = n)}
          placeholder="Search"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleClick();
            }
          }}
        />
        <div className="input-group-prepend" onClick={handleClick}>
          <span className="input-group-text">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
    </div>
  );
};

const MySearchWithSelect = props => {
  let input;
  let select;
  const handleClick = () => {
    props.handleFilter(input.value, select.value);
  };
  return (
    <div className="form-group m-0">
      <div className="input-group input-group-valet">
        <input
          type="text"
          className="form-control"
          ref={n => (input = n)}
          placeholder="Search by"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleClick();
            }
          }}
        />
        <select
          name="searchby"
          defaultValue="name"
          className="form-control"
          component={selectField}
          ref={n => (select = n)}
        >
          <option value="name">Name</option>
          <option value="phone">Phone</option>
        </select>
        <div className="input-group-prepend" onClick={handleClick}>
          <span className="input-group-text pl-2 pr-2">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
    </div>
  );
};

const MySearchReport = props => {
  let input;
  let select;
  const handleClick = () => {
    props.handleFilter(input.value, select.value);
  };
  return (
    <div className="form-group m-0">
      <div className="input-group input-group-valet w-auto dropdown-date">
        <input
          type="text"
          className="form-control bg-transparent"
          ref={n => (input = n)}
          placeholder="Search by"
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleClick();
            }
          }}
        />
        <select
          name="searchby"
          defaultValue="name"
          className="form-control bg-transparent"
          component={selectField}
          ref={n => (select = n)}
        >
          <option value="reporter">Reporter</option>
          <option value="reported">Reported</option>
        </select>
        <div
          className="input-group-prepend bg-transparent"
          onClick={handleClick}
        >
          <span className="input-group-text py-1 px-2">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
    </div>
  );
};

const TableWrapper = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  onPageChange,
  totalSize,
  columns,
  handleFilter,
  handleChange,
  loading,
  history,
  // customAction,
  route,
  disableAddBtn,
  customPath,
  disablePagination,
  enableMembershipFilter,
  enableVerivyStatusFilter,
  enableActiveStatusFilter,
  enableDateReportFilter,
  handleSubmit,
  searchReport,
  searchWithSelect
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
        <div className="col-md-9 d-flex justify-content-end mb-4">
          {!disableAddBtn && (
            <div className="mr-2">
              <button
                onClick={() => {
                  customPath != null
                    ? history.push(customPath)
                    : // history.push(`/${route.key}/create`);
                      history.push(`/${route.key}/create`);
                }}
                className="btn btn-sm btn-primary"
              >
                Add
              </button>
            </div>
          )}
          {searchWithSelect ? (
            <MySearchWithSelect handleFilter={handleFilter} />
          ) : searchReport ? (
            <MySearchReport handleFilter={handleFilter} />
          ) : (
            <MySearch handleFilter={handleFilter} />
          )}
          {/* {customAction} */}
          <Fragment>
            {enableMembershipFilter && (
              <select
                className="form-control mx-2 w-auto"
                name="status"
                component={selectField}
              >
                <option value="all">User Type: All</option>
                <option value={1}>Membership</option>
                <option value={2}>Female Membership</option>
                <option value={0}>Non Membership</option>
              </select>
            )}
            {enableVerivyStatusFilter && (
              <select
                className="form-control mx-2 w-auto"
                name="verify"
                component={renderSelectInput}
                onChange={handleChange}
              >
                <option key="verifyStatus" value="">
                  Status: All
                </option>
                <option key="verifyStatus" value={false}>
                  Status: Unverified
                </option>
                <option key="verifyStatus" value>
                  Status: Verified
                </option>
                <option key="verifyStatus" value="rejected">
                  Status: Rejected
                </option>
              </select>
            )}
            {enableActiveStatusFilter && (
              <select
                className="form-control mx-2 w-auto"
                name="status"
                component={selectField}
              >
                <option value="all">Status: All</option>
                <option value={1}>Status: Active</option>
                <option value={0}>Status: Inactive</option>
              </select>
            )}
            {enableDateReportFilter && <RangeDate handleClick={handleSubmit} />}
          </Fragment>
        </div>

        <div className="card rounded w-100" style={{ border: 'none' }}>
          <div className="card-body">
            <div className="grid-margin stretch-card">
              <div className="table-responsive table-ui">
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
                  {...paginationTableProps}
                />
              </div>
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
