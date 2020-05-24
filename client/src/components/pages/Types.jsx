import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTypes } from './../actions/typeActions';
import Navbar from './../parts/Navbar';
import AddButton from '../parts/AddButton';
import DeleteButton from '../parts/DeleteButton';
import TourAdder from '../parts/TourAdder';
import { Link } from 'react-router-dom';

class Types extends Component {

  componentDidMount() {
    this.props.getTypes()
  }

  renderLogic() {
    if (this.props.ui.card) {
      if (this.props.type.types === null) {
        return null
      }
      else {
        return this.props.type.types.map(t => this.cardView(t))
      }
    }
    else {
      return (
        <table className="highlight centered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action(s)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.type.types !== null ? this.props.type.types.map(t => this.tableView(t)) : null}
          </tbody>
        </table>
      )
    }
  }

  tableView(t) {
    return (
      <tr>
        <td>
          <Link to={{
            pathname: `/type/${t.id}`
          }}>{t.name}</Link>
        </td>
        <td>

            <DeleteButton id={t.id} />
            <TourAdder item={t} />

        </td>
      </tr>
    )
  }

  cardView(t) {
    return (
      <div class="col s12 m3 l3">
        <div class="card horizontal hoverable">
          <div class="card-stacked">
            <Link to={{
              pathname: `/type/${t.id}`
            }}>
              <div class="card-content">
                <div className="card-title center-align">{t.name}</div>
                <br />
              </div>
            </Link>
            <div class="card-action">
              <div className="center-align">
                <DeleteButton id={t.id} />
                <TourAdder item={t} />
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
          <h1 className="teal-text">Type Management</h1>
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
  type: state.type,
  ui: state.ui
});

export default connect(
  mapStateToProps,
  { getTypes }
)(Types);
