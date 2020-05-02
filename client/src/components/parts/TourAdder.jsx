import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { addRemoveLocToTour, addRemoveTypeToTour, getTours } from '../actions/tourActions';

class TourAdder extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      tour_id: '',
      msg: ''
    })

    this.onChange = this.onChange.bind(this)
    this.handleAddLocationToTour = this.handleAddLocationToTour.bind(this)
    this.handleAddTypeToTour = this.handleAddTypeToTour.bind(this)
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  componentDidMount() {
    this.props.getTours()
  }

  handleAddLocationToTour = (e) => {
    e.preventDefault()
    this.props.addRemoveLocToTour(this.state.tour_id, this.props.item.id, 'add')
  }

  handleAddTypeToTour = (e) => {
    e.preventDefault()

    this.props.addRemoveTypeToTour(this.state.tour_id, this.props.item.id, 'add')
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "ADD_LOC_TO_TOUR_FAIL" || error.id === "ADD_TYPE_TO_TOUR_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  displayTours = () => {
    return (
      <Fragment>
        <h4 className="center-align">Choose A Tour</h4>
        <div className="center-align">
          {this.props.tour.tours === null ? null : this.props.tour.tours.map(t => (
            <p>
              <label>
                <input value={t.id} className="with-gap" name="tour_id" type="radio" onChange={this.onChange} />
                <span>{t.name}</span>
              </label>
            </p>
          ))}
        </div>
        <div className="row">
          <div className="center-align">
            <button className="waves-effect waves-light btn" type="submit"><i class="material-icons right">send</i>Submit</button>
          </div>
        </div>
      </Fragment>
    )
  }

  renderLogic (item){
    const url = window.location.href;

    if (url.includes('locations')){
      return (
        <Fragment>
          <button className="btn-flat btn-small tooltipped modal-trigger" href="#modal-addloc" data-position="left" data-tooltip="Add to A Tour"><i className="material-icons inline-icon green-text hvr-float">add</i></button>
          <div id="modal-addloc" className="modal">
            <form class="modal-content" onSubmit={this.handleAddLocationToTour}>
              {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
              {this.displayTours()}
            </form>
          </div>
        </Fragment>
      )
    }
    else if (url.includes('location')){
      return (
        <Fragment>
          <button className="btn action-btn tooltipped modal-trigger" href="#modal-addloc" data-tooltip="Add to A Tour">Find Tours<i className="material-icons right white-text hvr-float">add</i></button>
          <div id="modal-addloc" className="modal">
            <form class="modal-content" onSubmit={this.handleAddLocationToTour}>
              {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
              {this.displayTours()}
            </form>
          </div>
        </Fragment>
      )
    }

    if (url.includes('types')) {
      return (
        <Fragment>
          <button className="btn-flat btn-small tooltipped modal-trigger" href="#modal-addloc" data-tooltip="Add to A Tour"><i className="material-icons inline-icon green-text hvr-float">add</i></button>
          <div id="modal-addloc" className="modal">
            <form class="modal-content" onSubmit={this.handleAddTypeToTour}>
              {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
              {this.displayTours()}
            </form>
          </div>
        </Fragment>
      )
    }
    else if (url.includes('type')){
      return (
        <Fragment>
          <button className="btn action-btn tooltipped modal-trigger" href="#modal-addloc" data-tooltip="Add to A Tour">Find Tours<i className="material-icons right white-text hvr-float">add</i></button>
          <div id="modal-addloc" className="modal">
            <form class="modal-content" onSubmit={this.handleAddTypeToTour}>
              {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
              {this.displayTours()}
            </form>
          </div>
        </Fragment>
      )
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.auth.user.role !== 'ROLE_ADMIN' ? null : this.renderLogic(this.props.item)}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  tour: state.tour
});

export default connect(
  mapStateToProps,
  { addRemoveLocToTour, addRemoveTypeToTour, getTours }
)(TourAdder);
