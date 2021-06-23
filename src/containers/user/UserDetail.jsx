/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import ButtonLoader from '../../components/ButtonLoader';
import ButtonBack from '../../components/button/ButtonBack';
import PageLoader from '../../components/PageLoader';
import { detailData } from '../../actions/user.action';

class UserDetail extends React.Component {
  state = {};

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  render() {
    const { data, history, match } = this.props;

    return (
      <div className="content-wrapper">
        {data.isLoadingDetail ? (
          <PageLoader />
        ) : (
          <div className="row pt-5">
            <div className="col-md-12 grid-margin">
              <div className="row mb-3 pl-3">
                <div className="col-md-3">
                  <ButtonBack>DETAIL USER</ButtonBack>
                </div>
              </div>
              <form className="forms-sample pl-5 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Full Name
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.name}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="address">
                        Address
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.address}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label
                        className="text-muted mb-0"
                        htmlFor="province_name"
                      >
                        Province
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.province_name}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="city_name">
                        City
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.city_name}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label
                        className="text-muted mb-0"
                        htmlFor="district_name"
                      >
                        District
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.district_name}
                      </div>
                    </div>
                    <ButtonLoader
                      type="submit"
                      className="btn btn-green-dark text-white mt-3"
                      onClick={() => {
                        history.push(`/user/edit/${match.params.id}`);
                      }}
                    >
                      Edit
                    </ButtonLoader>
                  </div>
                  <div className="col-md-5 pl-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="email">
                        Email Address
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.email}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="phone">
                        Handphone Number
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.phone}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="password">
                        Password
                      </label>
                      <div className="detail-value font-weight-bold">
                        {/* {data.dataDetail && data.dataDetail.password}{' '}
                        <i className="fas fa-eye mt-2"></i> */}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="password">
                        Confirm Password
                      </label>
                      <div className="detail-value font-weight-bold">
                        {/* {data.dataDetail && data.dataDetail.password}{' '}
                        <i className="fas fa-eye mt-2"></i> */}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.user
});

export default connect(mapStateToProps, { detailData })(UserDetail);
