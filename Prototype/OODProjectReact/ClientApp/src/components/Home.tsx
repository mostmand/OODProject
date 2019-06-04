import React, { Component } from "react";
import { Container, Segment, Image, Grid } from "semantic-ui-react";


export class Home extends Component<{}, {}> {
  public static displayName = Home.name;

  public render() {
    return (
      <Segment textAlign="center">
        <Grid columns={1}>
          <Grid.Column width={16} >
            <Image width="100%" centered src="home-page-logo.png"></Image>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}
