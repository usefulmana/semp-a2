import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import Navbar from './../../parts/Navbar';
import Swal from 'sweetalert2';
import { deleteTypeById, getTypeById, updateType } from '../../actions/typeActions';
import { Redirect } from 'react-router-dom';
import Footer from '../../parts/Footer';
import TourAdder from '../../parts/TourAdder';

class TypeDetail extends Component {

  constructor(props) {
    super(props)
    this.state = ({
      id: "",
      name: "",
      msg: ""
    })
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.props.getTypeById(this.props.match.params.id)
    setTimeout(() => {
      if (this.props.type.type !== null) {
        this.setState({
          name: this.props.type.type.name,
        })
      }
    }, 1000)
  }


  handleEdit(id) {
    // e.preventDefault()
    const {name} = this.state;
    const type = {id, name}

    this.props.updateType(type)
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
        this.props.deleteTypeById(id)
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          showConfirmButton: false,
          timer: 1500
        }).then(<Redirect to="/locations"></Redirect>)
      }
    })

  }

  renderLogic(item){
    return(
      <Fragment>
        <div>
          <div >

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="name" id="name" type="text" className="validate" value={item.name} required autoFocus onChange={this.onChange} />
                <label className="active" for="name">Name</label>
              </div>
            </div>

            <div className="row">
              <div className="center-align">
                {/* <AddToTourForm target={item.id} timestamp={new Date().toString()}/> */}
                {this.props.auth.user.role === "ROLE_USER" ? null :
                  <button className="waves-effect waves-light btn" type="submit" onClick={this.handleEdit.bind(this, this.props.match.params.id)}
                  ><i class="material-icons right">send</i>Submit</button>
                }

              </div>
            </div>
          </div>
          {this.props.auth.user.role === "ROLE_USER"? null :
            <Fragment>
              <button className="waves-effect waves-light btn-flat red-text" onClick={this.handleDelete.bind(this, this.props.match.params.id)}>Delete</button>
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
          <h1 className="teal-text">Type Details</h1>
          <div className="divider"></div>
          <br />
          <div className="center-align">
            {this.props.type.type===null? null : this.renderLogic(this.state)}
            <br />
          </div>
        </div>
        {/* TODO Fix Footer Location */}
        {/* <Footer /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  type: state.type
});

export default connect(
  mapStateToProps,
  { deleteTypeById, getTypeById, updateType }
)(TypeDetail);
