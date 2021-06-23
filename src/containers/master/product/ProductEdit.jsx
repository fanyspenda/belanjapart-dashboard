/* eslint-disable camelcase */
import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import FieldDropzoneProduct from '@components/dropzone/FieldDropzoneProduct';
import { renderField, textAreaField } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import PageLoader from '@components/PageLoader';
import { updateData, detailData } from '@actions/product.action';
import { deleteAll } from '@actions/secondary.action';
import ButtonBack from '@components/button/ButtonBack';
import SelectAttribute from '@components/select/SelectAttribute';
import SelectCategory from '@components/select/SelectCategory';
import { isSimilarTwoArr } from '@helpers/ArrarHelpers';
import ProductSecondaryEdit from './ProductSecondaryEdit';

export const required = value => (value ? undefined : 'Required');

class ProductEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      picture_id: [],
      pictureNew: [],
      currentAttr: {},
      currentSecondary: {},
      listAttributeProduct: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch, detailData, match, file } = this.props;
    // change product detail
    const initInput = [
      'description',
      'name',
      'code',
      'status',
      'alternative_name'
    ];
    if (data.dataDetail !== nextProps.data.dataDetail) {
      initInput.map(data =>
        dispatch(
          change('editProductForm', data, nextProps.data.dataDetail[data])
        )
      );

      // change category_id
      const arrCategory = [];
      nextProps.data.dataDetail &&
        nextProps.data.dataDetail.category &&
        nextProps.data.dataDetail.category.map(val =>
          arrCategory.push(val.category_id)
        );
      dispatch(change('editProductForm', 'category_id', arrCategory));
      // console.log('arrCategory', arrCategory);

      // change attribute_id
      let arrAttr = [];
      const templistAttributeProduct = [];
      nextProps.data.dataDetail &&
        nextProps.data.dataDetail.productattribute &&
        nextProps.data.dataDetail.productattribute.map(val => {
          arrAttr.push(val.attribute_id);
          const { dataAll } = this.props.attribute;
          if (dataAll && dataAll.length > 0) {
            const temp = dataAll.find(x => x.id === val.attribute_id);
            if (temp) {
              templistAttributeProduct.push(temp.code);
            }
          }
        });
      arrAttr = [...new Set(arrAttr)];
      dispatch(change('editProductForm', 'attribute_id', arrAttr));

      // change picture_id
      nextProps.data.dataDetail &&
        nextProps.data.dataDetail.picture &&
        this.setState({
          picture: nextProps.data.dataDetail.picture.map(i => i.picture),
          picture_id: nextProps.data.dataDetail.picture.map(i => ({
            picture_id: i.picture_id
          }))
        });
      dispatch(change('editProductForm', 'picture_id'));
      this.setState({
        currentAttr: arrAttr,
        currentSecondary: nextProps.data.dataDetail.secondary,
        listAttributeProduct: templistAttributeProduct
      });
    }
    if (file !== nextProps.file) {
      if (!nextProps.file.isLoading && nextProps.file.progress === 0) {
        detailData(match.params.id);
      }
    }
    // console.log('nextProps', nextProps);
  }

  onSubmit(value) {
    const obj = {};
    const {
      picture_id,
      pictureNew,
      currentAttr,
      currentSecondary
    } = this.state;
    const { id } = this.props.data.dataDetail;
    const { secondary, data } = this.props;
    obj.name = value.name;
    obj.description = value.description;
    obj.code = value.code;
    obj.alternative_name = value.alternative_name;
    obj.status = true;

    obj.category = [];
    if (value.category_id && value.category_id.length) {
      obj.category = value.category_id.map(i => ({ category_id: i }));
    }

    obj.attribute = [];
    if (value.attribute_id && value.attribute_id.length > 0) {
      value.attribute_id.map(vl => obj.attribute.push({ attribute_id: vl }));
    }

    obj.picture = picture_id;
    if (pictureNew.length) {
      obj.picture = pictureNew.map(i => ({ picture_id: i }));
    }

    const { updateData } = this.props;
    updateData(obj, id).then(
      code => {
        if (!isSimilarTwoArr(currentAttr, value.attribute_id)) {
          if (secondary && secondary.currentSecondary === 0) {
            if (data.dataDetail.secondary) {
              this.props.deleteAll(id, code).then(flag => {
                if (flag) {
                  this.props.detailData(code);
                }
              });
            } else {
              this.props.detailData(code);
            }
          }
        } else {
          this.props.detailData(code);
        }
      },
      err => {}
    );
    // console.log('obj', obj);
  }

  // handleFileDrop for primary product
  handleFileDrop = pictureNew => {
    this.setState({ pictureNew });
  };

  render() {
    const { picture, pictureNew, listAttributeProduct } = this.state;
    const { handleSubmit, data } = this.props;

    let dataSrc = picture;
    if (pictureNew.length) {
      dataSrc = '';
    }
    // console.log('state', this.state);

    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>EDIT PRODUCT</ButtonBack>
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
                    <Field
                      name="name"
                      type="text"
                      component={renderField}
                      label="Product Name"
                      id="inputProductName"
                      placeholder="Input product name"
                      validate={[required]}
                    />
                    <SelectCategory />
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
                  </div>
                  <div className="col-md-4">
                    <Field
                      name="code"
                      type="text"
                      component={renderField}
                      label="Product Code"
                      id="inputProductCode"
                      placeholder="Input product code"
                      validate={[required]}
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
                  </div>
                  <div className="col-md-4">
                    <SelectAttribute detail={data.detail} status="edit" />
                    <div className="row">
                      <div className="col-md-12">
                        <FieldDropzoneProduct
                          handleFileDrop={this.handleFileDrop}
                          typePicture="product"
                          dataSrc={dataSrc}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 pl-5">
                    <ButtonLoader
                      type="submit"
                      className="btn btn-green-dark text-white mt-3"
                      loader={data.isLoadingSubmit}
                    >
                      Save
                    </ButtonLoader>
                  </div>
                </div>
              </form>
            )}
            <ProductSecondaryEdit listAttributeProduct={listAttributeProduct} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product,
  secondary: state.secondary,
  file: state.fileupload,
  attribute: state.atribut
});

export default reduxForm({
  form: 'editProductForm'
})(
  connect(mapStateToProps, {
    updateData,
    detailData,
    deleteAll
  })(ProductEdit)
);
