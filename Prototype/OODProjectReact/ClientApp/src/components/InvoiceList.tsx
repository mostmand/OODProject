import React, { Component } from "react";
import { Segment, Table, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export interface IInvoice {
    date: string;
    id: string;
    fee: number;
    creatorUsername: string;
    personName: string;
}

interface IProps {
    invoices: IInvoice[];
}

export class InvoiceList extends Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        var rows = this.props.invoices.map(x => <InvoiceSummary {...x} />);

        if (this.props.invoices.length === 0) {
            return (
                <Segment>
                    فاکتوری برای نمایش یافت نشد...
                </Segment>
            );
        }

        return (
            <Segment color="blue">
                <Table textAlign="center">
                    <Table.Header>
                        <Table.HeaderCell>
                            شماره فاکتور
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            تاریخ صدور
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            مبلغ
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            طرف حساب
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            صادر کننده
                        </Table.HeaderCell>
                        <Table.HeaderCell>

                        </Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {rows}
                    </Table.Body>
                </Table>
            </Segment>
        );
    }
}

class InvoiceSummary extends Component<IInvoice> {
    public render() {
        return (
            <Table.Row>
                <Table.Cell>
                    {this.props.id}
                </Table.Cell>
                <Table.Cell>
                    {this.props.date}
                </Table.Cell>
                <Table.Cell>
                    {this.props.fee} تومان
                </Table.Cell>
                <Table.Cell>
                    {this.props.personName}
                </Table.Cell>
                <Table.Cell>
                    {this.props.creatorUsername}
                </Table.Cell>
                <Table.Cell>
                    <Button color="teal" animated as={Link} to={'/invoice?id=' + this.props.id}>
                        <Button.Content visible>برو</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow left' />
                        </Button.Content>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}