import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/common/privateRoute';
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

export default class Routes extends Component {
  render() {
    // console.log(this.props.auth)
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/locations" exact component={Locations}></PrivateRoute>
          <PrivateRoute path="/profile" exact component={Profile}></PrivateRoute>
          <PrivateRoute path="/types" exact component={Types}></PrivateRoute>
          <PrivateRoute path="/tours" exact component={Tours}></PrivateRoute>
          <PrivateRoute path="/users" exact component={Users}></PrivateRoute>
          <PrivateRoute path="/" exact component={Home}></PrivateRoute>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/fpw" exact component={ForgotPW}></Route>
          <Route path="/success" exact component={Success}></Route>
          <PrivateRoute path="/location/:id" component={LocationDetail}></PrivateRoute>
          <PrivateRoute path="/tour/:id" component={TourDetail}></PrivateRoute>
          <PrivateRoute path="/type/:id" component={TypeDetail}></PrivateRoute>
          <PrivateRoute path="/user/:id" component={UserDetail}></PrivateRoute>
          <Route path="/recover/:token" component={PasswordRecovery}></Route>
          <Route component={Default} />
        </Switch>
      </BrowserRouter>
    )
  }
}

