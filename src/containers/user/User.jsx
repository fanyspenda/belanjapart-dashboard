/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/sort-comp */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import TableListingPage from '../../components/hoc/table/TableListingPageUserAdmin';
import { fetchData, deleteData } from '../../actions/user.action';
import { setParamUserAdmin } from '../../reducers/app.reducer';
import EditAction from '../../components/tableActions/EditAction';
import DeleteAction from '../../components/tableActions/DeleteAction';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static columns = props => {
    const columns = [
      {
        dataField: 'name',
        text: 'Full Name',
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
        dataField: 'email',
        text: 'Email Address',
        sort: true
      },
      {
        dataField: 'phone',
        text: 'Handphone Number',
        formatter: cell => (cell === '' ? '-' : cell)
        // sort: true
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
  data: state.user,
  app: state.app
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData,
  setParamUserAdmin
})(
  TableListingPage({
    name: 'USER',
    columns: User.columns,
    enableActiveStatusFilter: true
  })(User)
);
