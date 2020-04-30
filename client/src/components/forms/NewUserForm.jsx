import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { registerAUser } from '../actions/adminActions';

class NewUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      name: '',
      email: '',
      password: '',
      retype: '',
      role: '',
      msg: ''
    })
    this.onChange = this.onChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleAddUser = this.handleAddUser.bind(this)
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetForm = () => {
    this.setState({
      msg: ""
    })
    document.getElementById("user-form").value ="";
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleAddUser = () => {
    const { name, email, password, retype, role } = this.state;
    if (password === retype) {
      const user = { name, email, password, role }
      this.props.registerAUser(user)
    }
    else {
      this.setState({
        msg: "Passwords do not match!"
      })
    }

  }

  render() {
    return (
      <Fragment>
        <button class="btn-floating btn-large red tooltipped modal-trigger"
          href="#modal-user" data-tooltip="Create"
          data-position="left">
          <i class="material-icons">add</i></button>
        <div id="modal-user" class="modal">
          <form class="modal-content" id="user-form" onSubmit={this.handleAddUser}>
            <h4 className="center-align">Create A User</h4>
            {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="name" id="name" type="text" className="validate" required autoFocus minLength="4" onChange={this.onChange} />
                <label className="active" for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="email" id="email" type="email" className="validate" required onChange={this.onChange} />
                <label className="active" for="name">Email</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s3">
                <input name="password" id="password" type="password" className="validate" required minLength="6" maxLength="16" onChange={this.onChange} />
                <label className="active" for="password">Password</label>
              </div>
              <div class="input-field col s3">
                <input name="retype" id="retype" type="password" className="validate" required minLength="6" maxLength="16" onChange={this.onChange} />
                <label className="active" for="retype">Retype Password</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s3">
              </div>
              <div className="input-field col s6">
                <select name="role" id='role' className="browser-default" onChange={this.onChange}>
                  <option value="" disabled selected>Choose A Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                <button className="waves-effect waves-light btn-flat grey-text" onClick={this.resetForm}>Reset</button>
                <button className="waves-effect waves-light btn"><i class="material-icons right">send</i>Submit</button>
              </div>
            </div>
          </form>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { registerAUser }
)(NewUserForm);
