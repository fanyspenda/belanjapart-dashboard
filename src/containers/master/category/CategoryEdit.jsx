/* eslint-disable camelcase */
import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, required, textAreaField } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import PageLoader from '@components/PageLoader';
import SelectGroup from '@components/select/SelectGroup';
import SelectParentCategory from '@components/select/SelectParentCategory';
import { updateData, detailData } from '@actions/category.action';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';
import FieldDropzoneUpload from '@components/dropzone/FieldDropzoneUpload';
import { cekImageExt } from '@helpers/image';
import SelectGroupParent from '@components/select/SelectGroupParent';

class CategoryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      prevPicture: '',
      valueParrent: null,
      parentDisabled: false,
      groupDisabled: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;
    const initInput = [
      'code',
      'description',
      'name',
      'id',
      'picture_id',
      'alternative_name'
    ];
    if (data.dataDetail !== nextProps.data.dataDetail) {
      const {
        dataDetail,
        dataDetail: { picture, picture_id }
      } = nextProps.data;

      if (dataDetail.group_detail) {
        this.setState({ parentDisabled: true });
      }

      if (dataDetail.parent_detail) {
        this.setState({ groupDisabled: true });
      }

      const dispatchEdit = (name, data) =>
        dispatch(change('editCategoryForm', name, data));

      initInput.map(data => dispatchEdit(data, dataDetail[data]));

      // change parent_id
      const arrGroup = [];
      nextProps.data.dataDetail &&
        nextProps.data.dataDetail.group_detail &&
        nextProps.data.dataDetail.group_detail.map(val =>
          arrGroup.push(val.group_id)
        );
      dispatch(change('editCategoryForm', 'group_id', arrGroup));

      // change parent_id
      const arrParent = [];
      nextProps.data.dataDetail &&
        nextProps.data.dataDetail.parent_detail &&
        nextProps.data.dataDetail.parent_detail.map(val =>
          arrParent.push(val.parent_id)
        );

      dispatch(change('editCategoryForm', 'parent_id', arrParent));
      this.setState({
        valueParrent: arrParent
      });
      // console.log('nextProps.data.dataDetail', nextProps.data.dataDetail);

      this.setState({ picture, prevPicture: picture_id });
    }
  }

  onSubmit(value) {
    const obj = {};
    const { picture, prevPicture } = this.state;
    const { data, updateData } = this.props;
    const { id } = data.dataDetail;

    obj.code = value.code;
    obj.description = value.description;
    obj.name = value.name;
    obj.alternative_name = value.alternative_name;
    obj.status = true;
    if (typeof value.id === 'object') {
      obj.id = value.id.value;
    } else {
      obj.id = value.id;
    }

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

    // Set object with existing picture or new picture
    obj.picture_id = picture.id || prevPicture;

    updateData(obj, id);
  }

  handleFileDrop = file => {
    // const { dispatch } = this.props;
    // dispatch(change('editCategoryForm', 'picture_id', file.id));
    this.setState({ picture: file });
  };

  handleClearParent = flag => {
    const { dispatch } = this.props;
    this.setState({ parentDisabled: flag });
    dispatch(change('editCategoryForm', 'parent_id', null));
  };

  handleClearGroup = flag => {
    const { dispatch } = this.props;
    this.setState({ groupDisabled: flag });
    dispatch(change('editCategoryForm', 'group_id', null));
  };

  render() {
    const { picture, parentDisabled, groupDisabled, valueParrent } = this.state;
    const { handleSubmit, data } = this.props;
    // console.log('data', data);
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-3">
                <ButtonBack>EDIT CATEGORY</ButtonBack>
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
                  <div className="col-md-5">
                    {/* <SelectGroup
                      validate={[required]}
                      note="* untuk edit sub category saja"
                    />
                    <SelectParentCategory
                      validate={[required]}
                      note="* untuk edit sub category saja"
                    /> */}
                    <SelectGroupParent
                      validate={[required]}
                      valueParrent={valueParrent}
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
                          Save
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
                    />
                    <Field
                      name="code"
                      type="text"
                      component={renderField}
                      label="Category Code"
                      id="inputCategoryCode"
                      placeholder="Input categoy code"
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
  data: state.category
});

export default reduxForm({
  form: 'editCategoryForm'
})(connect(mapStateToProps, { updateData, detailData })(CategoryEdit));
