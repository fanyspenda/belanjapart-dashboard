/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import TableWrapper from './TableWrapper';

const TableListingPage = tableProp => WrappedComponent =>
  class TableListingHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sort: 'desc',
        by: 'createdAt',
        status: true,
        page: 1,
        limit: 50,
        name: null,
        search: null
      };
      this.handleFilter = this.handleFilter.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
    }

    componentDidMount() {
      // const { fetchData } = this.props;
      // const { page, limit, status } = this.state;
      // fetchData({ page, limit, status });
      // console.log('match', this.props.match);
    }

    handleTableChange = (type, { sortField, sortOrder }) => {
      const { fetchData } = this.props;
      const { name, page } = this.state;

      let field;

      if (sortField === 'role.name') {
        field = 'role';
      } else {
        field = sortField;
      }

      fetchData({
        page,
        sort: sortOrder,
        by: field,
        name
      });

      this.setState({
        by: field,
        sort: sortOrder
      });
    };

    handleFilter(data, filter) {
      const { fetchData } = this.props;
      const { page, sort, by } = this.state;

      if (filter === 'name') {
        fetchData({
          page,
          sort,
          by,
          name: data
        });
        this.setState({
          name: data
        });
      }
    }

    handleChange = e => {
      const { value } = e.target;
      const { fetchData } = this.props;
      const { page, limit, status, by, sort } = this.state;
      const params = {
        page,
        sort,
        by,
        status,
        limit,
        parent_id: value,
        group_id: value,
        category_id: value
      };

      fetchData(params);
      this.setState({
        search: value
      });
    };

    onPageChange(currPage) {
      const { name, verify, phone, date, sort, by, limit } = this.state;
      const { fetchData } = this.props;
      fetchData({
        page: currPage,
        sort,
        by,
        limit,
        name,
        phone,
        'date[]': date,
        verify,
        status: true
      });
      this.setState({ page: currPage });
    }

    render() {
      const { data, productPurchased } = this.props;
      const { columns } = tableProp;
      const { sort } = this.state;
      // console.log('props', this.props);

      return (
        <div className="pt-5">
          <div className="row">
            <div className="col-md-5 d-flex align-items-center mb-4">
              <h4 className="font-weight-bold mb-0">{tableProp.name}</h4>
            </div>
            <TableWrapper
              loading={data.isLoading}
              data={productPurchased}
              defaultSortDirection={sort}
              columns={columns(this.props)}
              page={data.pagination.currentPage}
              lastPage={data.pagination.lastPage}
              sizePerPage={data.pagination.recordPerPage}
              totalSize={data.pagination.count}
              onTableChange={this.handleTableChange}
              handleFilter={this.handleFilter}
              handleChange={this.handleChange}
              history={this.props.history}
              customPath={tableProp.customPath}
              disablePagination={tableProp.disablePagination}
              customAction={
                <WrappedComponent {...this.props} state={this.state} />
              }
              route={this.props.route}
              onPageChange={this.onPageChange}
            />
          </div>
        </div>
      );
    }
  };

export default TableListingPage;
