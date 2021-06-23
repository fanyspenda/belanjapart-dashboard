/* eslint-disable react/sort-comp */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { selectField } from '../Field';

class HeaderAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleNext() {
    const { handleNext } = this.props;
    handleNext();
  }

  handlePrev() {
    const { handlePrev } = this.props;
    handlePrev();
  }

  onSubmit(data) {
    const {
      fetchData,
      page,
      by,
      sort,
      handleFilter,
      customFilter
    } = this.props;
    const { name, status } = data;
    const param = {
      name,
      page,
      by,
      sort,
      status: status === 'all' ? null : status
    };
    handleFilter(data);
    if (customFilter === undefined) {
      fetchData(param);
    } else {
      customFilter.map(val => {
        param[val.key] = data[val.value];
      });
      fetchData(param);
    }
  }

  render() {
    const { data, handleSubmit, customAction } = this.props;
    return (
      <div className="row mb-3">
        <div className="col-xl-9">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className="row">
              {/* <div className="col-xl-4">
                <Field
                  name="name"
                  type="search"
                  component={searchField}
                  placeholder="Search data name"
                />
              </div> */}
              {customAction}
              <div className="col-xl-2">
                <Field name="status" component={selectField}>
                  <option value="all">Status: All</option>
                  <option value={1}>Status: Active</option>
                  <option value={0}>Status: Inactive</option>
                </Field>
              </div>
              {/* <div className="col-xl-2">
                <button className="btn btn-wine">Search</button>
              </div> */}
            </div>
          </form>
        </div>
        {/* <div className="col-xl-3 text-right">
          <button
            className={`btn ${
              data.pagination.currentPage === 1 ? 'btn-secondary' : 'btn-wine'
            }`}
            disabled={data.pagination.currentPage === 1}
            onClick={this.handlePrev}
          >
            Back
          </button>
          <small className="text-muted ml-2 mr-2">
            {`${data.pagination.currentPage}/`}
            {`${data.pagination.lastPage}`}
          </small>
          <button
            className={`btn ${
              data.pagination.currentPage === data.pagination.lastPage
                ? 'btn-secondary'
                : 'btn-wine'
            }`}
            disabled={data.pagination.currentPage === data.pagination.lastPage}
            onClick={this.handleNext}
          >
            Next
          </button>
        </div> */}
      </div>
    );
  }
}

export default reduxForm({
  form: 'dataTableForm' // a unique identifier for this form
})(HeaderAction);
