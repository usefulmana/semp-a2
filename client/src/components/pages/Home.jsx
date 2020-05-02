import React, { Component, Fragment } from 'react'
import { logout } from './../actions/authActions';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './../parts/Navbar';
import Swal from 'sweetalert2';
import M from 'materialize-css/dist/js/materialize.min';
import Footer from '../parts/Footer';

class Home extends Component {
  banNotice = () => {
    this.props.logout()
    Swal.fire({
      icon: 'error',
      title: 'Your account is banned!',
      text: 'Please contact the admin to resolve this issue!'
    })

    return <Redirect to="/" />
  }


  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.parallax');
      M.Parallax.init(elems);
      // var t = document.querySelectorAll('.tooltipped');
      // M.Tooltip.init(t, { outDuration: 0});
    });
  }


  displayHome = () => {
    return (
      <Fragment>
        <Navbar />
        <div>
          <div className="parallax-container" style={{width:"100%"}}>
            <div className="parallax"><img src="http://getwallpapers.com/wallpaper/full/6/8/e/1051820-amazing-1080p-nature-wallpaper-1920x1080.jpg" width='100%' /></div>
          </div>
          <div className="section white">
            <div className="row container">
              <div class="row">
                <div class="col s12 m1"></div>
                <Link to="/locations">
                  <div class="col s12 m2">
                    <div class="card-panel teal center-align">
                      <span class="white-text"><i className="large material-icons">location_on</i> Locations
                      </span>
                    </div>
                  </div>
                </Link>


                <Link to="/tours">
                  <div class="col s12 m2">
                    <div class="card-panel teal center-align" >
                      <span class="white-text"><i className="large material-icons">folder</i> <br/> Tours
                      </span>
                    </div>
                  </div>
                </Link>


                <Link to="/profile">
                  <div class="col s12 m2">
                    <div class="card-panel teal center-align " >
                      <span class="white-text"><i className="large material-icons">account_circle</i> <br /> Profile
                      </span>
                    </div>
                  </div>
                </Link>


                <Link to="/types">
                  <div class="col s12 m2">
                    <div class="card-panel teal center-align ">
                      <span class="white-text"><i className="large material-icons">label</i> <br /> Types
                      </span>
                    </div>
                  </div>
                </Link>

                {this.props.auth.user.role === 'ROLE_USER' ? null :
                  <Link to="/users">
                    <div class="col s12 m2">
                      <div class="card-panel teal center-align " >
                        <span class="white-text"><i className="large material-icons">assignment_ind</i> <br /> Users
                      </span>
                      </div>
                    </div>
                  </Link>
                }
              </div>
            </div>
          </div>
          <div className="parallax-container">
            <div className="parallax"><img src="http://getwallpapers.com/wallpaper/full/c/b/9/1051794-amazing-1080p-nature-wallpaper-1920x1080-for-iphone-6.jpg" /></div>
          </div>
        </div>

        <Footer/>
      </Fragment>
    )
  }

  render() {
    return (
      <div>
        {!this.props.auth.user.isActive ? this.banNotice() : this.displayHome()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  ui: state.ui
});

export default connect(mapStateToProps, { logout })(Home);
