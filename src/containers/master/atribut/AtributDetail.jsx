/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import { detailData } from '@actions/atribut.action';
import PageLoader from '@components/PageLoader';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';

class AtributDetail extends React.Component {
  state = {};

  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  renderType = dataDetail => {
    const { option } = dataDetail;
    let typeAttr = '';
    if(dataDetail.type === 'string'){
      typeAttr = 'String';
    } else if (dataDetail.type === 'int') {
      typeAttr = 'Integer';
    } else if (dataDetail.type === 'float') {
      typeAttr = 'Float';
    } else {
      typeAttr = 'Boolean';
    }
    return (
      <div className="detail-admin mb-4">
        <label htmlFor="atributType" className="text-muted mb-0">
          Type
        </label>
      <div className="detail-value font-weight-bold mb-1">{typeAttr}</div>
        <div className="container">
          <div className="row">
            {option && option.map(item => (
              <div key={item.id} className="col-md-5 p-1">
                <div className="border border-dark text-center py-1 rounded">
                  {item.string_value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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
                <ButtonBack>DETAIL MASTER ATRIBUT</ButtonBack>
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
                          Atribut Name
                        </label>
                        <div className="detail-value font-weight-bold">
                          {dataDetail.name}
                        </div>
                      </div>
                      <div className="detail-admin mb-4">
                        <label htmlFor="atributId" className="text-muted mb-0">
                          Atribut ID
                        </label>
                        <div className="detail-value font-weight-bold">
                          {dataDetail.code}
                        </div>
                      </div>
                      {dataDetail && this.renderType(dataDetail)}
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
                                `/master/atribut/edit/${match.params.id}`
                              );
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5">
                      {dataDetail && (
                        <img
                          className="img-fluid img-thumbnail"
                          src={dataDetail.picture.path}
                          alt={dataDetail.picture.name}
                        />
                      )}
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
  data: state.atribut
});

export default connect(mapStateToProps, { detailData })(AtributDetail);
