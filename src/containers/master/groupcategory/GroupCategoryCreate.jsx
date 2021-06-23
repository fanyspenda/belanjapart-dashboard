import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required } from '../../../components/Field';
import ButtonLoader from '../../../components/ButtonLoader';
import {
  fetchData,
  createData,
  fetchAllData
} from '../../../actions/groupcategory.action';
import ButtonBack from '../../../components/button/ButtonBack';
import SelectParentGroup from '../../../components/select/SelectParentGroup';
import ButtonCancel from '../../../components/button/ButtonCancel';

class GroupCategoryCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(value) {
    const obj = {};
    obj.name = value.name;
    obj.code = value.code;
    obj.status = true;

    if (typeof value.parent_id === 'object') {
      obj.parent_id = value.parent_id.value;
    } else {
      obj.parent_id = value.parent_id;
    }

    const { createData, dispatch, fetchAllData } = this.props;
    createData(obj).then(
      () => {
        dispatch(reset('createGroupCategoryForm'));
        fetchAllData({ status: true });
      },
      () => {}
    );
  }

  render() {
    const { handleSubmit, data } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>CREATE NEW MASTER GROUP CATEGORY</ButtonBack>
              </div>
            </div>
            <form
              className="forms-sample pl-5 pt-3"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <div className="row">
                <div className="col-md-4">
                  <SelectParentGroup validate={[required]} />
                  <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Name Group Category"
                    id="inputGroupCategory"
                    placeholder="Input name group category"
                    // validate={[required]}
                  />
                  <div className="row">
                    <div className="col-md-5">
                      <ButtonCancel className="btn btn-green-outline text-white mt-3">
                        Cancel
                      </ButtonCancel>
                    </div>
                    <div className="col-sm-3">
                      <ButtonLoader
                        type="submit"
                        className="btn btn-green-dark text-white mt-3"
                        loader={data.isLoading}
                      >
                        + Create New Group Category
                      </ButtonLoader>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 pl-5">
                  <Field
                    name="code"
                    type="text"
                    component={renderField}
                    label="Category Group / Sub Group Code"
                    id="inputGroupSub"
                    placeholder="Input category group/sub group code"
                    validate={[required]}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.groupcategory
});

export default reduxForm({
  form: 'createGroupCategoryForm'
})(
  connect(mapStateToProps, { fetchData, createData, fetchAllData })(
    GroupCategoryCreate
  )
);
