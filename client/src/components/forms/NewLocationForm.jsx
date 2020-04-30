import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { createLocation } from './../actions/locationActions';

class NewLocationForm extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      name: '',
      x: '',
      y: '',
      minTime: '',
      description: '',
      msg: ''
    })

    this.onChange = this.onChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleAddLocation = this.handleAddLocation.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "ADD_LOCATION_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onClick = (e) => {
    e.preventDefault()
    window.alert("This functionality has not yet been implemented. We are sorry for the inconvenience!")
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  resetForm = () => {
    this.setState({
      msg: ""
    })
    document.getElementById("location-form").value="";
  }

  handleAddLocation = () => {
    const { name, x, y, minTime, description } = this.state;
    const location = { name, x, y, minTime, description };
    this.props.createLocation(location)
  }

  render() {
    return (
      <Fragment>
        <button class="btn-floating btn-large red tooltipped modal-trigger"
          href="#modal-locations" data-tooltip="Create" data-position="left">
          <i class="material-icons">add</i></button>
        <div id="modal-locations" class="modal">
          <form class="modal-content" id="location-form" onSubmit={this.handleAddLocation}>
            <h4 className="center-align">Create A Location</h4>
            {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="name" id="name" type="text" className="validate" required autoFocus minLength="4" onChange={this.onChange} />
                <label className="active" for="name">Name</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s1">
                <input name="x" id="x" type="number" className="validate" required onChange={this.onChange} />
                <label className="active" for="name">X</label>
              </div>
              <div class="input-field col s1">
                <input name="y" id="y" type="number" className="validate" required onChange={this.onChange} />
                <label className="active" for="name">Y</label>
              </div>
              <div class="input-field col s4">
                <input name="minTime" id="minTime" type="number" className="validate" required onChange={this.onChange} min="0" />
                <label className="active" for="minTime">Minimum Time in Seconds</label>
              </div>
            </div>

            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <textarea id="description" name="description" class="materialize-textarea" onChange={this.onChange} required></textarea>
                <label className="active" for="description">Description</label>
              </div>
            </div>

            <div className="row">
              <div class="input-field col s3">
              </div>
              <div class="file-field input-field col s6">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onClick={this.onClick} multiple />
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
                <button className="waves-effect waves-light btn-flat grey-text" onClick={this.resetForm}>Reset</button>
                <button className="waves-effect waves-light btn"><i class="material-icons right">send</i>Submit</button>
              </div>
            </div>

          </form>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
        </div>
      </Fragment>
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
  { createLocation }
)(NewLocationForm);
