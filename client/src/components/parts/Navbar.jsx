import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { useTableView, useCardView } from './../actions/uiActions';

class Navbar extends Component {
  state = {
    grid: true
  }

  handleInputChange = (e) => {
    this.setState({
      grid: e.target.checked
    });

    if (this.state.grid) {
      this.props.useCardView()
    }
    else {
      this.props.useTableView()
    }
  }

  componentDidMount() {
    M.AutoInit()
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { alignment: "left", constrainWidth: false });
  }

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <nav>
          <div class="nav-wrapper teal">
            <Link to="/" className="brand-logo center tooltipped" data-position="bottom" data-tooltip="Home">
              <i className="large material-icons">museum</i>
            </Link>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li>
                <div className="switch">
                  <label className="white-text">
                    TABLE
                    <input type="checkbox" checked={this.props.ui.card} onChange={this.handleInputChange.bind(this)}/>
                    <span className="lever tooltipped" data-position="bottom" data-tooltip="View Modes (double-click)"></span>
                    CARD
                </label>
                </div>
              </li>
              <li><span>Welcome, <strong>{this.props.auth.user.name}</strong></span>!</li>
              <li><button className="btn-flat white-text dropdown-trigger" data-target="dashboard">Options</button></li>
              <li><button className="btn-flat white-text" onClick={this.handleLogout.bind(this)}>Logout</button></li>
            </ul>
          </div>
        </nav>

        <ul id="dashboard" className="dropdown-content">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/types">Types</Link></li>
          <li><Link to="/tours">Tours</Link></li>
          {this.props.auth.user.role === "ROLE_USER" ? null:
            <li><Link to="/users">Users</Link></li>
          }
        </ul>

        <ul class="sidenav" id="mobile-demo">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/types">Types</Link></li>
          <li><Link to="/tours">Tours</Link></li>
          {this.props.auth.user.role === "ROLE_USER" ? null :
            <li><Link to="/users">Users</Link></li>
          }
          <li className="divider"></li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  ui: state.ui
});

export default connect(mapStateToProps, { logout, useCardView, useTableView })(Navbar);
