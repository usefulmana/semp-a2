import React, { Component } from 'react'
import {connect} from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './components/common/privateRoute';
import Locations from './components/pages/Locations';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import PasswordRecovery from './components/pages/PasswordRecovery';
import Default from './components/pages/Default';
import ForgotPW from './components/pages/ForgotPW';
import Types from './components/pages/Types';
import Tours from './components/pages/Tours';
import Users from './components/pages/Users';
import 'materialize-css/dist/css/materialize.min.css';
import Success from './components/pages/Success';
import Profile from './components/pages/Profile';
import LocationDetail from './components/pages/details/LocationDetail'
import TourDetail from './components/pages/details/TourDetail';
import TypeDetail from './components/pages/details/TypeDetail';
import UserDetail from './components/pages/details/UserDetail';

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <PrivateRoute path="/home" exact component={Home} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/locations" exact component={Locations} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/profile" exact component={Profile} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/types" exact component={Types} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/tours" exact component={Tours} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/users" exact component={Users} auth={this.props.auth}></PrivateRoute>
          <Route path="/fpw" exact component={ForgotPW}></Route>
          <Route path="/success" exact component={Success}></Route>
          <PrivateRoute path="/location/:id" component={LocationDetail} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/tour/:id" component={TourDetail} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/type/:id" component={TypeDetail} auth={this.props.auth}></PrivateRoute>
          <PrivateRoute path="/user/:id" component={UserDetail} auth={this.props.auth}></PrivateRoute>
          <Route path="/recover/:token" component={PasswordRecovery}></Route>
          <Route component={Default} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({ auth: state.auth});
export default connect(mapStateToProps, {})(Routes);
