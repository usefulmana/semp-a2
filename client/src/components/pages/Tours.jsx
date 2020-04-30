import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTours } from './../actions/tourActions';
import Navbar from './../parts/Navbar';
import AddButton from '../parts/AddButton';
import DeleteButton from '../parts/DeleteButton';
import { Link } from 'react-router-dom';

class Tours extends Component {

  componentDidMount() {
    // var elems = document.querySelectorAll('.tooltipped')
    // M.Tooltip.init(elems, { position: "top" });
    this.props.getTours()
  }

  gridView(loc) {
    return (
      <tr>
        <td>
          <Link to={{
            pathname: `/tour/${loc.id}`,
            state: {
              item: loc
            }
          }}>
            {loc.name}
          </Link>
        </td>
        <td className="truncate">{loc.description}</td>
        <td>{loc.minTime}</td>
        <td>
          <DeleteButton id={loc.id} />
        </td>
      </tr>
    )
  }

  renderLogic() {
    if (this.props.ui.card) {
      if (this.props.tour.tours === null) {
        return (<h4 className="center-align">No items available</h4>)
      }
      else {
        return this.props.tour.tours.map(loc => this.cardView(loc))
      }
    }
    else {
      return (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Time(s)</th>
              <th>Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tour.tours.map(loc => this.gridView(loc))}
          </tbody>
        </table>
      )
    }
  }


  cardView(loc) {
    return (
      <div class="col s12 m6 l6">
        <div class="card horizontal hoverable">
          <div class="card-image">
            <img src="https://lorempixel.com/100/190/nature/6" />
          </div>
          <div class="card-stacked">
            <Link to={{
              pathname: `/tour/${loc.id}`,
              state: {
                item: loc
              }
            }}>
              <div class="card-content">
                <div className="card-title">{loc.name}</div>
                <p className="truncate">{loc.description}</p>
              </div>
            </Link>

            <div class="card-action">
              <div className="right-align">
                <DeleteButton id={loc.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div >
        <Navbar />
        <div className="container">
          <h1 className="teal-text">Tour Management</h1>
          <div className="divider"></div>
          <br />
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
  tour: state.tour,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { getTours }
)(Tours);
