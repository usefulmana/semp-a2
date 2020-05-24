import React, { Component } from 'react'
import {connect} from 'react-redux';
import Navbar from '../../parts/Navbar';
import ChangePWForm from '../../forms/ChangePWForm';
import {updateUser} from '../../actions/authActions';
import BanUser from '../../parts/BanUser';
import { getUserById, adminUpdateUser } from './../../actions/adminActions';

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
    setTimeout(() => {
      if (this.props.admin.user !== null) {
        this.setState({
          name: this.props.admin.user.name,
          email: this.props.admin.user.email,
          userName: this.props.admin.user.userName,
          role: this.props.admin.user.role,
          isActive: this.props.admin.user.isActive,
        })
      }
    }, 1000)

  }

  handleUpdateUser = (e) => {
    e.preventDefault()
    const {name, email, role} = this.state;

    this.props.adminUpdateUser({ name, email, role })
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
            {this.props.admin.user === null ? null :
            <form className="col s12" onSubmit={this.handleUpdateUser.bind(this)}>
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
                  <input name="name" id="name" value={this.state.name} type="text" className="validate" required minLength="4" onChange={this.onChange} />
                  <label className="active" for="name">Name</label>
                </div>
                <div class="input-field col s2">
                    <input id="userName" disabled value={this.state.userName} type="text" />
                  <label className="active" for="userName">Username</label>
                </div>
              </div>


              <div className="row">
                <div class="input-field col s3">
                </div>
                <div class="input-field col s4">
                    <input name="email" id="email" value={this.state.email} type="email" className="validate" required minLength="4" onChange={this.onChange} />
                  <label className="active" for="email">Email</label>
                </div>
                <div class="input-field col s2">
                    <input disabled id="status" value={this.state.isActive? "Active": "Banned"} type="text" />
                  <label className="active" for="status">Status</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s3">
                </div>
                <div className="input-field col s6">
                    <select name="role" id='role' className="browser-default" onChange={this.onChange} value={this.state.role}>
                    <option value="" disabled selected>Choose A Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label htmlFor="role" className="active">Role</label>
                </div>
              </div>
                {this.props.auth.user.role === "ROLE_USER" ? null :
                  <div className="row">
                    <div className="center-align">
                      <button type="submit" className="btn waves-effect waves-light"><i className="material-icons right">send</i>Submit</button>
                    </div>
                  </div>
                }

            </form>}
            {this.props.auth.user.role === "ROLE_USER"? null :
              <div className="center-align">
                <BanUser item={this.props.admin.user} />
                <br />
                <ChangePWForm />
              </div>

            }
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  admin: state.admin,
  error: state.error
});
export default connect(
  mapStateToProps,
  { updateUser, getUserById, adminUpdateUser }
)(UserDetail);
