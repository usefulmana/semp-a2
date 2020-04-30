import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min';
import NewLocationForm from './../forms/NewLocationForm';
import NewTypeForm from './../forms/NewTypeForm';
import { connect } from 'react-redux';
import NewUserForm from '../forms/NewUserForm';
import NewTourForm from './../forms/NewTourForm';


class AddButton extends Component {
  componentDidMount() {
    let elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, { hoverEnabled: false });
  }

  renderLogic = () =>{
    const url = window.location.href;

    if (url.includes('locations')){
      return <NewLocationForm/>
    }
    else if (url.includes('types')) {
      return <NewTypeForm />
    }
    else if (url.includes('tours')) {
      return <NewTourForm/>
    }
    else if (url.includes('users')) {
      return <NewUserForm/>
    }
  }

  render() {
    return (
      <div>
        <div className="fixed-action-btn">
          {this.props.auth.user.role !== 'ROLE_ADMIN' ? null :
            this.renderLogic()
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(AddButton);
