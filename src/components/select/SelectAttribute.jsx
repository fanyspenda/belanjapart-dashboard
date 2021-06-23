/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import MultiSelectInput from './MultiSelectInput';
import { fetchAllData } from '../../actions/atribut.action';

class SelectAttribute extends React.Component {
  state = {
    disabled: false
  };

  componentDidMount() {
    const { fetchAllData, status } = this.props;
    fetchAllData({ status: true });
    if (status === 'detail') {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { validate, data, detail, status } = this.props;
    const { disabled } = this.state;
    const opt = data.dataAll.reduce((acc, vl) => {
      acc.push({
        label: `${vl.code} - ${vl.name}`,
        value: vl.id
      });
      return acc;
    }, []);
    // console.log('bopp', opt);

    return (
      <Field
        name="attribute_id"
        component={MultiSelectInput}
        // requiredStar
        label="Atribut"
        options={opt}
        id="inputAtribut"
        placeholder="Choose Attribute"
        detail={detail}
        status={status}
        disabled={disabled}
        // validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.atribut
});

export default connect(mapStateToProps, {
  fetchAllData
})(SelectAttribute);
