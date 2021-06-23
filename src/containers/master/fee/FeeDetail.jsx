/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { detailData } from '@actions/fee.action';
import PageLoader from '@components/PageLoader';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';

class FeeDetail extends React.Component {
  state = {};

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  render() {
    const {
      data,
      data: { dataDetail },
      history,
      match
    } = this.props;

    return (
      <div className="content-wrapper">
        <div className="row pt-5">
          <div className="col-md-12 grid-margin">
            <div className="row mb-3 pl-3">
              <div className="col-md-5">
                <ButtonBack>DETAIL FEE</ButtonBack>
              </div>
            </div>
            {data.isLoadingDetail ? (
              <PageLoader />
            ) : (
              dataDetail && (
                <form className="forms-sample pl-5 pt-3">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="detail-admin mb-4">
                        <label
                          htmlFor="atributName"
                          className="text-muted mb-0"
                        >
                          City Name
                        </label>
                        <div className="detail-value font-weight-bold">
                          {dataDetail.name}
                        </div>
                      </div>
                      <div className="detail-admin mb-4">
                        <label htmlFor="atributType" className="text-muted mb-0">
                          Ekspedisi
                        </label>
                      <div className="detail-value font-weight-bold mb-1" />
                        <div className="container">
                          <div className="row">
                            {dataDetail.expedisi && dataDetail.expedisi.map(item => (
                              <Fragment>
                                <div key={item.id} className="col-md-6 p-1">
                                  <div className="border border-dark text-center py-1 rounded">
                                    {item.name}
                                  </div>
                                </div>
                                <div key={item.id} className="col-md-6 p-1">
                                  <div className="border border-dark text-center py-1 rounded">
                                    {item.price}
                                  </div>
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 pl-0">
                          <ButtonCancel>Back</ButtonCancel>
                        </div>
                        <div className="col-md-4 pl-0">
                          <button
                            type="button"
                            className="btn btn-green-dark text-white mt-3"
                            onClick={() => {
                              history.push(
                                `/master/fee/edit/${match.params.id}`
                              );
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.fee
});

export default connect(mapStateToProps, { detailData })(FeeDetail);
