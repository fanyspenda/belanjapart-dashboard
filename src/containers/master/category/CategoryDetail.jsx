import React from 'react';
import { connect } from 'react-redux';
import { detailData } from '@actions/category.action';
import ButtonLoader from '@components/ButtonLoader';
import PageLoader from '@components/PageLoader';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';

class CategoryDetail extends React.Component {
  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  render() {
    const { data, history, match } = this.props;
    // console.log(data);

    return (
      <div className="content-wrapper">
        {data.isLoadingDetail ? (
          <PageLoader />
        ) : (
          <div className="row pt-5">
            <div className="col-md-12 grid-margin">
              <div className="row mb-3 pl-3">
                <div className="col-md-3">
                  <ButtonBack>DETAIL MASTER CATEGORY</ButtonBack>
                </div>
              </div>
              <form className="forms-sample pl-5 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="group_id">
                        Parent Group Category / Sub Group Code
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail &&
                          data.dataDetail.group_detail &&
                          data.dataDetail.group_detail.length &&
                          data.dataDetail.group_detail.map(item => (
                            <React.Fragment>
                              {item.group_code} <br />
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="group_id">
                        Parent Category
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail &&
                          data.dataDetail.parent_detail &&
                          data.dataDetail.parent_detail.length &&
                          data.dataDetail.parent_detail.map(item => (
                            <React.Fragment>
                              {item.parent_code} <br />
                            </React.Fragment>
                          ))}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="code">
                        Category Code
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
                    <div className="row">
                      <div className="col-md-4 pl-0">
                        <ButtonCancel className="btn btn-green-outline text-white mt-3">
                          Back
                        </ButtonCancel>
                      </div>
                      <div className="col-md-4 pl-0">
                        <ButtonLoader
                          type="submit"
                          className="btn btn-green-dark text-white mt-3"
                          onClick={() => {
                            history.push(
                              `/master/category/edit/${match.params.id}`
                            );
                          }}
                        >
                          Edit
                        </ButtonLoader>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 pl-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Category Name
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.name}
                      </div>
                    </div>
                    {/* <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="id">
                        Category ID
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.id}
                      </div>
                    </div> */}
                    <div className="detail-admin mb-4">
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && (
                          <img
                            className="img-fluid img-thumbnail"
                            src={data.dataDetail.picture.path}
                            alt={data.dataDetail.picture.name}
                          />
                        )}
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
  data: state.category
});

export default connect(mapStateToProps, { detailData })(CategoryDetail);
