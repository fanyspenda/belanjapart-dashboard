/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import TableWrapper from './TableWrapper';
import moment from 'moment';

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
        type: null,
        tgl: null
      };
      this.delayedCallback = debounce(this.searchCall, 1000);
      this.handleFilter = this.handleFilter.bind(this);
      this.onPageChange = this.onPageChange.bind(this);
      this.onLimitChange = this.onLimitChange.bind(this);
    }

    componentDidMount() {
      const { fetchData, fetchDataFilter } = this.props;
      const { page, limit, status } = this.state;
      fetchData({ page, limit, status });
      if (this.props.match.path === '/master/product') {
        fetchDataFilter();
      }
      // console.log('match', this.props.match);
    }

    handleTableChange = (_, { sortField, sortOrder }) => {
      const { fetchData } = this.props;
      const { name, page, limit, status, tgl } = this.state;

      fetchData({
        page,
        sort: sortOrder,
        by: sortField,
        name,
        limit,
        status,
        tgl
      });

      this.setState({
        by: sortField,
        sort: sortOrder
      });
    };

    handleFilter(date) {
      const { fetchData } = this.props;
      let tempDate = null;
      if (date) {
        tempDate = `'${moment(date).format('YYYY-MM-DD')}'`;
      }
      const { page, limit, by, sort, search, status, type } = this.state;
      const params = {
        page,
        sort,
        by,
        limit,
        search,
        tgl: tempDate,
        status,
        type
      };
      fetchData(params);

      this.setState({
        tgl: tempDate
      });
    }

    handleSearch = e => {
      e.persist();
      this.delayedCallback(e);
    };

    handleChange = e => {
      const { value } = e.target;
      const { fetchData } = this.props;
      const { page, limit, status, by, sort, tgl } = this.state;
      const params = {
        page,
        sort,
        by,
        status,
        limit,
        type: value,
        tgl
      };

      fetchData(params);
      this.setState({
        type: value
      });
    };

    handleClick = e => {
      let input;
      e.handleFilter(input.value);
    };

    searchCall = value => {
      const { fetchData } = this.props;
      const { page, limit, status } = this.state;
      let params = {};
      params = {
        page,
        status,
        limit,
        search: value
      };

      fetchData(params);

      this.setState({
        search: value
      });
    };

    onPageChange(currPage) {
      const { limit, status, type, search, tgl } = this.state;
      const { fetchData } = this.props;
      fetchData({
        page: currPage,
        limit,
        status,
        type,
        search,
        tgl
      });
      this.setState({ page: currPage });
    }

    handleChangeOption = e => {
      this.setState({ type: e });
    };

    onLimitChange(currLimit) {
      const { name, sort, by, status, tgl, type } = this.state;
      const { fetchData } = this.props;
      fetchData({
        page: 1,
        sort,
        by,
        limit: currLimit,
        name,
        status,
        tgl,
        type
      });
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
              data={data.data ? data.data.log || [] : []}
              categories={categories && categories.dataFilter}
              defaultSortDirection={sort}
              columns={columns(this.props)}
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
