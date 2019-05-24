import React, { Component, FormEvent } from "react";
import { IProduct } from "./IProduct";
import SearchProduct from "./SearchProduct";
import { Table, Image, Header, Grid, Button, Icon, Radio, CheckboxProps, Label } from "semantic-ui-react";
import { CartUtil } from "./utilities/CartUtil";

interface IProductItem {
    product: IProduct;
    quantity: number;
}

interface ILocalState {
    products: { [id: string]: IProductItem; };
    isSaleInvoice: boolean
}

export class Cart extends Component<{}, ILocalState> {
    getProductInfo(productId: string): IProduct {
        // TODO implement using server api
        return {
            id: productId,
            description: 'توضیحات',
            image: 'Temp/152408.jpg',
            price: '۸۲ هزار تومان',
            title: 'کالای تست'
        }
    }

    getCart(): { [id: string]: IProductItem; } {
        const storedCart = CartUtil.getCart();

        const cart: {[id: string]: IProductItem;} = {};
        for (const [productId, quantity] of Object.entries(storedCart)) {
            const product = this.getProductInfo(productId);
            cart[productId] = { product: product, quantity: quantity };
        }
        return cart;
    }

    incrementProductQuantity = (productId: string) => {
        const products: { [id: string]: IProductItem; } = Object.assign(this.state.products);
        if (productId in products) {
            const newProduct = Object.assign(products[productId]);
            newProduct.quantity++;
            products[productId] = newProduct;
        }

        CartUtil.addToCart(productId);

        this.setState({
            products: products
        });
    }

    decrementProductQuantity = (productId: string) => {
        const products: { [id: string]: IProductItem; } = Object.assign(this.state.products);
        if (productId in products) {
            const newProduct = Object.assign(products[productId]);
            newProduct.quantity--;
            products[productId] = newProduct;
        }

        CartUtil.decrementItemQuantity(productId);

        this.setState({
            products: products
        });
    }

    removeProduct = (productId: string) => {
        const products: { [id: string]: IProductItem; } = Object.assign(this.state.products);
        if (productId in products) {
            delete products[productId];
        }

        CartUtil.removeFromCart(productId);

        this.setState({
            products: products
        });
    }

    handleInvoiceTypeChange = (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        this.setState({
            products: this.state.products,
            isSaleInvoice: data.checked!
        });
    };

    constructor(props: any) {
        super(props);
        this.state = {
            products: this.getCart(),
            isSaleInvoice: false
        };
    }

    public render() {
        const products = this.state.products;
        const items: any[] = [];

        for (const product of Object.values(products)) {
            const minusIcon = product.quantity > 1 ?
                <Button icon circular onClick={() => this.decrementProductQuantity(product.product.id)}>
                    <Icon name="minus circle" color="red" size="large"></Icon>
                </Button>
                : [];
            items.push(
                <Table.Row>
                    <Table.Cell>
                        {product.product.title}
                    </Table.Cell>
                    <Table.Cell>
                        {product.quantity}
                        <Button icon circular onClick={() => this.incrementProductQuantity(product.product.id)}>
                            <Icon name="plus circle" color="green" size="large"></Icon>
                        </Button>
                        {minusIcon}
                    </Table.Cell>
                    <Table.Cell>
                        {product.product.price}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                        <Image height="75rem" width="auto" src={product.product.image}></Image>
                    </Table.Cell>
                    <Table.Cell>
                        <Button icon circular onClick={() => this.removeProduct(product.product.id)}>
                            <Icon name="remove circle" color="red" size="large"></Icon>
                        </Button>
                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={11}>
                        <Header as='h2'>
                            اقلام
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Label color="teal" pointing="left">فاکتور فروش</Label>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Radio toggle checked={this.state.isSaleInvoice} onChange={this.handleInvoiceTypeChange} />
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Label color="violet" pointing="right">فاکتور خرید</Label>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Table textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>نام کالا</Table.HeaderCell>
                                <Table.HeaderCell>تعداد</Table.HeaderCell>
                                <Table.HeaderCell>قیمت</Table.HeaderCell>
                                <Table.HeaderCell>تصویر</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
        );
    }

}
