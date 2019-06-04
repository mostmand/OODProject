import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import { NavMenu } from "./NavMenu";
import { History } from 'history';

interface IProps {
  isLoggedIn: boolean;
  username: string;
  history: History;
}

export class Layout extends Component<IProps, {}> {
  public static displayName = Layout.name;

  public render() {
    return (
      <div>
        <NavMenu isLoggedIn={this.props.isLoggedIn} username={this.props.username} history={this.props.history} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
