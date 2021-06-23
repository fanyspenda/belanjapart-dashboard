import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import PageLoader from '@components/PageLoader';
import { updateData, detailData } from '@actions/groupcategory.action';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';
import SelectParentGroup from '@components/select/SelectParentGroup';

class GroupCategoryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;
    const initInput = ['parent_id', 'name', 'code', 'status'];
    if (data.dataDetail !== nextProps.data.dataDetail) {
      initInput.map(data =>
        dispatch(
          change('editGroupCategoryForm', data, nextProps.data.dataDetail[data])
        )
      );
    }
    // console.log('nextProps', nextProps);
  }

  onSubmit(value) {
    const {
      updateData,
      data: {
        dataDetail: { id }
      }
    } = this.props;
    const obj = {};
    obj.name = value.name;
    obj.code = value.code;
    obj.status = true;

    if (typeof value.parent_id === 'object') {
      obj.parent_id = value.parent_id.value;
    } else {
      obj.parent_id = value.parent_id;
    }

    updateData(obj, id);
  }

  render() {
    const { handleSubmit, data } = this.props;
    // console.log('data', data);
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>EDIT GROUP CATEGORY</ButtonBack>
              </div>
            </div>
            {data.isLoadingDetail ? (
              <PageLoader />
            ) : (
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
                      validate={[required]}
                    />
                    <div className="row">
                      <div className="col-md-4">
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
                          Save
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
            )}
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
  form: 'editGroupCategoryForm'
})(connect(mapStateToProps, { updateData, detailData })(GroupCategoryEdit));
