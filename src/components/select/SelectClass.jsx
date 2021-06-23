/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { renderSelectInput } from '../Field';
import { selectData as selectCategoryMeditasi } from '../../actions/meditation/category.action';
import { selectData as selectClass } from '../../actions/meditation/class.action';

class SelectClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      classes: []
    };
    this.onChangeCategory = this.onChangeCategory.bind(this);
  }

  componentDidMount() {
    const { selectCategoryMeditasi, valueCategory, selectClass } = this.props;
    selectCategoryMeditasi();
    if (valueCategory) {
      selectClass(valueCategory);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { category, kelas, valueCategory } = this.props;
    if (category !== nextProps.category) {
      nextProps.category.select.map(data => {
        this.setState(state => {
          const categories = [
            ...state.categories,
            { value: data.id, label: data.name }
          ];
          return {
            categories
          };
        });
      });
    }
    if (kelas !== nextProps.kelas) {
      this.setState({
        classes: []
      });
      nextProps.kelas.select.map(data => {
        this.setState(state => {
          const classes = [
            ...state.classes,
            { value: data.id, label: data.title }
          ];
          return {
            classes
          };
        });
      });
    }
  }

  onChangeCategory(val) {
    const { onChangeCategory } = this.props;
    onChangeCategory();
    if (val.value) {
      const { selectClass } = this.props;
      selectClass(val.value);
    } else {
      this.setState({
        classes: []
      });
    }
  }

  render() {
    const { categories, classes } = this.state;
    const { validate } = this.props;
    return (
      <Fragment>
        <Field
          name="categoryId"
          component={renderSelectInput}
          requiredStar
          label="Category"
          options={categories}
          onChange={this.onChangeCategory}
          id="inputCategory"
          placeholder="Choose category"
          validate={validate}
        />
        <Field
          name="classId"
          component={renderSelectInput}
          requiredStar
          label="Class"
          options={classes}
          disabled={classes.length === 0}
          id="inputClass"
          placeholder="Choose class"
          validate={validate}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  category: state.categoryMeditasi,
  kelas: state.kelas
});

export default connect(
  mapStateToProps,
  {
    selectCategoryMeditasi,
    selectClass
  }
)(SelectClass);
