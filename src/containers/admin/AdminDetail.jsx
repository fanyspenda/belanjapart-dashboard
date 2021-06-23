/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { connect } from 'react-redux';
import { detailData } from '../../actions/admin.action';
import ButtonLoader from '../../components/ButtonLoader';
import PageLoader from '../../components/PageLoader';
import ButtonBack from '../../components/button/ButtonBack';

class AdminDetail extends React.Component {
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
                  <ButtonBack>DETAIL ADMIN</ButtonBack>
                </div>
              </div>
              <form className="forms-sample pl-5 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Name
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.name}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="email">
                        Email Address
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.email}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="status">
                        Status
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.status === true
                          ? 'Active'
                          : 'Inactive'}
                      </div>
                    </div>
                    <ButtonLoader
                      type="submit"
                      className="btn btn-green-dark text-white mt-3"
                      onClick={() => {
                        history.push(`/admin/edit/${match.params.id}`);
                      }}
                    >
                      Edit
                    </ButtonLoader>
                  </div>
                  <div className="col-md-5 pl-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="password">
                        Password
                      </label>
                      {/* <div className="detail-value font-weight-bold">
                        ******
                        <i className="fas fa-eye mt-2" />
                      </div> */}
                    </div>
                    <div className="detail-admin mb-4">
                      <label
                        className="text-muted mb-0"
                        htmlFor="confirmpassword"
                      >
                        Confirm Password
                      </label>
                      {/* <div className="detail-value font-weight-bold">
                        ******
                        <i className="fas fa-eye mt-2" />
                      </div> */}
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
  data: state.admin
});

export default connect(mapStateToProps, { detailData })(AdminDetail);
