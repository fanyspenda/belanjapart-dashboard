/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchData, deleteData } from '@actions/category.action';
import EditActionCode from '@components/tableActions/EditActionCode';
import DeleteAction from '@components/tableActions/DeleteAction';
import { getImage } from '@helpers/image';
import { NavLink } from 'react-router-dom';
import TableListingPage from '@components/hoc/table/TableListingPage';
import { setParamUserAdmin } from '../../../reducers/app.reducer';
import file_error from '../../../../public/images/icon/error-image-generic.png';

class Category extends Component {
  static columns = props => {
    const columns = [
      {
        dataField: 'group_detail',
        text: 'Parent / Sub Group Category',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${props.history.location.pathname}/detail/${row.code}`}
            className="button-table"
            activeClassName="active"
          >
            {`${row.parent_name || '-'} / ${row.group_name || '-'}`}
          </NavLink>
        )
      },
      {
        dataField: 'name',
        text: 'Category Name',
        sort: true
      },
      {
        dataField: 'code',
        text: 'Code',
        sort: true
      },
      {
        dataField: 'parent_id',
        text: 'Type',
        formatter: cell => (
          <div>{cell ? 'Sub Category' : 'Parent Category'}</div>
        )
      },
      {
        dataField: 'picture.path',
        text: 'Image',
        formatter: cell => (
          <div className="img-category">
            {/* <Image path={cell} /> */}
            <img
              onError={file_error}
              src={cell === process.env.URL_FILE ? file_error : cell}
              alt="category"
            />
          </div>
        )
      },
      {
        dataField: 'action',
        text: 'Action',
        headerClasses: 'disabled-sorting text-right',
        classes: 'text-right',
        formatter: (cell, row) => (
          <div>
            <EditActionCode data={row} />
            <DeleteAction row={row} deleteData={props.deleteData} {...props} />
          </div>
        )
      }
    ];
    return columns;
  };

  static opt = [
    { value: 'name', label: 'Category Name' },
    { value: 'code', label: 'Category Code' }
  ];

  render() {
    return (
      <Fragment>
        <div style={{ width: 200 }} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.category,
  app: state.app
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData,
  setParamUserAdmin
})(
  TableListingPage({
    name: 'MASTER CATEGORY',
    opt: Category.opt,
    columns: Category.columns,
    enableCategoryFilter: true
  })(Category)
);
