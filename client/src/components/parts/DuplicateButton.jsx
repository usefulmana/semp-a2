import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createLocation } from './../actions/locationActions';
import Swal from 'sweetalert2';
import { Fragment } from 'react';


class DuplicateButton extends Component {

  handleDuplicate(loc){

    Swal.fire({
      title: 'Are you sure?',
      text: `You will create a copy of ${loc.name}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        loc.name = "Copy of " + loc.name
        this.props.createLocation(loc);
        setTimeout(window.location.reload.bind(window.location), 1000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  render() {
    return (
      <Fragment>
        {this.props.auth.user.role === "ROLE_ADMIN" && window.location.href.includes("locations") ?
          <a className="action-btn btn-flat btn-small center-align tooltipped blue-text" data-position="top" data-tooltip="Duplicate" onClick={() => this.handleDuplicate(this.props.item)}>Copy</a>
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
  { createLocation }
)(DuplicateButton);
