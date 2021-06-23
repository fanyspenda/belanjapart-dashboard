/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import TableWrapper from './TableWrapper';

const TableListingPage = tableProp => WrappedComponent =>
  class TableListingHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sort: 'asc',
        by: 'createdAt',
        status: true,
        page: 1,
        limit: 50,
        name: null,
        search: null,
        type: 'name'
      };
      this.delayedCallback = debounce(this.searchCall, 1000);
      this.handleFilter = this.handleFilter.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
      this.onLimitChange = this.onLimitChange.bind(this);
    }

    componentDidMount() {
      const { fetchData, fetchDataFilter, setParamUserAdmin } = this.props;
      const { page, limit, status } = this.state;
      const params = {
        page: 1,
        limit: 50,
        status: true
      };
      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }
      fetchData({ page, limit, status });
      if (this.props.match.path === '/master/product') {
        fetchDataFilter();
      }
      // console.log('match', this.props.match);
    }

    handleTableChange = (_, { sortField, sortOrder }) => {
      const { fetchData } = this.props;
      const { name, page, limit, status } = this.state;

      fetchData({
        page,
        sort: sortOrder,
        by: sortField,
        name,
        limit,
        status
      });

      this.setState({
        by: sortField,
        sort: sortOrder
      });
    };

    handleFilter(data, filter) {
      const { fetchData } = this.props;
      const { page, sort, by } = this.state;

      if (filter === 'name') {
        fetchData({
          page: 1,
          sort,
          by,
          name: data
        });
        this.setState({
          name: data,
          page: 1
        });
      } else {
        fetchData({
          page: 1,
          sort,
          by,
          name: data
        });
        this.setState({
          name: data,
          page: 1
        });
      }
    }

    handleSearch = e => {
      e.persist();
      this.delayedCallback(e);
    };

    handleChange = e => {
      const { value } = e.target;
      const { fetchData, setParamUserAdmin } = this.props;
      const { page, limit, status, by, sort } = this.state;
      const params = {
        page: 1,
        sort,
        by,
        status,
        limit,
        parent_id: value,
        group_id: value,
        category_id: value
      };

      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }

      fetchData(params);
      this.setState({
        search: value,
        page: 1
      });
    };

    handleClick = e => {
      let input;
      e.handleFilter(input.value);
    };

    searchCall = value => {
      const { fetchData, setParamUserAdmin } = this.props;
      const { page, limit, status, by, sort, type } = this.state;
      const params = {
        page: 1,
        // sort,
        // by,
        status,
        limit,
        [type]: value
      };

      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }

      fetchData(params);

      this.setState({
        search: value,
        page: 1
      });
    };

    onPageChange(currPage) {
      const { name, sort, by, limit, status, type, search } = this.state;
      const { fetchData, setParamUserAdmin } = this.props;
      const params = {
        page: currPage,
        limit,
        status,
        [type]: search
      };
      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }
      fetchData(params);
      this.setState({ page: currPage });
    }

    handleChangeOption = e => {
      const { limit, status, search, page } = this.state;
      const { fetchData, setParamUserAdmin } = this.props;
      const params = {
        page: 1,
        limit,
        status,
        [e]: search
      };

      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }
      fetchData(params);

      this.setState({ type: e, page: 1 });
    };

    onLimitChange(currLimit) {
      const { type, sort, by, status, search } = this.state;
      const { fetchData, setParamUserAdmin } = this.props;
      const params = {
        page: 1,
        sort,
        by,
        limit: currLimit,
        [type]: search,
        status
      };
      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }
      fetchData(params);
      this.setState({ limit: currLimit, page: 1 });
    }

    render() {
      const { data, categories } = this.props;
      const { columns } = tableProp;
      const { sort, type } = this.state;

      return (
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-5 d-flex align-items-center mb-4">
              <h4 className="font-weight-bold mb-0">{tableProp.name}</h4>
            </div>
            <TableWrapper
              loading={data.isLoading}
              data={data.data}
              categories={categories && categories.dataFilter}
              defaultSortDirection={sort}
              columns={columns(this.props)}
              page={data.pagination.currentPage}
              lastPage={data.pagination.lastPage}
              sizePerPage={data.pagination.recordPerPage}
              totalSize={data.pagination.count}
              onTableChange={this.handleTableChange}
              onPageChange={this.onPageChange}
              handleFilter={this.handleFilter}
              handleChange={this.handleChange}
              history={this.props.history}
              handleSearch={this.handleSearch}
              onLimitChange={this.onLimitChange}
              disableAddBtn={tableProp.disableAddBtn}
              customPath={tableProp.customPath}
              disablePagination={tableProp.disablePagination}
              enableGroupFilter={tableProp.enableGroupFilter}
              enableCategoryFilter={tableProp.enableCategoryFilter}
              enableParentFilter={tableProp.enableParentFilter}
              enableDateFilter={tableProp.enableDateFilter}
              enableStatusFilter={tableProp.enableStatusFilter}
              customAction={
                <WrappedComponent {...this.props} state={this.state} />
              }
              route={this.props.route}
              handleChangeOption={this.handleChangeOption}
              type={type}
              searchCall={this.searchCall}
              limit={this.state.limit}
            />
          </div>
        </div>
      );
    }
  };

export default TableListingPage;
