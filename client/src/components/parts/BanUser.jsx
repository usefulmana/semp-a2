import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { banAUser, unbanAUser } from '../actions/adminActions'
import Swal from 'sweetalert2';

class BanUser extends Component {

  renderLogic(){
    if (this.props.item !== null){
      if (this.props.item.isActive) {
        return (
          <Fragment>
            <button className="btn" onClick={this.handleBan.bind(this, this.props.item.userName)}>Ban</button>
          </Fragment>
        )
      }
      else if (!this.props.item.isActive) {
        return (
          <Fragment>
            <button className="btn" onClick={this.handleUnBan.bind(this, this.props.item.userName)}>UnBan</button>
          </Fragment>
        )
      }
    }

  }

  handleBan = (username) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.props.banAUser(username)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(window.location.reload.bind(window.location), 2000);
      }
    })

  }

  handleUnBan = (username) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.props.unbanAUser(username)
        Swal.fire({
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(window.location.reload.bind(window.location), 2000);
      }
    })
  }

  render() {
    return (
      <div>
        {this.props.auth.user.role !== 'ROLE_ADMIN' ? null :this.renderLogic()}
      </div>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth
});
export default connect(
  mapStateToProps,
  {banAUser, unbanAUser}
)(BanUser);
