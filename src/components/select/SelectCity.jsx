/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchData } from '../../actions/city.action';
import { renderSelectInput } from '../Field';

class SelectCity extends React.Component {
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
        name="city_id"
        component={renderSelectInput}
        requiredStar
        label="City"
        options={opt}
        id="inputCity"
        placeholder="Choose City"
        validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.city
});

export default connect(mapStateToProps, {
  fetchData
})(SelectCity);
