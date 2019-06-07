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
import { AddProduct } from './components/AddProduct';
import { CookieUtil } from './components/utilities/CookieUtil';
import { FetchUtil } from './components/utilities/FetchUtil';
import { History } from 'history';
import { AddCashier } from './AddCashier';
import { AddCustomer } from './AddCustomer';
import { AddSupplier } from './components/AddSupplier';

interface ILocalState {
  isLoggedIn: boolean;
  username: string;
  loaded: boolean;
};

interface IProps {
  history: History;
}

export default class App extends Component<IProps, ILocalState> {
  public static displayName = App.name;

  constructor(props: any) {
    super(props);

    this.state = {
      isLoggedIn: false,
      username: '',
      loaded: false
    };
  }

  public async componentDidMount() {
    var loginToken = CookieUtil.getCookie("logintoken");
    if (loginToken != null) {
      const url = '/api/login/is-logged-in';
      var response = await FetchUtil.fetchFromUrl(url);
      const loggedIn = response['isLoggedIn'];
      if (loggedIn) {
        const username = response['username'];

        this.setState({
          isLoggedIn: true,
          username: username,
          loaded: true
        });

        return;
      }
    }
    this.setState({
      isLoggedIn: false,
      loaded: true
    });
  }

  public render() {
    if (this.state.loaded && !this.state.isLoggedIn) {
      return (
        <Layout isLoggedIn={this.state.isLoggedIn} username={this.state.username} history={this.props.history}>
          <Route path="/" component={LoginPage} />
        </Layout>
      );
    }

    return (
      <Layout isLoggedIn={this.state.isLoggedIn} username={this.state.username} history={this.props.history}>
        <Route exact path="/" component={Dashboard} />
        <Route path="/cart" component={Cart} />
        <Route path="/products" component={Products} />
        <Route path="/invoices" component={Invoices} />
        <Route path="/report" component={Report} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/add-cashier" component={AddCashier} />
        <Route path="/add-customer" component={AddCustomer} />
        <Route path="/add-supplier" component={AddSupplier} />
      </Layout>
    );
  }
}
