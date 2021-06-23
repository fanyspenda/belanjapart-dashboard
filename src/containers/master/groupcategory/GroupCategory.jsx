import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TableListingPage from '@components/hoc/table/TableListingPage';
import { fetchData, deleteData } from '@actions/groupcategory.action';
import EditActionCode from '@components/tableActions/EditActionCode';
import DeleteAction from '@components/tableActions/DeleteAction';
import { NavLink } from 'react-router-dom';
import { setParamUserAdmin } from '../../../reducers/app.reducer';

class GroupCategory extends React.Component {
  static columns = props => {
    const columns = [
      {
        dataField: 'name',
        text: 'Name Group Category',
        sort: true,
        formatter: (cell, row) => (
          <NavLink
            to={`${props.history.location.pathname}/detail/${row.code}`}
            className="button-table"
            activeClassName="active"
          >
            {cell || '-'}
          </NavLink>
        )
      },
      {
        dataField: 'parent_id',
        text: 'Type',
        formatter: (cell, row) => (
          <div>{row.parent_id ? 'Sub Group' : 'Parent Group'}</div>
        )
      },
      {
        dataField: 'code',
        text: 'Code',
        sort: true
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
    { value: 'name', label: 'Group Name' },
    { value: 'code', label: 'Group Code' }
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
  data: state.groupcategory,
  app: state.app
});

export default connect(mapStateToProps, {
  fetchData,
  deleteData,
  setParamUserAdmin
})(
  TableListingPage({
    name: 'MASTER GROUP CATEGORY',
    opt: GroupCategory.opt,
    columns: GroupCategory.columns,
    enableGroupFilter: true
  })(GroupCategory)
);
