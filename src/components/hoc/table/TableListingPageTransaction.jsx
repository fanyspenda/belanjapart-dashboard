/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import TableWrapper from '@components/hoc/table/TableWrapper';
import moment from 'moment';
import { Form } from 'antd';

const searchOpr = ['code', 'customer', 'price'];

const TableListingPage = tableProp => WrappedComponent =>
  Form.create()(
    class TableListingHOC extends Component {
      constructor(props) {
        super(props);
        this.state = {
          sort: 'asc',
          by: 'createdAt',
          status: null,
          page: 1,
          limit: 50,
          name: null,
          search: null,
          startDate: null,
          endDate: null,
          filterBy: 0
        };
        this.delayedCallback = debounce(this.searchCall, 1000);
        this.handleFilter = this.handleFilter.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
      }

      componentDidMount() {
        const { fetchData } = this.props;
        const { page, limit } = this.state;
        fetchData({ page, limit });
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

      handleFilter = date => {
        const { fetchData } = this.props;
        const tempStartDate =
          date.length > 0 ? `'${moment(date[0]).format('YYYY-MM-DD')}'` : null;
        const tempEndDate =
          date.length > 0 ? `'${moment(date[1]).format('YYYY-MM-DD')}'` : null;
        const { limit, by, sort, search, status } = this.state;
        const params = {
          page: 1,
          sort,
          by,
          limit,
          search,
          startDate: tempStartDate,
          endDate: tempEndDate,
          status
        };
        fetchData(params);

        this.setState({
          startDate: tempStartDate,
          endDate: tempEndDate,
          page: 1
        });
      };

      handleSearch = e => {
        e.persist();
        this.delayedCallback(e);
      };

      handleChange = e => {
        const { value } = e.target;
        const valueStatus = value !== '' ? `'${value}'` : null;
        const { fetchData } = this.props;
        const { limit, by, sort, search, startDate, endDate } = this.state;
        const params = {
          page: 1,
          sort,
          by,
          limit,
          search,
          startDate,
          endDate,
          status: valueStatus
        };

        fetchData(params);
        this.setState({
          status: valueStatus,
          page: 1
        });
      };

      handleClick = e => {
        let input;
        e.handleFilter(input.value);
      };

      searchCall = value => {
        const { fetchData } = this.props;
        const {
          page,
          limit,
          by,
          sort,
          status,
          startDate,
          endDate,
          filterBy
        } = this.state;
        const extParam = {};
        extParam[searchOpr[filterBy]] = value;
        const params = {
          page: 1,
          sort,
          by,
          limit,
          status,
          startDate,
          endDate,
          filterBy: filterBy + 1
        };

        fetchData(Object.assign(params, extParam));

        this.setState({
          search: value,
          page: 1
        });
      };

      handleChangeOption = e => {
        this.setState({ filterBy: e });
      };

      onPageChange(currPage) {
        const { name, sort, by, limit } = this.state;
        const { fetchData } = this.props;
        fetchData({
          page: currPage,
          sort,
          by,
          limit,
          name
        });
        this.setState({ page: currPage });
      }

      onLimitChange(currLimit) {
        const { name, sort, by, status } = this.state;
        const { fetchData } = this.props;
        fetchData({
          page: 1,
          sort,
          by,
          limit: currLimit,
          name,
          status
        });
        this.setState({ limit: currLimit, page: 1 });
      }

      render() {
        const { data, categories, route, form } = this.props;
        const { columns } = tableProp;
        const { sort, filterBy } = this.state;
        return (
          <div className="content-wrapper">
            <div className="row">
              <div className="col-md-2 d-flex align-items-center mb-4">
                <h4 className="font-weight-bold mb-0">{tableProp.name}</h4>
              </div>
              <TableWrapper
                form={form}
                loading={data.isLoading}
                data={data.data}
                categories={categories && categories.data}
                defaultSortDirection={sort}
                filterBy={filterBy}
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
                searchCall={this.searchCall}
                onLimitChange={this.onLimitChange}
                handleChangeOption={this.handleChangeOption}
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
              />
            </div>
          </div>
        );
      }
    }
  );

export default TableListingPage;
