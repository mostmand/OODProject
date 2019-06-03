import React, { Component } from "react";
import { Segment, Table, Header, Dropdown, Container, Grid, Label, Divider, Button } from "semantic-ui-react";
import Calendar from 'react-persian-calendar';

export class Report extends Component<{}, {}>{
    constructor(props: any) {
        super(props);
    }

    reportTypeOptions = [
        {
            key: 'supply',
            text: 'موجودی کالاها',
            value: 'supply',
        },
        {
            key: 'debt',
            text: 'مانده‌ی طرف حساب‌ها',
            value: 'debt',
        },
        {
            key: 'customer-statistics',
            text: 'آمار مشتریان',
            value: 'customer-statistics',
        },
        {
            key: 'profit-loss',
            text: 'سود و زیان',
            value: 'profit-loss',
        }
    ]

    render() {
        return (
            <Segment color="teal">
                <Header>
                    گزارش‌گیری
                </Header>
                <Divider></Divider>
                <Dropdown
                    placeholder='نوع گزارش'
                    fluid
                    selection
                    options={this.reportTypeOptions}
                    direction="right"
                    className="right"
                />

                <Grid columns={2}>
                    <Grid.Column>
                        <Segment className="ltr">
                            <Label as='a' color='red' ribbon="right" size="huge">
                                از
                        </Label>
                            <Grid className="rtl" centered>
                                <Grid.Row textAlign="center">
                                    <Calendar />
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment className="ltr">
                            <Label as='a' color='violet' ribbon="right" size="huge">
                                تا
                        </Label>
                            <Grid className="rtl" centered>
                                <Grid.Row textAlign="center">
                                    <Calendar />
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid>

                <Button color="instagram">ایجاد گزارش</Button>
            </Segment>
        );
    }
}