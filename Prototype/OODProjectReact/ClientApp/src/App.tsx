import React, { Component } from 'react';
import { Route } from 'react-router';
import { Cart } from './components/Cart';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import LoginPage from './components/Login';
import { Invoices } from './components/Invoices';
import { Report } from './components/Report';

export default class App extends Component {
  public static displayName = App.name;

  public render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/products" component={Products} />
        <Route path="/login" component={LoginPage} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/report" component={Report} />
      </Layout>
    );
  }
}
