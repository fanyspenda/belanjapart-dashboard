import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, textAreaField, required } from '@components/Field';
import ButtonLoader from '@components/ButtonLoader';
import { createData as createProduct } from '@actions/product.action';
import ButtonBack from '@components/button/ButtonBack';
import FieldDropzoneProduct from '@components/dropzone/FieldDropzoneProduct';
import SelectAttribute from '@components/select/SelectAttribute';
import SelectCategory from '@components/select/SelectCategory';
import isEmpty from 'lodash/isEmpty';
import FieldDropzoneUpload from '@components/dropzone/FieldDropzoneUpload';
import ProductSecondaryCreate from './ProductSecondaryCreate';

class ProductCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      pictureKey: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data, history } = this.props;

    if (data.current !== nextProps.data.current) {
      history.push(`/master/product/edit/${nextProps.data.current.code}`);
    }
  }

  mapOptions = () => {
    const { current } = this.props.data;
    const newOptions = current.attribute.map(i => ({
      id: i.id,
      name: i.name,
      code: i.code,
      type: i.type
    }));

    return newOptions;
  };

  onSubmit = value => {
    const obj = {};
    const { createProduct } = this.props;
    const { picture } = this.state;

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
    if (value.attribute_id && value.attribute_id.length) {
      value.attribute_id.map(item =>
        obj.attribute.push({ attribute_id: item })
      );
    }

    obj.picture = [];
    if (picture.length) {
      picture.map(item => obj.picture.push({ picture_id: item }));
    }

    // console.log('obj', obj);
    createProduct(obj).then(
      () => {
        this.setState({ picture: '' });
      },
      () => {}
    );
  };

  // handleFileDrop for primary product
  handleFileDrop = picture => {
    this.setState({ picture });
  };

  changeKey = key => {
    this.setState({ pictureKey: key });
  };

  render() {
    const {
      handleSubmit,
      data,
      data: { current }
    } = this.props;
    const { pictureKey } = this.state;

    let options = [];
    if (!isEmpty(current)) {
      if (current.attribute && current.attribute.length) {
        options = this.mapOptions();
      }
    }

    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>CREATE NEW MASTER PRODUCT</ButtonBack>
              </div>
            </div>
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
                  <SelectCategory status="create" />
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
                  <SelectAttribute />

                  <div className="row">
                    <div className="col-md-12">
                      <FieldDropzoneProduct
                        handleFileDrop={this.handleFileDrop}
                        typePicture="product"
                        key={pictureKey}
                      />
                      {/* <Field
                        name="picture_id"
                        type="text"
                        component={FieldDropzoneUpload}
                        id="inputImage"
                        validate={[required]}
                        handleFileDrop={this.handleFileDrop}
                        typePicture="product"
                      /> */}
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
            <ProductSecondaryCreate
              changeKey={this.changeKey}
              options={options}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product,
  form: state.form
});

export default reduxForm({
  form: 'createProductForm'
})(connect(mapStateToProps, { createProduct })(ProductCreate));
