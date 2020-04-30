import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import Swal from 'sweetalert2';
import { deleteTourById} from './../../actions/tourActions';
import { Redirect } from 'react-router-dom';
import Navbar from './../../parts/Navbar';
import Footer from './../../parts/Footer';

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
      createdAt: '',
      createBy:'',
      minTime: '',
      msg: ""
    })
    this.onChange = this.onChange.bind(this)
    // this.handleDeleteLocation = this.handleDeleteLocation.bind(this)
    // this.handleDeleteTour = this.handleDeleteTour.bind(this)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleDeleteLocation(loc){
    this.setState({
      locations: this.state.locations.filter(i => {return i.id !== loc.id}),
      minTime: this.state.minTime - loc.minTime
    })

  }

  handleDeleteType(id){
    this.setState({
      types: this.state.types.filter(i => { return i.id !== id })
    })
  }

  handleAddLocation(){

  }

  handleAddTour(){

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

  componentDidMount() {
    var box = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(box);
    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems);

    this.setState({
      id: this.props.location.state.item.id,
      name: this.props.location.state.item.name,
      description: this.props.location.state.item.description,
      locations: this.props.location.state.item.locations,
      types: this.props.location.state.item.types,
      thumbnail: this.props.location.state.item.thumbnail,
      createdAt: this.props.location.state.item.createdAt,
      createBy: this.props.location.state.item.createdBy,
      minTime: this.props.location.state.item.minTime
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
          <form onSubmit={this.handleEdit}>

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
                {item.locations.map(loc => (
                  <div className="left-align">
                    <br/>
                    <div className="chip">
                      {loc.name}
                      <a onClick={() => this.handleDeleteLocation(loc)}><i className="close material-icons" >close</i></a>
                    </div>
                  </div>
                ))}
                <br />
                <div className="left-align">
                  <div className="chip">
                    <i className="material-icons small">add</i>
                  </div>
                </div>

                <label htmlFor="locs" className="active">Locations</label>
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
                  <div className="chip">
                    <i className="material-icons small">add</i>
                  </div>
                </div>
                <label htmlFor="types" className="active">Types</label>
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                <button className="waves-effect waves-light btn" type="submit"><i class="material-icons right">send</i>Submit</button>
              </div>
            </div>

          </form>
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
  tour: state.tour
});

export default connect(
  mapStateToProps,
  { deleteTourById }
)(TourDetail);
