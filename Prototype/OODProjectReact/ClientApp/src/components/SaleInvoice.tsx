import React, { Component } from "react";
import { Card, Image, Table } from "semantic-ui-react";
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
        var items: any[] = [];

        this.state.details.items.forEach(item => {
            items.push(
                <Table.Row>
                    <Table.Cell>
                        {item.goodName}
                    </Table.Cell>
                    <Table.Cell>
                        {item.quantity}
                    </Table.Cell>
                    <Table.Cell>
                        {item.totalPrice} تومان
                    </Table.Cell>
                </Table.Row>
            )
        });

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            نام کالا
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            تعداد
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            قیمت کل
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items}
                    <Table.Row>
                        <Table.Cell>
                            مجموع
                        </Table.Cell>
                        <Table.Cell>
                            
                        </Table.Cell>
                        <Table.Cell>
                            {this.state.details.totalPrice} تومان
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            باقی‌مانده
                        </Table.Cell>
                        <Table.Cell>
                            
                        </Table.Cell>
                        <Table.Cell>
                            {this.state.details.remaining} تومان
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    }
}
