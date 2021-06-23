import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchAllData } from '../../actions/category.action';
import MultiSelectInput from './MultiSelectInput';

class SelectCategory extends React.Component {
  componentDidMount() {
    const { fetchAllData } = this.props;
    fetchAllData({ status: true });
  }

  render() {
    const { data } = this.props;
    const opt = data.dataAll.reduce((acc, vl) => {
      acc.push({
        label: `Code: ${vl.code} || Name: ${vl.name}`,
        value: vl.id
      });
      return acc;
    }, []);

    return (
      <Field
        name="category_id"
        component={MultiSelectInput}
        label="Category"
        options={opt}
        id="inputCategory"
        placeholder="Choose Category"
        // requiredStar
        // validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.category
});

export default connect(mapStateToProps, {
  fetchAllData
})(SelectCategory);
