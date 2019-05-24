import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItemProps, Sidebar, Segment, Image, Header, Icon } from "semantic-ui-react";
import "./NavMenu.css";

interface ILocalState {
  // collapsed: boolean
  activeItem: string;
}

export class NavMenu extends Component<{}, ILocalState> {
  public static displayName = NavMenu.name;

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
    return (
      <Menu inverted className="nav-menu" size="large">
        <Menu.Menu position="right">
          <Menu.Item name="home" as={Link} to="/" onClick={this.setActive} active={this.state.activeItem === "home"}>
            <Image src="logo.png" className="logo"></Image>
          </Menu.Item>

          <Menu.Item name="products" as={Link} to="/products" onClick={this.setActive} active={this.state.activeItem === "products"}>
            کالاها
          </Menu.Item>

          <Menu.Item name="invoices" as={Link} to="/invoices" onClick={this.setActive} active={this.state.activeItem === "invoices"}>
            فاکتورها
          </Menu.Item>

          <Menu.Item name="dashboard" as={Link} to="/dashboard" onClick={this.setActive} active={this.state.activeItem === "dashboard"}>
            داشبورد
          </Menu.Item>
        </Menu.Menu>


        <Menu.Menu position="left">
          <Menu.Item name="login" as={Link} to="/login" onClick={this.setActive} active={this.state.activeItem === "login"}>
            ورود
          </Menu.Item>

          <Menu.Item name="cart" as={Link} to="/cart" onClick={this.setActive} active={this.state.activeItem === "cart"}>
            <Icon name="cart"></Icon>
          </Menu.Item>
        </Menu.Menu>

      </Menu>
    );
  }
}
