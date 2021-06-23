/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchData } from '../../actions/district.action';
import { renderSelectInput } from '../Field';

class SelectDistrict extends React.Component {
  state = {};

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData({ page: 1, status: true, limit: 10 });
  }

  render() {
    const { validate, data } = this.props;
    const opt = data.data.reduce((acc, vl) => {
      acc.push({
        label: vl.name,
        value: vl.id
      });
      return acc;
    }, []);

    return (
      <Field
        name="district_id"
        component={renderSelectInput}
        requiredStar
        label="District"
        options={opt}
        id="inputDistrict"
        placeholder="Choose District"
        validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.district
});

export default connect(mapStateToProps, {
  fetchData
})(SelectDistrict);
