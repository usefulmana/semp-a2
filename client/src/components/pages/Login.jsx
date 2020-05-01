import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import CardTop from './../parts/CardTop';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      msg: ""
    }
    this.onChange = this.onChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleLogin = e => {
    e.preventDefault();
    this.setState({ msg: null });
    const { username, password } = this.state;
    const user = {
      username,
      password
    };
    // Attempt to login
    this.props.login(user);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  resetForm = () => {
    this.setState({
      msg: ""
    })
    document.getElementById("login-form").value = "";
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }


  render() {
    if (this.props.isAuthenticated) {
      return (
        <Redirect to="/" />
      )
    }
    return (
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={this.handleLogin} id="login-form">
            <div className="card-content">
              <CardTop title={'Enter Credentials'} />
              <div className="row">
                {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
                <div className="input-field col s12">
                  <label htmlFor="username" className="active">Username</label>
                  <input type="text" name="username" id="username" onChange={this.onChange} required minLength="6" autoFocus />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="password" className="active">Password</label>
                  <input type="password" className="validate" name="password" id="password" onChange={this.onChange} required minLength="8" />
                </div>
                <div className="center-align">
                  <Link to="/fpw">
                    <button className="btn-flat blue-text waves-effect forgot-pw">
                      FORGOT PASSWORD?
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-action center-align">
              <button type="reset" href="#" id="reset" className="btn-flat grey-text waves-effect" onClick={this.resetForm}>Reset</button>
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);
