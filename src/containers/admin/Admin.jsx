/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/sort-comp */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TableListingPage from '../../components/hoc/table/TableListingPageUserAdmin';
import { fetchData, deleteData } from '../../actions/admin.action';
import { setParamUserAdmin } from '../../reducers/app.reducer';
import EditAction from '../../components/tableActions/EditAction';
import DeleteAction from '../../components/tableActions/DeleteAction';
// import DetailAction from '../../components/tableActions/DetailAction';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static columns = props => {
    const columns = [
      {
        dataField: 'name',
        text: 'Name',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${props.history.location.pathname}/detail/${row.id}`}
            className="button-table"
            activeClassName="active"
          >
            {row.name ? row.name : '-'}
          </NavLink>
          // <button
          //   className="button-table"
          //   // onClick={() => {
          //   //   history.push(`${history.location.pathname}/detail/${row.id}`);
          //   // }}
          // >
          //   <a href={`${history.location.pathname}/detail/${row.id}`}>
          //     {row.name ? row.name : '-'}
          //   </a>
          // </button>
        )
      },
      {
        dataField: 'email',
        text: 'Email Address',
        sort: true
      },
      {
        dataField: 'status',
        text: 'Status',
        classes: (row, rowIndex) => {
          if (rowIndex.separator) {
            return 'separator';
          }
          return '';
        },
        formatter: status => (
          <div>
            {status === true ? (
              <span
                className="btn btn-success btn-md"
                style={{ cursor: 'default' }}
              >
                Active
              </span>
            ) : (
              <span
                className="btn btn-danger btn-md"
                style={{ cursor: 'default' }}
              >
                Non Active
              </span>
            )}
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

  render() {
    return (
      <Fragment>
        <div style={{ width: 200 }} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.admin,
  app: state.app
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData,
  setParamUserAdmin
})(
  TableListingPage({
    name: 'ADMIN',
    columns: Admin.columns,
    enableActiveStatusFilter: true
  })(Admin)
);
