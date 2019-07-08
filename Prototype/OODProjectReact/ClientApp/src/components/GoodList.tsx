import React, { Component } from "react";
import { Segment, Table, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IGood } from "./Products";
import { CartUtil } from "./utilities/CartUtil";

interface IProps {
    goods: IGood[];
}

export class GoodList extends Component<IProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        var rows = this.props.goods.map(x => <GoodSummary {...x} />);

        if (this.props.goods.length === 0) {
            return (
                <Segment>
                    کالایی برای نمایش یافت نشد...
                </Segment>
            );
        }

        return (
            <Segment color="blue">
                <Table textAlign="center">
                    <Table.Header>
                        <Table.HeaderCell>
                            نام
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            توضیح
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            شناسه
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            قیمت
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            تعداد
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            تخفیف
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

class GoodSummary extends Component<IGood> {
    addToCart = (productId: number) => {
        CartUtil.addToCart(String(productId));
    };

    public render() {
        return (
            <Table.Row>
                <Table.Cell>
                    {this.props.name}
                </Table.Cell>
                <Table.Cell>
                    {this.props.explanation}
                </Table.Cell>
                <Table.Cell>
                    {this.props.sku}
                </Table.Cell>
                <Table.Cell>
                    {this.props.price}
                </Table.Cell>
                <Table.Cell>
                    {this.props.quantity}
                </Table.Cell>
                <Table.Cell>
                    {this.props.discount}
                </Table.Cell>
                <Table.Cell>
                    <Button color="red"><Button.Content>
                        حذف
                    </Button.Content></Button>
                    <Button color="teal" animated as={Link} to={'/product?id=' + this.props.id}>
                        <Button.Content visible>برو</Button.Content>
                        <Button.Content hidden>
                            <Icon name='arrow left' />
                        </Button.Content>
                    </Button>
                    <Button color="green" onClick={() => { this.addToCart(this.props.id) }}><Button.Content>
                        افزودن به سبد
                    </Button.Content></Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}