import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import SelectAttribute from '@components/select/SelectAttribute';
import { detailData } from '../../../actions/product.action';
import PageLoader from '../../../components/PageLoader';
import ButtonBack from '../../../components/button/ButtonBack';
import ProductSecondaryDetail from './ProductSecondaryDetail';

class ProductDetail extends React.Component {
  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { data, dispatch } = this.props;

    if (data.dataDetail !== nextProps.data.dataDetail) {
      let arrAttr = [];
      nextProps.data.dataDetail &&
        nextProps.data.dataDetail.productattribute &&
        nextProps.data.dataDetail.productattribute.map(val =>
          arrAttr.push(val.attribute_id)
        );
      arrAttr = [...new Set(arrAttr)];
      dispatch(change('detailProductForm', 'attribute_id', arrAttr));
    }
  }

  render() {
    const { data, route } = this.props;
    // console.log('data', data);

    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-3">
                <ButtonBack>DETAIL PRODUCT</ButtonBack>
              </div>
            </div>
            {data.isLoadingDetail ? (
              <PageLoader />
            ) : (
              <form className="forms-sample pl-5 pt-3">
                <div className="row">
                  <div className="col-md-4">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Product Name
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.name}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="id">
                        Category
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.category &&
                          data.dataDetail.category.map(item => (
                            <React.Fragment>
                              {item.category.code}
                              <br />
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="parent_id">
                        Product Code
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.code}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="description">
                        Description
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.description}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="detail-admin mb-4">
                      <SelectAttribute detail={data.detail} status="detail" />
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="atribut">
                        Picture
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail &&
                          data.dataDetail.picture &&
                          data.dataDetail.picture.map(val => (
                            <img
                              className="img-fluid img-thumbnail"
                              src={val.picture.path}
                              alt={val.picture.name}
                              style={{ width: '93px', height: '93px' }}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
            <ProductSecondaryDetail route={route} />
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
  form: 'detailProductForm' // a unique identifier for this form
  // validate
})(connect(mapStateToProps, { detailData })(ProductDetail));
