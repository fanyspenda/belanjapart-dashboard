import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { fetchAllData } from '@actions/groupcategory.action';
// import { renderSelectInput } from '../Field';
import MultiSelectInput from './MultiSelectInput';

class SelectGroup extends React.Component {
  componentDidMount() {
    const { fetchAllData } = this.props;
    fetchAllData({ status: true });
  }

  render() {
    const { data, note } = this.props;
    const opt = data.dataAll.reduce((acc, vl) => {
      acc.push({
        label: `Code: ${vl.code} || Name: ${vl.name}`,
        value: vl.id
      });
      return acc;
    }, []);

    return (
      <Field
        name="group_id"
        component={MultiSelectInput}
        label="Group Category"
        options={opt}
        id="inputGroup"
        placeholder="Choose Group"
        note={note}
        // requiredStar
        // validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.groupcategory
});

export default connect(mapStateToProps, {
  fetchAllData
})(SelectGroup);
