import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItemProps, Sidebar, Segment, Image, Header, Icon, Button } from "semantic-ui-react";
import "./NavMenu.css";
import { CookieUtil } from "./utilities/CookieUtil";
import { History } from 'history';

interface ILocalState {
  // collapsed: boolean
  activeItem: string;
}

interface IProps {
  isLoggedIn: boolean;
  username: string;
  history: History;
}

export class NavMenu extends Component<IProps, ILocalState> {
  public static displayName = NavMenu.name;
  Logout = (() => {
    CookieUtil.eraseCookie('logintoken');
    this.props.history.push('/');
  });

  constructor(props: any) {
    super(props);

    this.state = {
      activeItem: window.URL.name
    };
  }

  componentDidMount() {
    const path = window.location.pathname;
    const activeItem = path === '/' ? 'home' : path.split('/')[1];

    this.setState({ activeItem: activeItem })
  }

  public setActive = (e: any, { name }: MenuItemProps) => this.setState({ activeItem: name! });

  public render() {

    var rightItems = this.props.isLoggedIn ? [
      <Menu.Item name="products" as={Link} to="/products" onClick={this.setActive} active={this.state.activeItem === "products"}>
        کالاها
      </Menu.Item>,
      <Menu.Item name="invoices" as={Link} to="/invoices" onClick={this.setActive} active={this.state.activeItem === "invoices"}>
        فاکتورها
      </Menu.Item>
    ] : [];

    var leftItems = this.props.isLoggedIn ? [
      <Menu.Item name="cart" as={Link} to="/cart" onClick={this.setActive} active={this.state.activeItem === "cart"}>
        <Icon name="cart"></Icon>
      </Menu.Item>,
      <Menu.Item name="login" as={Link} onClick={this.Logout}>
        خروج
      </Menu.Item>
    ] : [];

    return (
      <Menu inverted className="nav-menu" size="large">
        <Menu.Menu position="right">
          <Menu.Item name="home" as={Link} to="/" onClick={this.setActive} active={this.state.activeItem === "home"}>
            <Image src="logo.png" className="logo"></Image>
          </Menu.Item>

          {rightItems}
        </Menu.Menu>

        <Menu.Menu position="left">
          {leftItems}
        </Menu.Menu>

      </Menu>
    );
  }
}
