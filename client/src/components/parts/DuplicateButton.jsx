import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createLocation } from './../actions/locationActions';
import Swal from 'sweetalert2';


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
        loc.name = loc.name + "_Copy"
        this.props.createLocation(loc);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }

  render() {
    return (
      <div>
        {this.props.auth.user.role === "ROLE_ADMIN" && window.location.href.includes("locations") ?
          <button className="action-btn btn-flat btn-small center-align tooltipped" data-position="left" data-tooltip="Duplicate" onClick={() => this.handleDuplicate(this.props.item)}><i className="material-icons inline-icon blue-text">file_copy</i></button>
          : null}
      </div>
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
