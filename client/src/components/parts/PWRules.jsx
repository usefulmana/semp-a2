import React, { Component } from 'react'
import M from 'materialize-css/dist/js/materialize.min';


export default class PWRules extends Component {

  componentDidMount() {
    let tool = document.querySelectorAll('.modal');
    M.Modal.init(tool, { dismissible: true });
  }

  render() {
    return (
      <div className="center-align">
        <button className="btn-flat blue-text waves-effect forgot-pw modal-trigger" data-target="modal3">
          PASSWORD RULES
        </button>
        <div ref={Modal => {
          this.Modal = Modal;
        }} id="modal3" class="modal">
          <div class="modal-content">
            <h4>Password Rules</h4>
            <hr className="grey" />
            <ul className="left-align">
              <li> Minimum <b>8 characters</b></li>
              <li> Contains at least <b> 1 uppercase character</b>: A->Z </li>
              <li> Contains at least <b>1 lowercase character</b>: a->z </li>
              <li> Contains at least <b>1 number</b>: 0->9 </li>
              <li> Contains at least <b>1 special character</b>: @$!%*?&</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
