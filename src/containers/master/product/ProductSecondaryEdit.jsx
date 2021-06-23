/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { reduxForm, FieldArray, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import Button from 'reactstrap-button-loader';
import { withRouter } from 'react-router-dom';
import {
  fetchData as fetchSecondary,
  createData as createSecondary,
  deleteAll
} from '@actions/secondary.action';
import { detailData } from '@actions/product.action';
import ButtonCancel from '@components/button/ButtonCancel';
import isEmpty from 'lodash/isEmpty';
import PageLoader from '@components/PageLoader';
import { message } from 'antd';
import 'antd/lib/message/style/css';
import RenderSecondaryProductEdit from './components/RenderSecondaryProductEdit';
import SecondaryHeader from './components/SecondaryHeader';

class ProductSecondaryEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  updateField = (index, name, value) => {
    const { dispatch } = this.props;
    return dispatch(
      change('editProductSecondaryForm', `product[${index}].${name}`, value)
    );
  };

  onSecondarySubmit = value => {
    const {
      createSecondary,
      data: { current },
      deleteAll,
      match
    } = this.props;

    const { product } = value;

    const secondary = product.reduce((acc, val) => {
      // const attribute = val.attribute;
      acc.push({
        code: val.code,
        unit: val.unit,
        manufacture: val.manufacture,
        attribute: val.attribute,
        quantity: +val.quantity,
        price: parseInt(val.price),
        picture_id: val.image ? val.image.id : val.picture_id,
        pdf1_id: val.pdf1 ? val.pdf1.id : val.pdf1_id,
        pdf2_id: val.pdf2 ? val.pdf2.id : val.pdf1_id,
        name: current.name,
        product_id: current.id,
        weight: +val.weight,
        dimensional_weight: +val.dimensional_weight,
        status: true
      });
      return acc;
    }, []);
    const dataSecondary = { secondary };

    if (dataSecondary.secondary.length === 0) {
      // console.log('kosong');
      deleteAll(current.id, match.params.id);
    } else {
      this.submiting(createSecondary, dataSecondary, current, match.params.id);
    }
  };

  async validationAttribute(val, data) {
    let index = 0;
    let message = '';
    let breakForce = false;
    const key = [
      'code',
      'unit',
      'quantity',
      'price',
      'weight',
      'dimensional_weight'
    ];
    const word = [
      'SKU',
      'Unit',
      'Quantity',
      'Price/unit',
      'True Weight',
      'Dimensional Weight'
    ];
    for (let i = 0; i < val.secondary.length; i++) {
      for (let j = 0; j < key.length; j++) {
        if (j !== 3) {
          if (!val.secondary[i][key[j]]) {
            message = word[j];
            index = i;
            breakForce = true;
            break;
          }
        } else if (
          !val.secondary[i][key[j]] &&
          val.secondary[i][key[j]] !== 0
        ) {
          message = word[j];
          index = i;
          breakForce = true;
          break;
        }
      }
      if (breakForce) {
        breakForce = true;
        break;
      }
      if (val.secondary[i].attribute) {
        for (let k = 0; k < val.secondary[i].attribute.length; k++) {
          if (val.secondary[i].attribute[k].attribute_type === 'string') {
            if (
              !val.secondary[i].attribute[k].string_value ||
              val.secondary[i].attribute[k].int_value === ''
            ) {
              message = `Attribute ${
                data.productattribute.find(
                  x =>
                    x.attribute_id ===
                    val.secondary[i].attribute[k].attribute_id
                ).code
              }`;
              index = i;
              breakForce = true;
              break;
            }
          }
          if (val.secondary[i].attribute[k].attribute_type === 'int') {
            if (!val.secondary[i].attribute[k].int_value) {
              message = `Attribute ${
                data.productattribute.find(
                  x =>
                    x.attribute_id ===
                    val.secondary[i].attribute[k].attribute_id
                ).code
              }`;
              index = i;
              breakForce = true;
              break;
            }
          }
        }
      }
      if (breakForce) {
        breakForce = true;
        break;
      }
    }

    return { breakForce, index, message };
  }

  async submiting(createSecondary, dataSecondary, current, code) {
    createSecondary(dataSecondary, code);
  }

  render() {
    const {
      handleSubmit,
      data,
      data: { current },
      options,
      submitting,
      pristine,
      invalid,
      listAttributeProduct
    } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div
              className={`container ${
                isEmpty(current) ? 'disabled-element' : ''
              } my-3 pb-3 rounded`}
            >
              {/* <div className="container my-3 pb-3 rounded"> */}
              <div className="row mb-3 pt-3">
                <div className="col-md-4">
                  <h5 className="font-weight-bold">EDIT SECONDARY PRODUCT</h5>
                </div>
                <div className="col-md-2">
                  <SecondaryHeader
                    dataSecondary={data.dataDetail && data.dataDetail}
                    listAttributeProduct={listAttributeProduct}
                  />
                </div>
              </div>
              {data.isLoadingDetail ? (
                <PageLoader />
              ) : (
                <form onSubmit={handleSubmit(this.onSecondarySubmit)}>
                  <FieldArray
                    name="product"
                    component={RenderSecondaryProductEdit}
                    addAttribute={this.addAttribute}
                    data={options}
                    updateField={this.updateField}
                    dataSecondary={data.dataDetail && data.dataDetail}
                  />

                  <div className="row pt-5 mb-0">
                    <div className="col-md-1">
                      <ButtonCancel className="btn btn-green-outline text-white">
                        Cancel
                      </ButtonCancel>
                    </div>
                    <div className="col-md-3 pl-5">
                      <Button
                        type="submit"
                        disabled={submitting || pristine || invalid}
                        className="btn btn-green-dark text-white mt-3"
                        loading={data.isLoading}
                      >
                        Update Product
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product,
  dataSecondary: state.secondary
});

export default reduxForm({
  form: 'editProductSecondaryForm'
})(
  connect(mapStateToProps, {
    createSecondary,
    detailData,
    fetchSecondary,
    deleteAll
  })(withRouter(ProductSecondaryEdit))
);
