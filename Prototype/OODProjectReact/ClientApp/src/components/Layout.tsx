import React, { Component } from "react";
import { Container, Grid } from "semantic-ui-react";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  public static displayName = Layout.name;

  public render() {
    return (
      <div>
          <NavMenu />
          <Container>
            {this.props.children}
          </Container>
      </div>
    );
  }
}
