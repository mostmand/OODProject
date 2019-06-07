import React, { Component } from "react";
import { Grid, Segment, Label, Image, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

export class Dashboard extends Component<{}, {}>{
    render() {
        return (
            <Grid columns={2}>
                <Grid.Column>
                    <Segment raised className="ltr">
                        <Label as='a' color='red' ribbon="right" size="huge">
                            کالا
                        </Label>
                        <Grid className="rtl" centered>
                            <Grid.Row textAlign="center">
                                <Button color="orange" as={Link} to="/add-product">افزودن کالا</Button>
                                <Button color="orange">گروه‌کالاها</Button>
                            </Grid.Row>
                        </Grid>

                        <Divider></Divider>

                        <Label as='a' color='green' ribbon="right" size="huge">
                            طرف حساب
                        </Label>
                        <Grid className="rtl" centered>
                            <Grid.Row textAlign="center">
                                <Button color="teal">افزودن مشتری</Button>
                                <Button color="teal">افزودن تأمین‌کننده</Button>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>

                <Grid.Column>
                    <Segment raised className="ltr">
                    <Label as='a' color='violet' ribbon size="huge">
                            گزارش
                        </Label>
                        <Grid className="rtl" centered>
                            <Grid.Row textAlign="center">
                                <Button as={Link} color="purple" to="/report">دریافت گزارش</Button>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}