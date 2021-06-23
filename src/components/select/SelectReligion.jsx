/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { renderSelectInput } from '../Field';
import { selectReligion } from '../../actions/select.action';

class SelectReligion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opt: []
    };
  }

  componentDidMount() {
    const { selectReligion } = this.props;
    selectReligion();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (data !== nextProps.data) {
      nextProps.data.map(data => {
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
        name="religionId"
        component={renderSelectInput}
        requiredStar
        label="Religion"
        options={opt}
        id="inputReligion"
        placeholder="Choose Religion"
        validate={validate}
      />
    );
  }
}

const mapStateToProps = state => ({
  data: state.select.religion
});

export default connect(
  mapStateToProps,
  {
    selectReligion
  }
)(SelectReligion);
