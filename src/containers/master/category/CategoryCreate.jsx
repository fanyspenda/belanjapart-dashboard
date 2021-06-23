import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, reset, change } from 'redux-form';
import { connect } from 'react-redux';
import {
  renderField,
  required,
  textAreaField,
  requiredArray
} from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import { fetchData, createData, fetchAllData } from '@actions/category.action';
import SelectGroup from '@components/select/SelectGroup';
import SelectParentCategory from '@components/select/SelectParentCategory';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';
import FieldDropzoneUpload from '@components/dropzone/FieldDropzoneUpload';
import { nullPicture } from '@actions/file.action';
import SelectGroupParent from '@components/select/SelectGroupParent';
import { cekImageExt } from '@helpers/image';

class CategoryCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      parentDisabled: false,
      groupDisabled: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { location, nullPicture } = this.props;
    if (nextProps.location === location) {
      nullPicture();
    }
  }

  onSubmit(value) {
    const obj = {};
    const { picture } = this.state;
    const { createData, dispatch, nullPicture, fetchAllData } = this.props;
    obj.code = value.code;
    obj.description = value.description;
    obj.name = value.name;
    obj.alternative_name = value.alternative_name;
    obj.status = true;

    // if (typeof value.group_id === 'object') {
    //   obj.group_id = value.group_id.value;
    // } else {
    //   obj.group_id = value.group_id;
    // }
    obj.group_id = '';

    obj.group_category_detail = [];

    if (value.group_id && value.group_id.length > 0) {
      obj.group_category_detail = value.group_id.map(i => ({ group_id: i }));
    }

    obj.category_parent_detail = [];
    if (value.parent_id && value.parent_id.length > 0) {
      obj.category_parent_detail = value.parent_id.map(i => ({ parent_id: i }));
    }

    obj.picture_id = picture.id;

    createData(obj).then(
      () => {
        dispatch(reset('createCategoryForm'));
        nullPicture();
        fetchAllData({ status: true });
        this.setState({ picture: '' });
      },
      () => {}
    );
  }

  handleFileDrop = file => this.setState({ picture: file });

  handleClearParent = flag => {
    const { dispatch } = this.props;
    this.setState({ parentDisabled: flag });
    dispatch(change('createCategoryForm', 'parent_id', null));
  };

  handleClearGroup = flag => {
    const { dispatch } = this.props;
    this.setState({ groupDisabled: flag });
    dispatch(change('createCategoryForm', 'group_id', null));
  };

  render() {
    const { handleSubmit, data } = this.props;
    const { parentDisabled, groupDisabled, picture } = this.state;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>CREATE NEW MASTER CATEGORY</ButtonBack>
              </div>
            </div>
            <form
              className="forms-sample pl-5 pt-3"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <div className="row">
                <div className="col-md-5">
                  {/* <SelectGroup
                    validate={[required]}
                    note="* untuk create category saja"
                  />
                  <SelectParentCategory
                    validate={[required]}
                    note="* untuk create sub category saja"
                  /> */}
                  <SelectGroupParent
                    validate={[requiredArray]}
                    handleClearParent={this.handleClearParent}
                    handleClearGroup={this.handleClearGroup}
                    parentDisabled={parentDisabled}
                    groupDisabled={groupDisabled}
                    note="* untuk create sub category saja"
                  />
                  <Field
                    name="description"
                    type="text"
                    component={textAreaField}
                    label="Description"
                    id="inputDescription"
                    placeholder="Input description"
                    // validate={[required]}
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
                        loader={data.isLoadingSubmit}
                      >
                        + Create New Category
                      </ButtonLoader>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 pl-5">
                  <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label="Category Name"
                    id="inputCategoryName"
                    placeholder="Input category name"
                    validate={[required]}
                  />
                  <Field
                    name="alternative_name"
                    type="text"
                    component={renderField}
                    label="Alternative Name"
                    altLabel="(Alternative 1,Alternative 2)"
                    id="inputAlternativeName"
                    placeholder="Input alternative name"
                    // validate={[required]}
                  />
                  <Field
                    name="code"
                    type="text"
                    component={renderField}
                    label="Category Code"
                    id="inputCategoryCode"
                    placeholder="Input categoy code"
                    validate={[required]}
                  />
                  <Field
                    name="picture_id"
                    type="text"
                    component={FieldDropzoneUpload}
                    id="inputImage"
                    // validate={[required]}
                    handleFileDrop={this.handleFileDrop}
                    typePicture="category"
                    dataSrc={cekImageExt(picture) ? picture : null}
                  />
                  {/* <FieldDropzoneUpload
                    handleFileDrop={this.handleFileDrop}
                    typePicture="category"
                  /> */}
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
  data: state.category
});

export default reduxForm({
  form: 'createCategoryForm'
})(
  connect(mapStateToProps, {
    fetchData,
    createData,
    nullPicture,
    fetchAllData
  })(withRouter(CategoryCreate))
);
