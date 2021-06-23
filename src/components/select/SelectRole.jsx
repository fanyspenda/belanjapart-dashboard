/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchData } from '../../actions/role.action';
import { renderSelectInput } from '../Field';

class SelectRole extends React.Component {
  state = {};

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData({ page: 1, status: true, limit: 10 });
  }

  render() {
    const { validate, data } = this.props;

    const opt = data.data.reduce((acc, vl) => {
      vl.slug !== 'user' &&
        acc.push({
          label: vl.name,
          value: vl.id
        });
      return acc;
    }, []);

    return (
      <Field
        name="role_id"
        component={renderSelectInput}
        requiredStar
        label="Role"
        options={opt}
        id="inputRole"
        placeholder="Choose Role"
        validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.role
});

export default connect(mapStateToProps, {
  fetchData
})(SelectRole);
