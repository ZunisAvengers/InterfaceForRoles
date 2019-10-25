import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { Login } from './Login'
import { Register } from './Register';
import { ManagerOrderList } from './../ManagerOrderList'
//import { Logout } from './Logout'


export default class AuthorizeRoutes extends Component {

  render () {
    return(
      <Fragment>
          <Route path="/authentication/Login" component={Login}/>
          <Route path="/authentication/Register" component={Register}/>
          <Route path="/authentication/List" component={ManagerOrderList}/>
      </Fragment>);
  }
}