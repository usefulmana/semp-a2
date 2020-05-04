import React, { Component, Fragment } from 'react'
import Navbar from './../../parts/Navbar';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import  Swal  from 'sweetalert2';
import { deleteLocationById, getLocationById, updateLocation } from '../../actions/locationActions';
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

  componentDidMount() {
    this.props.getLocationById(this.props.match.params.id)
    var box = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(box);
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems);

    setTimeout(() => {
      if (this.props.loc.location !== null) {
        this.setState({
          id: this.props.loc.location.id,
          name: this.props.loc.location.name,
          description: this.props.loc.location.description,
          x: this.props.loc.location.x,
          y: this.props.loc.location.y,
          minTime: this.props.loc.location.minTime
        })
      }
    }, 1000)

  }

  handleEdit() {
    const {id, name , description, x , y, minTime} = this.state;

    const body = {id, name , description, x , y, minTime}

    this.props.updateLocation(body)
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




  renderLogic = (item) => {
    return (
      <Fragment>
        <div className="slider">
          <ul className="slides">
            <li><img src="https://i.picsum.photos/id/104/1920/1080.jpg" className="materialboxed"/></li>
          </ul>
        </div>
        <div>
          <div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="name" id="name" type="text" className="validate" value={item.name} required onChange={this.onChange} />
                <label className="active" for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s1">
                <input name="x" id="x" type="number" className="validate" value={item.x} required onChange={this.onChange}/>
                <label className="active" for="name">X</label>
              </div>
              <div class="input-field col s1">
                <input name="y" id="y" type="number" className="validate" value={item.y} required onChange={this.onChange} />
                <label className="active" for="name">Y</label>
              </div>
              <div class="input-field col s4">
                <input name="minTime" id="minTime" type="number" className="validate" value={item.minTime} required onChange={this.onChange} />
                <label className="active" for="minTime">Minimum Time in Seconds</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <textarea id="description" name="description" className="materialize-textarea" value={item.description} onChange={this.onChange}></textarea>
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
                {this.props.auth.user.role === "ROLE_USER" ? null :
                  <button className="waves-effect waves-light btn" type="submit" onClick={this.handleEdit.bind(this)}><i class="material-icons right">send</i>Submit</button>
                }
              </div>
            </div>
          </div>
          {this.props.auth.user.role === "ROLE_USER"? null :

              <Fragment>
                <button className="waves-effect waves-light btn-flat red-text" onClick={this.handleDelete.bind(this, item.id)}>Delete</button>
                <TourAdder item={item} />
              </Fragment>

          }

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
            {this.props.loc.location === null ? null : this.renderLogic(this.state)}
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
  error: state.error,
  loc: state.loc
});

export default connect(
  mapStateToProps,
  { deleteLocationById, getLocationById, updateLocation}
)(LocationDetail);
