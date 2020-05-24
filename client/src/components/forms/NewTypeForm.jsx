import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { createType } from './../actions/typeActions';

class NewTypeForm extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      name: '',
      msg: ''
    })
    this.onChange = this.onChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "ADD_TYPE_FAIL") {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  resetForm = () => {
    this.setState({
      msg: ""
    })
    document.getElementById("type-form").reset();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddType = (e) => {
    e.preventDefault()
    const { name } = this.state;
    const type = { name };
    this.props.createType(type)
  }

  render() {
    return (
      <Fragment>
        <button class="btn-floating btn-large red tooltipped modal-trigger" href="#modal-type" data-tooltip="Create" data-position="left"><i class="material-icons">add</i></button>
        <div id="modal-type" class="modal">
          <form class="modal-content" id="type-form" onSubmit={this.handleAddType.bind(this)}>
            <h4 className="center-align">Create A Type</h4>
            {this.state.msg ? <div className="animated red-text shake center-align "> {this.state.msg}</div> : null}
            <div class="row">
              <div class="input-field col s3">
              </div>
              <div class="input-field col s6">
                <input name="name" id="name" type="text" className="validate" required autoFocus onChange={this.onChange} />
                <label className="active" for="name">Name</label>
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
  type: state.type
});

export default connect(
  mapStateToProps,
  { createType }
)(NewTypeForm);
