import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getLocations } from '../actions/locationActions';
import Navbar from './../parts/Navbar';
import DeleteButton from '../parts/DeleteButton';
import AddButton from '../parts/AddButton';
import { Link } from 'react-router-dom';
import TourAdder from '../parts/TourAdder';
import DuplicateButton from '../parts/DuplicateButton';

class Locations extends Component {

  handleTableRowClick = (id) =>{

  }

  componentDidMount() {
    this.props.getLocations();
  }

  tableView = (loc) => {
    return (
      <tr>
        <td className="truncate">
          <Link to={{
            pathname: `/location/${loc.id}`,
          }}>
            {loc.name}
          </Link>
        </td>
        <td>{loc.x}</td>
        <td>{loc.y}</td>
        <td>{loc.minTime}</td>
        <td>


            <DeleteButton id={loc.id} />
            <DuplicateButton item={loc} />
            <TourAdder item={loc} />

        </td>

      </tr>
    )
  }

  cardView(loc) {
    return (
      <div class="col s12 m4 l4">

          <div className="card">


            <Link to={{
              pathname: `/location/${loc.id}`,
            }}>
            <div className="card-image">
              <img src={loc.pic} width="240" height="240"/>
              <span class="card-title truncate">{loc.name}</span>
            </div>
              <div className="card-content">
                <p className="truncate">{loc.description}</p>
              </div>
            </Link>
              <div className="card-action">
                <div className="center-align">
                  <div className="row">
                    <DeleteButton id={loc.id} />
                    <DuplicateButton item={loc} />
                    <TourAdder item={loc} />
                  </div>

                </div>

              </div>

          </div>
      </div>
    )
  }

  renderLogic = () =>{
    if (this.props.ui.card) {
      if (this.props.loc.locations === null) {
        return null
      }
      else {
        return this.props.loc.locations.map(loc => this.cardView(loc))

      }
    }
    else {
      return (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Name</th>
              <th>X</th>
              <th>Y</th>
              <th>Time(s)</th>
              <th>Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.loc.locations === null ? null : this.props.loc.locations.map(loc => this.tableView(loc))}
          </tbody>
        </table>
      )
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="container">
          <h1 className="teal-text">Location Management</h1>
          <div className="divider"></div>
          <br/>
          <div className="row">
            {this.renderLogic()}
          </div>
          <AddButton />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  loc: state.loc,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { getLocations }
)(Locations);
