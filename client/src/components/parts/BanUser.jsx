import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { banAUser, unbanAUser } from '../actions/adminActions'
import Swal from 'sweetalert2';

class BanUser extends Component {

  renderLogic(){
    if (this.props.item.isActive){
      return (
        <Fragment>
          <button className="btn" onClick={this.handleBan.bind(this, this.props.item.userName)}>Ban</button>
        </Fragment>
      )
    }
    else if (!this.props.item.isActive){
      return (
        <Fragment>
          <button className="btn" onClick={this.handleUnBan.bind(this, this.props.item.userName)}>UnBan</button>
        </Fragment>
      )
    }
  }

  handleBan = (username) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.props.banAUser(username)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }

  handleUnBan = (username) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.props.unbanAUser(username)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  render() {
    return (
      <div>
        {this.renderLogic()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
});
export default connect(
  mapStateToProps,
  {banAUser, unbanAUser}
)(BanUser);
