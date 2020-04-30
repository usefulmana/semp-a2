import React, { Component, Fragment } from 'react'
import Navbar from './../../parts/Navbar';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import  Swal  from 'sweetalert2';
import { deleteLocationById } from '../../actions/locationActions';
import { Redirect } from 'react-router-dom';
import Footer from '../../parts/Footer';
import TourAdder from '../../parts/TourAdder';

class LocationDetail extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      id: "",
      name: "",
      x: "",
      y: "",
      minTime: "",
      description: "",
      file: "",
      msg: ""
    })
    this.handleEdit = this.handleEdit.bind(this)
    this.onChange = this.onChange.bind(this)

  }

  handleEdit(e) {
    e.preventDefault()
    Swal.fire({
      icon: 'error',
      title: 'This functionality has not yet been implemented!'
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDelete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.props.deleteLocationById(id)
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          showConfirmButton: false,
          timer: 1500
        }).then(<Redirect to="/locations"></Redirect>)
      }
    })
  }


  componentDidMount() {
    var box = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(box);
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems);

  }

  renderLogic = (item) => {
    return (
      <Fragment>
        <div className="slider">
          <ul className="slides">
            <li><img src="https://i.picsum.photos/id/104/1920/1080.jpg" className="materialboxed"/></li>
          </ul>
        </div>
        <div>
          <form onSubmit={this.handleEdit}>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input disabled name="name" id="name" type="text" className="validate" value={item.name} required />
                <label className="active" for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s1">
                <input disabled name="x" id="x" type="number" className="validate" value={item.x} required />
                <label className="active" for="name">X</label>
              </div>
              <div class="input-field col s1">
                <input disabled name="y" id="y" type="number" className="validate" value={item.y} required />
                <label className="active" for="name">Y</label>
              </div>
              <div class="input-field col s4">
                <input disabled name="time" id="time" type="number" className="validate" value={item.minTime} required />
                <label className="active" for="time">Minimum Time in Seconds</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <textarea disabled id="description" className="materialize-textarea" value={item.description}></textarea>
                <label className="active" for="description">Description</label>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s3">
              </div>
              <div class="file-field input-field col s6">
                <div className="btn">
                  <span>File</span>
                  <input disabled type="file" multiple />
                </div>
                <div className="file-path-wrapper">
                  <input type="text" className="file-path validate" placeholder="Upload New Picture(s)" />
                </div>
              </div>
              <div class="input-field col s3">
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                {/* <AddToTourForm target={item.id} timestamp={new Date().toString()}/> */}
                <button className="waves-effect waves-light btn" type="submit"><i class="material-icons right">send</i>Submit</button>
              </div>
            </div>
          </form>
          <button className="waves-effect waves-light btn-flat red-text" onClick={this.handleDelete.bind(this, item.id)}>Delete</button>
          <TourAdder item={item} />
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="teal-text">Location Details</h1>
          <div className="divider"></div>
          <br />
          <div className="center-align">
            {this.renderLogic(this.props.location.state.item)}
            <br/>
          </div>
        </div>
        <Footer/>
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
  {deleteLocationById}
)(LocationDetail);
