import React, { Component } from 'react'
import { connect } from "react-redux";
import { deleteLocationById } from '../actions/locationActions';
import Swal from 'sweetalert2';
import M from 'materialize-css/dist/js/materialize.min';
import { deleteTypeById } from '../actions/typeActions';
import { deleteTourById } from './../actions/tourActions';
import { Fragment } from 'react';

class DeleteButton extends Component {

  componentDidMount() {
    M.AutoInit()
  }

  handleDelete(id) {
    const url = window.location.href
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        if (url.includes('locations')) { this.props.deleteLocationById(id) }
        if (url.includes('types')) { this.props.deleteTypeById(id) }
        if (url.includes('tours')) { this.props.deleteTourById(id) }
        Swal.fire({
          title: 'Deleted!',
          icon: 'success',
          timer: 2000
        }
        )
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  render() {
    return (
      <Fragment>
        {this.props.auth.user.role === "ROLE_ADMIN" ?
          <button className="action-btn btn-flat btn-small center-align red-text tooltipped" data-position="top" data-tooltip="Delete" onClick={() => this.handleDelete(this.props.id)}>Delete</button>
          : null}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteLocationById, deleteTypeById, deleteTourById }
)(DeleteButton);
