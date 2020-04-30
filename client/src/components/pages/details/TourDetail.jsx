import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import Swal from 'sweetalert2';
import { deleteTourById} from './../../actions/tourActions';
import { Redirect } from 'react-router-dom';
import Navbar from './../../parts/Navbar';
import Footer from './../../parts/Footer';
import { getLocations } from './../../actions/locationActions';
import { getTypes } from './../../actions/typeActions';


class TourDetail extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      id: "",
      name: "",
      description: "",
      locations: [],
      types: [],
      thumbnail: '',
      minTime: '',
      loc: "",
      type: "",
      msg: ""
    })
    this.onChange = this.onChange.bind(this)
    // this.handleDeleteLocation = this.handleDeleteLocation.bind(this)
    // this.handleDeleteTour = this.handleDeleteTour.bind(this)
  }


  componentDidMount() {
    var box = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(box);
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems);
    M.AutoInit()
    this.setState({
      id: this.props.location.state.item.id,
      name: this.props.location.state.item.name,
      description: this.props.location.state.item.description,
      locations: this.props.location.state.item.locations,
      types: this.props.location.state.item.types,
      thumbnail: this.props.location.state.item.thumbnail,
      minTime: this.props.location.state.item.minTime
    })
    this.props.getLocations()
    this.props.getTypes()
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDeleteLocation(loc){
    const arr = this.state.types
    this.state.locations.filter(i => { return i.id !== loc.id })
    this.setState({
      locations: arr,
      minTime: this.state.minTime - loc.minTime
    })

  }

  handleDeleteType(id){
    const arr = this.state.types
    this.state.types.filter(i => { return i.id !== id })
    this.setState({
      types: arr
    })
  }

  submitLoc(id){
    const l = this.props.loc.locations.filter(loc => { return loc.id === id })[0]
    const arr = this.state.locations
    arr.push(l)
    this.setState({
      locations: arr
    })
    Swal.fire({
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500
    })
  }

  submitType(id) {
    const i = this.props.type.types.filter(loc => { return loc.id === id })[0]
    const arr = this.state.types
    arr.push(i)
    this.setState({
      types: arr
    })
    Swal.fire({
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500
    })
  }

  handleAddLocation(){
    return (
      <Fragment>
        <button className=" btn-small chip tooltipped modal-trigger"
          href="#tour-loc" data-tooltip="Add Locations" data-position="left">
          <i className="material-icons small">add</i>
          </button>

        <div id="tour-loc" class="modal">
          <div className="modal-content" >
            <h4 className="center-align">Locations</h4>
            <hr/>
            <div>
              {this.props.loc.locations === null ? null : this.props.loc.locations.map(l => (
                <p>
                  <label>
                    <input name="loc" type="radio" onChange={this.onChange} value={l.id}/>
                    <span>{l.name}</span>
                  </label>
                </p>
              ))}
            </div>
            <div className="center-align">
              <button className="waves-effect waves-light btn" onClick={this.submitLoc.bind(this, this.state.loc)}><i class="material-icons right">send</i>Submit</button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  handleAddType(){
    return(
      <Fragment>
        <button className=" btn-small chip tooltipped modal-trigger"
          href="#tour-type" data-tooltip="Add Types" data-position="left">
          <i className="material-icons small">add</i>
        </button>

        <div id="tour-type" class="modal">
          <div className="modal-content" >
            <h4 className="center-align">Types</h4>
            <hr />
            <div>
              {this.props.type.types === null ? null : this.props.type.types.map(l => (
                <p>
                  <label>
                    <input name="type" type="radio" onChange={this.onChange} value={l.id}/>
                    <span>{l.name}</span>
                  </label>
                </p>
              ))}
            </div>
            <div className="center-align">
              <button className="waves-effect waves-light btn" onClick={this.submitType.bind(this, this.state.type)}type="submit"><i class="material-icons right">send</i>Submit</button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }


  handleEdit(e) {}

  handleDelete(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.props.deleteTourById(id)
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          showConfirmButton: false,
          timer: 1500
        }).then(<Redirect to="/tours"></Redirect>)
      }
    })
  }


  renderLogic = (item) => {
    return (
      <Fragment>
        <div className="slider">
          <ul className="slides">
            <li><img src="https://i.picsum.photos/id/104/1920/1080.jpg" className="materialboxed" /></li>
          </ul>
        </div>
        <div>
          <div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="name" id="name" type="text" className="validate" value={item.name} required onChange={this.onChange}/>
                <label className="active" for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <textarea name="description" className="materialize-textarea" value={item.description} onChange={this.onChange}></textarea>
                <label className="active" for="description">Description</label>
              </div>
            </div>

            <div className="row">
              <div class="input-field col locs s3">
              </div>
              <div class="input-field col s6 ">
                <br />
                {item.locations.map(loc => (
                  <div className="left-align">
                    <div className="chip force-inline">
                      {loc.name}
                      <a onClick={() => this.handleDeleteLocation(loc)}><i className="close material-icons" >close</i></a>
                    </div>
                  </div>
                ))}
                <label htmlFor="locs" className="active">Locations</label>
                <br/>
                <div className="left-align">
                  {this.handleAddLocation()}
                </div>
              </div>
            </div>

            <div className="row">
              <div class="input-field col types s3">
              </div>
              <div class="input-field col s6 ">
                {item.types.map(t => (
                  <div className="left-align">
                    <br />
                    <div className="chip">
                      {t.name}
                      <a onClick={() => this.handleDeleteType(t.id)}><i className="close material-icons" >close</i></a>
                    </div>
                  </div>
                ))}
                <br/>
                <div className="left-align">
                  {this.handleAddType()}
                </div>
                <label htmlFor="types" className="active">Types</label>
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                <button className="waves-effect waves-light btn" type="submit"><i class="material-icons right">send</i>Submit</button>
              </div>
            </div>

          </div>

          <button className="waves-effect waves-light btn-flat red-text" onClick={this.handleDelete.bind(this, item.id)}>Delete</button>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="teal-text">Tour Details</h1>
          <div className="divider"></div>
          <br />
          <div className="center-align">
            {this.renderLogic(this.state)}
            <br />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  tour: state.tour,
  type: state.type,
  loc: state.loc
});

export default connect(
  mapStateToProps,
  { deleteTourById, getLocations, getTypes }
)(TourDetail);
