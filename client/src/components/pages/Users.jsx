import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import Navbar from './../parts/Navbar';
import { getUsers, getAllLoggedInUsers } from './../actions/adminActions';
import AddButton from '../parts/AddButton'
import { Link } from 'react-router-dom';
import BanUser from '../parts/BanUser';

class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getAllLoggedInUsers()
  }

  tableView(loc) {

    return (
      <tr>
        <td>
          <Link to={{
            pathname: `/user/${loc.id}`
          }}>{loc.userName}</Link>
        </td>
        <td>{loc.name}</td>
        <td>{loc.email}</td>
        <td>{loc.isActive ? "Active" : "Banned"}</td>
        <td>{loc.role}</td>
        <td>{loc.createdAt.slice(0, 10)}</td>
        <td>
          <BanUser item={loc} />
        </td>
      </tr>
    )
  }

  cardView(loc) {
    return (
      <div class="col s12 m6 l6">
        <div class="card horizontal hoverable">
          <div class="card-stacked">
            <Link to={{
              pathname: `/user/${loc.id}`
            }}>
              <div class="card-content">
                <div className="card-title">{loc.name}</div>
                <p><strong>Username :</strong> {loc.userName}</p>
                <p><strong>Email :</strong> {loc.email}</p>
                <p><strong>Status :</strong> {loc.isActive ? "Active" : "Banned"}</p>
                <p><strong>Role :</strong> {loc.role}</p>
              </div>
            </Link>
            <div class="card-action right-align ">
              <BanUser item={loc} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLogic() {
    if (this.props.ui.card) {
      if (this.props.admin.users === null) {
        return (<h4 className="center-align">No items available</h4>)
      }
      else {
        return this.props.admin.users.filter(p => { return p.id !== this.props.auth.user.id }).map(loc => this.cardView(loc))
      }
    }
    else {
      return (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.admin.users !== null ? this.props.admin.users.filter(p => { return p.id !== this.props.auth.user.id }).map(loc => this.tableView(loc)) : null}
          </tbody>
        </table>
      )
    }
  }

  displayAccessLog(users){
    return(
      <Fragment>
        <button className=" btn-small modal-trigger" href="#modal-daily">Daily Access Log</button>
        <div id="modal-daily" className="modal">

          <h2 className="center-align">Daily Access Log</h2>
          <div className="divider"></div>
          <br />
          <div>
            <table className="highlight centered">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Last Logged In</th>
                </tr>
              </thead>
              <tbody>
                {this.props.admin.loggedInUsers === null ? null : this.props.admin.loggedInUsers.map(u => (
                  <Fragment>
                    <tr>
                      <td>{u.userEmail}</td>
                      <td>{u.userName}</td>
                      <td>{u.lastLoggedIn}</td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="teal-text">User Management</h1>
          <div className="divider"></div>
          <br />
          <div className="center-align">
            {this.displayAccessLog()}
          </div>
          <br/>
          <div className="row">
            {this.renderLogic()}
          </div>
          <AddButton/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  admin: state.admin,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { getUsers, getAllLoggedInUsers }
)(Users);
