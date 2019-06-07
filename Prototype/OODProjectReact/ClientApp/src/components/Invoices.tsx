import React, { Component } from "react";
import { Segment, Table, Header, Grid } from "semantic-ui-react";
import { InvoiceList, IInvoice } from "./InvoiceList";

export class Invoices extends Component<{}, {}>{
    constructor(props: any) {
        super(props);
    }

    render() {
        var sellInvoices: IInvoice[] = [
            {
                id: '1',
                creatorUsername: 'مدیر',
                personName: 'احمد',
                date: '1398/02/24',
                fee: 450000
            }
        ];

        var purchaseInvoices: IInvoice[] = [];

        return (
            <Segment color="teal">
                <Header>
                    فاکتورها
                </Header>

                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={8}>
                            <Header>
                                فاکتورهای خرید
                            </Header>
                            <InvoiceList invoices={purchaseInvoices}>

                            </InvoiceList>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <Header>
                                فاکتورهای فروش
                            </Header>
                            <InvoiceList invoices={sellInvoices}>

                            </InvoiceList>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}