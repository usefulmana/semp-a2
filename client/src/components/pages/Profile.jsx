import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateUser } from '../actions/authActions';
import ChangePWForm from '../forms/ChangePWForm';
import Navbar from './../parts/Navbar';

class Profile extends Component {
  constructor() {
    super()
    this.state = ({
      name: '',
      email: '',
      userName: '',
      file: "",
      msg: "",
      error: ""
    })

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      userName: this.props.auth.user.userName,
      file: "",
      msg: ""
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ msg: null });
    const { name, email } = this.state;
    this.props.updateUser({ name, email })
  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "UPDATE_FAIL") {
        this.setState({ err: error.msg });
      } else {
        this.setState({ err: "" });
      }
    }
  }

  onClick = (e) => {
    e.preventDefault()
    window.alert("This functionality has not yet been implemented. We are sorry for the inconvenience!")
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
          <h1 className="teal-text">Profile</h1>
          <div className="divider"></div>
          <br />
          <div className="row">
            <form className="col s12" onSubmit={this.onSubmit}>
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
                <div class="input-field col s6">
                  <input name="email" id="email" value={this.state.email} type="email" className="validate" required minLength="4" onChange={this.onChange} />
                  <label className="active" for="email">Email</label>
                </div>
                <div class="input-field col s3">
                </div>
              </div>

              {/* TODO Implement File Upload in Spring II */}
              <div className="row">
                <div class="input-field col s3">
                </div>
                <div class="file-field input-field col s6">
                  <div className="btn">
                    <span>File</span>
                    <input type="file" onClick={this.onClick} />
                  </div>
                  <div className="file-path-wrapper">
                    <input type="text" className="file-path validate" placeholder="Upload New Profile Picture" />
                  </div>
                </div>
                <div class="input-field col s3">
                </div>
              </div>

              <div className="center-align">
                <button class="btn waves-effect waves-light" type="submit" name="action">Submit
              <i class="material-icons right">send</i>
                </button>
              </div>
            </form>
            <div className="center-align">
              <ChangePWForm />
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
  { updateUser }
)(Profile);
