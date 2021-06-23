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
      fetchData({ page, limit, status });
      if (this.props.match.path === '/master/product') {
        fetchDataFilter();
        if (setParamUserAdmin) {
          setParamUserAdmin(params);
        }
      }
      if (
        this.props.match.path === '/master/atribut' ||
        this.props.match.path === '/master/groupcategory' ||
        this.props.match.path === '/master/category' ||
        this.props.match.path === '/master/fee'
      ) {
        if (setParamUserAdmin) {
          setParamUserAdmin(params);
        }
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
          page,
          sort,
          by,
          name: data
        });
        this.setState({
          name: data
        });
      } else {
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

    handleSearch = e => {
      e.persist();
      this.delayedCallback(e);
    };

    handleChange = e => {
      const { value } = e.target;
      const { fetchData, setParamUserAdmin } = this.props;
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

      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }

      fetchData(params);
      this.setState({
        search: value
      });
    };

    handleClick = e => {
      let input;
      e.handleFilter(input.value);
    };

    searchCall = value => {
      const { fetchData, setParamUserAdmin } = this.props;
      const { page, limit, status, type } = this.state;
      const params = {
        page: 1,
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
      const { limit, status, type, search } = this.state;
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
        page,
        limit,
        status,
        [e]: search
      };

      if (setParamUserAdmin) {
        setParamUserAdmin(params);
      }
      fetchData(params);

      this.setState({ type: e });
    };

    onLimitChange(currLimit) {
      const { type, search, sort, by, status } = this.state;
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
      this.setState({ limit: currLimit });
    }

    render() {
      const { data, categories, route } = this.props;
      const { columns, opt } = tableProp;
      const { sort, type } = this.state;

      let customClassName = '';
      if (route.name === 'Group Category') {
        customClassName = 'col-md-4';
      } else {
        customClassName = 'col-md-5';
      }

      return (
        <div className="content-wrapper">
          <div className="row">
            <div
              className={`${customClassName} d-flex align-items-center mb-4`}
            >
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
              limit={this.state.limit}
              handleChangeOption={this.handleChangeOption}
              type={type}
              searchCall={this.searchCall}
              opt={opt}
            />
          </div>
        </div>
      );
    }
  };

export default TableListingPage;
