/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { renderSelectInput } from '../Field';
import { selectData } from '../../actions/counseling/category.action';

class SelectCategoryKonseling extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opt: []
    };
  }

  componentDidMount() {
    const { selectData } = this.props;
    selectData();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (data !== nextProps.data) {
      nextProps.data.select.map(data => {
        this.setState(state => {
          const opt = [...state.opt, { value: data.id, label: data.name }];
          return {
            opt
          };
        });
      });
    }
  }

  render() {
    const { opt } = this.state;
    const { validate } = this.props;
    return (
      <Field
        name="konselCategoryId"
        component={renderSelectInput}
        requiredStar
        label="Category"
        options={opt}
        id="inputCategory"
        placeholder="Choose category"
        validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.categoryKonseling
});

export default connect(
  mapStateToProps,
  {
    selectData
  }
)(SelectCategoryKonseling);
