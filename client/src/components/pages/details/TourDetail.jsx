import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import Swal from 'sweetalert2';
import { deleteTourById, updateTour, getTourById } from './../../actions/tourActions';
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
    this.props.getLocations()
    this.props.getTypes()
    this.props.getTourById(this.props.match.params.id)

    setTimeout(() => {
      if (this.props.tour.tour !== null) {
        this.setState({
          id: this.props.tour.tour.id,
          name: this.props.tour.tour.name,
          description: this.props.tour.tour.description,
          locations: this.props.tour.tour.locations,
          types: this.props.tour.tour.types,
          thumbnail: this.props.tour.tour.thumbnail,
          minTime: this.props.tour.tour.minTime
        })
      }}, 1000)

  }
  componentDidUpdate(prevProps) {
    const { error } = this.props;
    // const { tour } = this.props.tour.tour;

    // if (tour !== undefined){
    //   if (tour.id !== prevProps.id) {
    //     // Check for register error

    //   }
    // }


    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "UPDATE_TOUR_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDeleteLocation(loc){
    const arr = this.state.locations
    const index = arr.findIndex(item => item.id === loc.id)
    arr.splice(index, 1)
    this.setState({
      locations: arr,
      minTime: this.state.minTime - loc.minTime
    })

  }

  handleDeleteType(id){
    // e.preventDefault()
    const arr = this.state.types.filter(i => { return i.id !== id })
    this.setState({
      types: arr
    })
  }

  submitLoc(id){
    const l = this.props.loc.locations.filter(loc => { return loc.id === id })[0]
    let location = this.props.loc.locations.find(e=> e.id === id)
    const arr = this.state.locations
    arr.push(l)
    this.setState({
      locations: arr,
      minTime: this.state.minTime + location.minTime
    })
    Swal.fire({
      icon: 'success',
      title: 'Success',
      showConfirmButton: false,
      timer: 1500
    })
  }

  submitType(type) {
    const i = this.props.type.types.filter(loc => { return loc.id === type })[0]
    const arr = this.state.types
    if (arr.find(elem => elem.id === type)){

      Swal.fire({
        icon: 'error',
        title: 'Duplicate Entry',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
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


  handleEdit(e) {
    e.preventDefault()
    const {id, name, description, locations, types, thumbnail, minTime} = this.state;
    this.props.updateTour({ id, name, description, locations, types, thumbnail, minTime })
  }

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

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s3">
                <input name="name" id="name" type="text" disabled className="validate" value={item.minTime} required onChange={this.onChange} />
                <label className="active" for="name">Time(s)</label>
              </div>
            </div>

            <div className="row">
              <div class="input-field col locs s3">
              </div>
              <div class="input-field col s6 ">
                <br />
                <div className="left-align">
                  {item.locations.map(loc => (
                      <button className="btn-flat btn-small" onClick={this.handleDeleteLocation.bind(this, loc)}>
                        {loc.name}
                        <i className="right red-text material-icons">close</i>
                      </button>

                  ))}
                </div>
                <label htmlFor="locs" className="active">Locations</label>
                <br />
                <div className="left-align">
                  {this.handleAddLocation()}
                </div>
              </div>
            </div>

            <div className="row">
              <div class="input-field col types s3">
              </div>
              <div class="input-field col s6 ">
                <br />
                <div className="left-align">

                    {item.types.map(t => (

                        <button className="btn-flat btn-small" onClick={this.handleDeleteType.bind(this, t.id)}>
                          {t.name}
                          <i className="right material-icons red-text"  >close</i>
                        </button>

                    ))}

                </div>
                <br/>
                <div className="left-align">
                  {this.handleAddType()}
                </div>
                <label htmlFor="types" className="active">Types</label>
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                <button className="waves-effect waves-light btn" type="submit" onClick={this.handleEdit.bind(this)}><i class="material-icons right">send</i>Submit</button>
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
  loc: state.loc,
  tour: state.tour
});

export default connect(
  mapStateToProps,
  { deleteTourById, getLocations, getTypes, updateTour, getTourById }
)(TourDetail);
