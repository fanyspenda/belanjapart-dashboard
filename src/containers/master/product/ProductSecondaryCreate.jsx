import React from 'react';
import { reduxForm, FieldArray, change, reset } from 'redux-form';
import { connect } from 'react-redux';
import ButtonLoader from '@components/ButtonLoader';
import { createData as createSecondary } from '@actions/secondary.action';
import ButtonCancel from '@components/button/ButtonCancel';
import isEmpty from 'lodash/isEmpty';
import RenderSecondaryProduct from './components/RenderSecondaryProduct';

class ProductSecondaryCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attribute: []
    };
  }

  updateField = (index, name, value) => {
    const { dispatch } = this.props;
    return dispatch(
      change('createProductSecondaryForm', `product[${index}].${name}`, value)
    );
  };

  addAttribute = value => {
    const attr = [];

    attr.push(value);

    this.setState({
      attribute: attr
    });
  };

  onSecondarySubmit = value => {
    const {
      createSecondary,
      data: { current },
      dispatch,
      changeKey
    } = this.props;
    const { product } = value;

    // console.log('product', product);
    if (!isEmpty(current)) {
      const secondary = product.reduce((acc, val) => {
        acc.push({
          code: val.code,
          unit: val.unit,
          attribute: val.attribute,
          quantity: +val.quantity,
          price: +val.price,
          picture_id: val.image.id,
          pdf1_id: val.pdf1.id,
          pdf2_id: val.pdf2.id,
          name: current.name,
          product_id: current.id,
          weight: +val.weight,
          dimensional_weight: +val.dimensional_weight,
          status: true
        });
        return acc;
      }, []);
      const dataSecondary = { secondary };
      createSecondary(dataSecondary);
      // console.log('submit', dataSecondary);
      dispatch(reset('createProductSecondaryForm'));
      dispatch(reset('createProductForm'));
      // nullPicture();
      changeKey(Date.now());
    }
  };

  render() {
    const { attribute } = this.state;
    const {
      handleSubmit,
      data,
      data: { current },
      options
    } = this.props;
    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="container disabled-element my-3 pb-3 rounded">
              {/* <div className="container my-3 pb-3 rounded"> */}
              <div className="row mb-3 pt-3">
                <div className="col-md-5">
                  <h5 className="font-weight-bold">CREATE SECONDARY PRODUCT</h5>
                </div>
              </div>
              <form onSubmit={handleSubmit(this.onSecondarySubmit)}>
                <FieldArray
                  name="product"
                  component={RenderSecondaryProduct}
                  addAttribute={this.addAttribute}
                  data={options}
                  updateField={this.updateField}
                  attribute={attribute}
                />

                <div className="row pt-5 mb-0">
                  <div className="col-md-2">
                    <ButtonCancel className="btn btn-green-outline text-white">
                      Cancel
                    </ButtonCancel>
                  </div>
                  <div className="col-md-3">
                    <ButtonLoader
                      type="submit"
                      className="btn btn-green-dark text-white mt-3"
                      loader={data.isLoading}
                    >
                      + Create New Product
                    </ButtonLoader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.product
});

export default reduxForm({
  form: 'createProductSecondaryForm'
})(connect(mapStateToProps, { createSecondary })(ProductSecondaryCreate));
