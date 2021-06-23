import React from 'react';
import { connect } from 'react-redux';
import ButtonLoader from '@components/ButtonLoader';
import { detailData } from '@actions/groupcategory.action';
import PageLoader from '@components/PageLoader';
import ButtonBack from '@components/button/ButtonBack';
import ButtonCancel from '@components/button/ButtonCancel';

class GroupCategoryDetail extends React.Component {
  componentDidMount() {
    const { detailData, match } = this.props;
    detailData(match.params.id);
  }

  render() {
    const { data, history, match } = this.props;
    // console.log(data.dataDetail);

    return (
      <div className="content-wrapper">
        {data.isLoadingDetail ? (
          <PageLoader />
        ) : (
          <div className="row pt-5">
            <div className="col-md-12 grid-margin">
              <div className="row mb-3 pl-3">
                <div className="col-md-3">
                  <ButtonBack>DETAIL MASTER GROUP CATEGORY</ButtonBack>
                </div>
              </div>
              <form className="forms-sample pl-5 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="parent_id">
                        Parent Code
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.parent_id}
                      </div>
                    </div>
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="name">
                        Name Group Category
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.name}
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
                          onClick={() =>
                            history.push(
                              `/master/groupcategory/edit/${match.params.id}`
                            )
                          }
                        >
                          Edit
                        </ButtonLoader>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 pl-3">
                    <div className="detail-admin mb-4">
                      <label className="text-muted mb-0" htmlFor="code">
                        Category Group / Sub Group Code
                      </label>
                      <div className="detail-value font-weight-bold">
                        {data.dataDetail && data.dataDetail.code}
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
  data: state.groupcategory
});

export default connect(mapStateToProps, { detailData })(GroupCategoryDetail);
