import React, { Component } from 'react'
import { connect } from "react-redux";
import { recoverPassword } from '../actions/authActions';
import { Redirect } from "react-router-dom";
import CardTop from '../parts/CardTop';
import PWRules from '../parts/PWRules';

class PasswordRecovery extends Component {
  constructor() {
    super()
    this.state = {
      password: "",
      retype: "",
      msg: "",
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ msg: null });
    const { password } = this.state;
    const token = this.props.match.params.token;
    const user = {
      token, password
    };
    // Generate Token
    if (this.state.password !== this.state.retype) {
      this.setState({
        msg: "Retyped password does not match!"
      })
    }
    else {
      this.props.recoverPassword(user);
    }
  };

  resetForm = () => {
    this.setState({
      "msg": ""
    })
    document.getElementById("pw-recover").value="";
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for error
      if (error.id === "PASSWORD_RECOVERY_FAILED") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {

    if (this.props.message) {
      return (
        <Redirect to={{
          pathname: '/success',
          state: { mes: `Password changed! Returning to the login page...` }
        }} />
      )
    }
    return (
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={this.onSubmit} id="pw-recover">
            <div className="card-content">
              <CardTop title={'Password Recovery'} />
              <div className="row">
                {this.state.msg ? <div className="animated shake red-text center-align "> {this.state.msg}</div> : null}
                <div className="input-field col s12">
                  <label htmlFor="password">New Password</label>
                  <input type="password" name="password" id="password" onChange={this.onChange} required minLength="6" maxLength="16" autoFocus />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="retype">Retype Password</label>
                  <input type="password" className="validate" name="retype" id="retype" onChange={this.onChange} required maxLength="16" minLength="6" />
                </div>
                <PWRules />
              </div>
            </div>
            <div className="card-action center-align">
              <a type="reset" href="#" id="reset" className="btn-flat grey-text waves-effect" onClick={this.resetForm}>Reset</a>
              <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error,
  message: state.auth.message
});

export default connect(
  mapStateToProps,
  { recoverPassword }
)(PasswordRecovery);
