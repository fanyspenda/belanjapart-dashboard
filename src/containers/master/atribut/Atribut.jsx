/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TableListingPage from '@components/hoc/table/TableListingPage';
import { fetchData, deleteData } from '@actions/atribut.action';
import EditAction from '@components/tableActions/EditAction';
import DeleteAction from '@components/tableActions/DeleteAction';
import { getImage } from '@helpers/image';
import { NavLink } from 'react-router-dom';
import { setParamUserAdmin } from '../../../reducers/app.reducer';
import file_error from '../../../../public/images/icon/error-image-generic.png';

class Atribut extends Component {
  static columns = props => {
    const addDefaultSrc = ev => {
      ev.target.src = file_error;
    };

    const columns = [
      {
        dataField: 'name',
        text: 'Atribut Name',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${props.history.location.pathname}/detail/${row.id}`}
            className="button-table"
            activeClassName="active"
          >
            {row.name ? row.name : '-'}
          </NavLink>
        )
      },
      {
        dataField: 'code',
        text: 'Atribut ID',
        sort: true
      },
      {
        dataField: 'picture',
        text: 'Image',
        formatter: (cell, row) => (
          <div className="img-category">
            <img
              onError={addDefaultSrc}
              src={getImage(row.picture.path)}
              alt="product"
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
            <EditAction data={row} />
            <DeleteAction row={row} deleteData={props.deleteData} {...props} />
          </div>
        )
      }
    ];
    return columns;
  };

  static opt = [
    { value: 'name', label: 'Attribute Name' },
    { value: 'code', label: 'Attribute Code' }
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
  data: state.atribut,
  app: state.app
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData,
  setParamUserAdmin
})(
  TableListingPage({
    name: 'MASTER ATRIBUT',
    opt: Atribut.opt,
    columns: Atribut.columns,
    enableActiveStatusFilter: true
  })(Atribut)
);
