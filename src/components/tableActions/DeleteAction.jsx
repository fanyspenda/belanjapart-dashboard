/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import swal from 'sweetalert2';

class DeleteAction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDelete(row) {
    const { deleteData, app } = this.props;
    swal
      .fire({
        title: 'Are You Sure To Delete Data ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !swal.isLoading()
      })
      .then(result => {
        if (result.value) {
          deleteData(row.id, app.params);
        }
      });
  }

  render() {
    const { row } = this.props;
    return (
      <button
        className="btn btn-outline-valec btn-xs p-1"
        onClick={this.onDelete.bind(this, row)}
        type="button"
      >
        <i className="fas fa-trash m-0" />
      </button>
    );
  }
}

export default DeleteAction;
