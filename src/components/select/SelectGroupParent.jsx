import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, change } from 'redux-form';
import { fetchAllData as fetchGroup } from '@actions/groupcategory.action';
import { fetchAllData as fetchParent } from '../../actions/category.action';
// import { renderSelectInput } from '../Field';
import MultiSelectInput from './MultiSelectInput';

class SelectGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChangeGroup = this.onChangeGroup.bind(this);
    this.onChangeParent = this.onChangeParent.bind(this);
  }

  componentDidMount() {
    const { fetchGroup, fetchParent } = this.props;
    fetchGroup({ status: true });
    fetchParent({ status: true });
  }

  onChangeGroup(val) {
    const { handleClearParent } = this.props;
    if (Object.entries(val).length > 1) {
      handleClearParent(true);
    } else {
      handleClearParent(false);
    }
  }

  onChangeParent(val) {
    const { handleClearGroup } = this.props;
    if (Object.entries(val).length > 1) {
      handleClearGroup(true);
    } else {
      handleClearGroup(false);
    }
  }

  render() {
    const {
      data,
      note,
      cat,
      parentDisabled,
      groupDisabled,
      validate
    } = this.props;
    const optGroup = data.dataAll.reduce((acc, vl) => {
      acc.push({
        label: `Code: ${vl.code} || Name: ${vl.name}`,
        value: vl.id
      });
      return acc;
    }, []);
    const optCategory = cat.dataAll.reduce((acc, vl) => {
      if (vl.id !== '') {
        acc.push({
          label: `Code: ${vl.code} || Name: ${vl.name}`,
          value: vl.id
        });
      }
      return acc;
    }, []);

    return (
      <Fragment>
        <Field
          name="group_id"
          component={MultiSelectInput}
          label="Group Category"
          options={optGroup}
          id="inputGroup"
          placeholder="Choose Group"
          note={note}
          onChange={this.onChangeGroup}
          disabled={groupDisabled}
          // requiredStar
          // validate={validate}
        />

        <Field
          name="parent_id"
          component={MultiSelectInput}
          label="Parent Category"
          options={optCategory}
          id="inputParentCategory"
          placeholder="Input parent category"
          onChange={this.onChangeParent}
          note={note}
          disabled={parentDisabled}
          // requiredStar
          // validate={validate}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.groupcategory,
  cat: state.category
});

export default connect(mapStateToProps, {
  fetchGroup,
  fetchParent
})(SelectGroup);
