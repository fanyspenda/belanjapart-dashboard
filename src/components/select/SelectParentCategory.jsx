import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchAllData } from '../../actions/category.action';
import MultiSelectInput from './MultiSelectInput';

class SelectParentCategory extends React.Component {
  componentDidMount() {
    const { fetchAllData } = this.props;
    fetchAllData({ status: true });
  }

  render() {
    const { data, note } = this.props;
    const opt = data.dataAll.reduce((acc, vl) => {
      if (vl.id !== '') {
        acc.push({
          label: `Code: ${vl.code} || Name: ${vl.name}`,
          value: vl.id
        });
      }
      return acc;
    }, []);

    return (
      <Field
        name="parent_id"
        component={MultiSelectInput}
        label="Parent Category"
        options={opt}
        id="inputParentCategory"
        placeholder="Input parent category"
        note={note}
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
})(SelectParentCategory);
