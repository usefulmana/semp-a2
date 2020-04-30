import React, { Component } from 'react'
import { connect } from "react-redux";
import { generateToken } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Link, Redirect } from "react-router-dom";
import CardTop from './../parts/CardTop';

class ForgotPW extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      type: "pw_recovery",
      msg: "",
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { email, type } = this.state;
    const user = {
      email, type
    };
    // Generate Token
    this.props.generateToken(user);
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for error
      if (error.id === "GENERATE_TOKEN_FAIL") {
        this.setState({ msg: 'Email ' + error.msg.slice(4, 14) + '!' });
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
          state: { mes: `Password recovery email sent! Returning to the login page...` }
        }} />
      )
    }
    return (
      <div className="valign-wrapper row login-box">
        <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
          <form onSubmit={this.onSubmit} id="login-form">
            <div className="card-content">
              <div className="card-title center-align">
                <CardTop title={'Password Recovery'} />
              </div>
              <div className="row">
                {this.state.msg ? <div className="red-text center-align "> {this.state.msg}</div> : null}
                <div className="input-field col s12">
                  <label htmlFor="email" className="active">Email Address</label>
                  <input type="email" name="email" id="email" onChange={this.onChange} required minLength="6" autoFocus />
                </div>
              </div>
            </div>
            <div className="card-action center-align">
              <Link to="/">
                <a type="reset" href="#" id="reset" className="btn-flat grey-text waves-effect" onClick={this.resetForm}>Back</a>
              </Link>
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
  { generateToken, clearErrors }
)(ForgotPW);
