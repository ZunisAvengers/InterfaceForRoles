import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListOrder } from './components/ListOrder';
import { AuthorizeRotePage } from './components/api-authorization/AuthorizeRotePage';
import AuthorizeRoutes from './components/api-authorization/AuthorizeRoutes';
import identity from './components/api-authorization/Identity'

import './custom.css'
import { async } from 'q';

export default class App extends Component {
  static displayName = App.name;
  componentWillMount(){
    identity.GetUser() 
  }
  

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <AuthorizeRotePage path='/list-order' component={ListOrder} />
        <Route path='/authentication' component={AuthorizeRoutes} />
      </Layout>
    );
  }
}
