import React, { Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';

function normalizeData(data) {
  const listData = [];

  data &&
    data.map(val => {
      if (listData.length === 0) {
        listData.push(val);
      } else if (listData.length > 0) {
        if (
          !listData.find(
            x =>
              x.user_cart.secondary_product_id ===
              val.user_cart.secondary_product_id
          )
        ) {
          listData.push(val);
        }
      }
    });

  return listData;
}

const TableWrapper = ({
  data,
  page,
  sizePerPage,
  onTableChange,
  onPageChange,
  totalSize,
  columns,
  loading,
  disablePagination
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
        <div className="card rounded w-100" style={{ border: 'none' }}>
          <div className="card-body p-3">
            <div className="grid-margin stretch-card">
              <div className="table-responsive table-ui table-striped">
                <BootstrapTable
                  remote
                  keyField="id"
                  // data={normalizeData(data)}
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
            {/* <div className="float-left">
              <p className="text-muted">
                Showing{' '}
                <span className="font-weight-bold text-dark">
                  {`${data.length} to ${sizePerPage}`}
                </span>{' '}
                entries
              </p>
            </div> */}
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
