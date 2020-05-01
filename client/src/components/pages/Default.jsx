import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Default extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.id)
  }

  render() {
    return (
      this.state.redirect ? <Redirect to="/" /> :
        <div id="notfound" className="center-align">
          <div class="notfound">
            <div class="notfound-404">
              <h3>Oops! Page not found</h3>
              <h1>
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
            </div>
            <h2>we are sorry, but the page you requested was not found. returning to the log in page...</h2>
          </div>
        </div>
    )
  }
}
