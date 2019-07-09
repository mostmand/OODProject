import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import queryString from "query-string"
import { number } from "prop-types";
import { FetchUtil } from "./utilities/FetchUtil";

interface ILocalState {
    id: number;
    details: ISaleInvoiceDetails;
}

interface IInvoiceItemDetails {
    goodName: string;
    quantity: number;
    totalPrice: number;
}

interface ISaleInvoiceDetails {
    customerName: string;
    items: IInvoiceItemDetails[];
    totalPrice: number;
    remaining: number;
    // payments: CustomerPayment[];
}

export class SaleInvoice extends Component<{}, ILocalState> {
    fetchInvoiceInfo = async () => {
        var response = await FetchUtil.fetchFromUrl("/get-sale-invoice?id=" + this.state.id);
        var data = await response.json() as ISaleInvoiceDetails;

        var newState = Object.assign(this.state) as ILocalState;
        newState.details = data;
        this.setState(newState);
    }
    constructor(props: any) {
        super(props);

        const value = queryString.parse(props.location.search);
        const id = value.id;

        if (!id) {
            throw new Error("Id cannot be undefined");
        }

        this.state = {
            id: parseInt(id as string),
            details: {
                customerName: '',
                items: [],
                totalPrice: 0,
                remaining: 0
                // payments: SupplierPayment[]
            }
        };

        this.fetchInvoiceInfo();
    }

    public render() {
        return (
            <div>

            </div>
        );
    }
}
