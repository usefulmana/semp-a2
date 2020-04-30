import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class CardTop extends Component {
  render() {
    return (
      <div className="card-title center-align">
        <Link to="/" className="teal-text">
          <i class="medium material-icons">
            museum
                  </i>
        </Link>
        <div>{this.props.title}</div>
      </div>
    )
  }
}
