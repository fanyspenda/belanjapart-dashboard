/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchData } from '../../actions/province.action';
import { renderSelectInput } from '../Field';

class SelectProvince extends React.Component {
  state = {};

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData({ status: true });
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
    // console.log('tesss', data);

    return (
      <Field
        name="province_id"
        component={renderSelectInput}
        requiredStar
        label="Province"
        options={opt}
        id="inputProvince"
        placeholder="Choose Province"
        validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.province
});

export default connect(mapStateToProps, {
  fetchData
})(SelectProvince);
