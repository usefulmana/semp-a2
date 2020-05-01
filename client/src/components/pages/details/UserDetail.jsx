import React, { Component } from 'react'
import {connect} from 'react-redux';
import Navbar from '../../parts/Navbar';
import ChangePWForm from '../../forms/ChangePWForm';
import {updateUser, getUserById} from '../../actions/authActions'
import BanUser from '../../parts/BanUser';

class UserDetail extends Component {
  constructor() {
    super()
    this.state = ({
      name: '',
      email: '',
      userName: '',
      role: '',
      isActive:'',
      msg: "",
      error: ""
    })

    this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onClick = this.onClick.bind(this)
  }


  componentDidMount() {
    this.props.getUserById(this.props.match.params.id)
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h1 className="teal-text">User Info</h1>
          <div className="divider"></div>
          <br />
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div class="user-view center">
                  <a href="#user" type="file"><img className="circle" src="https://materializecss.com/images/yuna.jpg" alt="user profile pic" /></a>
                </div>
              </div>

              {this.state.msg ?
                <div className="animated teal-text fadeIn center-align "> {this.state.msg}</div>
                : null}
              <div class="row">
                <div class="input-field col s3">
                </div>
                <div class="input-field col s4">
                  <input name="name" id="name" value={this.props.auth.user.name} type="text" className="validate" required minLength="4" onChange={this.onChange} />
                  <label className="active" for="name">Name</label>
                </div>
                <div class="input-field col s2">
                  <input id="userName" disabled value={this.props.auth.user.userName} type="text" />
                  <label className="active" for="userName">Username</label>
                </div>
              </div>


              <div className="row">
                <div class="input-field col s3">
                </div>
                <div class="input-field col s4">
                  <input name="email" id="email" value={this.props.auth.user.email} type="email" className="validate" required minLength="4" onChange={this.onChange} />
                  <label className="active" for="email">Email</label>
                </div>
                <div class="input-field col s2">
                  <input disabled id="status" value={this.props.auth.user.isActive? "Active": "Banned"} type="text" />
                  <label className="active" for="status">Status</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s3">
                </div>
                <div className="input-field col s6">
                  <select name="role" id='role' className="browser-default" onChange={this.onChange} value={this.props.auth.user.role}>
                    <option value="" disabled selected>Choose A Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label htmlFor="role" className="active">Role</label>
                </div>
              </div>
            </form>
            <div className="center-align">
              <BanUser item={this.props.auth.user} />
              <br/>
              <ChangePWForm/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(
  mapStateToProps,
  { updateUser, getUserById }
)(UserDetail);
