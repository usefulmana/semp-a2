import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { changePassword } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import PWRules from './../parts/PWRules';

class ChangePWForm extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      oldpassword: '',
      newpassword: '',
      retype: '',
      err: ''
    })
    this.onChange = this.onChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetForm = () => {
    this.setState({
      err: ""
    })
    this.props.clearErrors()
    document.getElementById("pw-change").reset();
  }

  handlePWChange = (e) => {
    e.preventDefault()

    const oldpassword = this.state.oldpassword.trim()
    const newpassword = this.state.newpassword.trim()

    const payload = { oldpassword, newpassword }

    if (this.state.newpassword !== this.state.retype) {
      this.setState({
        err: "Retyped password does not match!"
      })
    }
    else {
      this.props.changePassword(payload);
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "PASSWORD_CHANGED_FAIL") {
        this.setState({ err: error.msg });
      } else {
        this.setState({ err: "Success!" });
      }
    }
  }

  render() {
    return (
      <Fragment>
        <button className="btn-flat grey-text modal-trigger" href="#modal1">Change Password</button>
        <div id="modal1" class="modal">
          <form className="modal-content" id="pw-change" onSubmit={this.handlePWChange}>
            <h4 className="center-align">Change Password</h4>
            {this.state.err ? <div className="animated red-text shake center-align "> {this.state.err}</div> : null}
            <div className="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="oldpassword" id="oldpassword" onChange={this.onChange} type="password" className="validate" required minLength="6" maxLength="16" autoFocus />
                <label for="oldpassword">Current Password</label>
              </div>
            </div>
            <div className="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="newpassword" id="newpassword" onChange={this.onChange} type="password" className="validate" required minLength="6" maxLength="16" />
                <label for="newpassword">New Password</label>
              </div>
            </div>
            <div className="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="retype" id="retype" type="password" onChange={this.onChange} className="validate" required minLength="6" />
                <label for="retype">Retype New Password</label>
              </div>
            </div>
            <div className="row">
              <PWRules/>
            </div>

            <div className="row">
              <div className="center-align">
                <button className="waves-effect waves-light btn-flat grey-text" onClick={this.resetForm}>Reset</button>
                <button className="waves-effect waves-light btn" type="submit"><i class="material-icons right">send</i>Submit</button>
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
  ui: state.ui,
  error: state.error
});


export default connect(
  mapStateToProps,
  { changePassword, clearErrors }
)(ChangePWForm);
