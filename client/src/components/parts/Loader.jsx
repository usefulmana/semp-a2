
import React, { Component } from 'react'

export default class Loader extends Component {
  render() {
    return (
      <div class="preloader-background">
        <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-teal-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
