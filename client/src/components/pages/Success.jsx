import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Success extends Component {
  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 7000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return (
      this.state.redirect ? <Redirect to="/login" /> :
        <div className="valign-wrapper row login-box">
          <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
            <div className="card-content">
              <div className="row">
                <div className="input-field col s12 center-align">
                  {this.props.location.state.mes}
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

