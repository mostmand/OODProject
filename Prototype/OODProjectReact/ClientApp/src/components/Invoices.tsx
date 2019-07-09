import React, { Component } from "react";
import { Segment, Table, Header, Grid } from "semantic-ui-react";
import { InvoiceList, IInvoice } from "./InvoiceList";
import { FetchUtil } from "./utilities/FetchUtil";


interface ILocalState {
    saleInvoices: IInvoice[];
    purchaseInvoices: IInvoice[];
}

export class Invoices extends Component<{}, ILocalState>{
    loadInvoices = () => {
        this.loadPurchaseInvoices();
        this.loadSaleInvoices();
    }
    loadSaleInvoices = async () => {
        var response = await FetchUtil.fetchFromUrl("/api/Accounting/get-purchase-invoices?from=0&size=100");
        var data = await response.json() as IInvoice[];
        data.forEach(element => {
            element.isSaleInvoice = true;
        });
        
        var newState = Object.assign(this.state) as ILocalState;
        newState.saleInvoices = data;
        this.setState(newState);
    }
    loadPurchaseInvoices = async () => {
        var response = await FetchUtil.fetchFromUrl("/api/Accounting/get-sale-invoices?from=0&size=100");
        var data = await response.json() as IInvoice[];
        data.forEach(element => {
            element.isSaleInvoice = false;
        });
        
        var newState = Object.assign(this.state) as ILocalState;
        newState.purchaseInvoices = data;
        this.setState(newState);
    }
    constructor(props: any) {
        super(props);

        this.state = {
            purchaseInvoices: [],
            saleInvoices: []
        }

        this.loadInvoices();
    }

    render() {
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
                            <InvoiceList invoices={this.state.purchaseInvoices}>

                            </InvoiceList>
                        </Grid.Column>

                        <Grid.Column width={8}>
                            <Header>
                                فاکتورهای فروش
                            </Header>
                            <InvoiceList invoices={this.state.saleInvoices}>

                            </InvoiceList>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}