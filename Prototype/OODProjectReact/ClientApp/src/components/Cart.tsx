import React, { Component, FormEvent } from "react";
import { IProduct } from "./IProduct";
import SearchProduct from "./SearchProduct";
import { Table, Image, Header, Grid, Button, Icon, Radio, CheckboxProps, Label, Divider, Input, Dropdown } from "semantic-ui-react";
import { CartUtil } from "./utilities/CartUtil";
import { FetchUtil } from "./utilities/FetchUtil";
import { IGood } from "./Products";

interface IProductItem {
    product: IGood;
    quantity: number;
}

interface ILocalState {
    products: { [id: string]: IProductItem; };
    isSaleInvoice: boolean
}

export class Cart extends Component<{}, ILocalState> {
    getProductInfo = async (productId: string) => {
        const response = await FetchUtil.fetchFromUrl('/api/Inventory/get-good?id=' + productId)
        const good = (await response.json()) as IGood;
        return good;
    }

    async getCart(): Promise<{ [id: string]: IProductItem; }> {
        const storedCart = CartUtil.getCart();

        const cart: { [id: string]: IProductItem; } = {};
        for (const [productId, quantity] of Object.entries(storedCart)) {
            const product = await this.getProductInfo(productId);
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

    handleInvoiceTypeChange = (isSaleInvoice: boolean) => {
        this.setState({
            products: this.state.products,
            isSaleInvoice: isSaleInvoice
        });
    };

    getProductsInfo = async () => {
        var products = await this.getCart();

        var newState = (Object.assign(this.state)) as ILocalState;
        newState.products = products;

        this.setState(newState);
    };

    constructor(props: any) {
        super(props);
        this.state = {
            products: {},
            isSaleInvoice: false
        };

        this.getProductsInfo();
    }

    public render() {
        const products = this.state.products;
        const items: any[] = [];

        for (const product of Object.values(products)) {
            const minusIcon = product.quantity > 1 ?
                <Button icon circular onClick={() => this.decrementProductQuantity(String(product.product.id))}>
                    <Icon name="minus circle" color="red" size="large"></Icon>
                </Button>
                : [];
            items.push(
                <Table.Row>
                    <Table.Cell>
                        {product.product.sku}
                    </Table.Cell>
                    <Table.Cell>
                        {product.product.name}
                    </Table.Cell>
                    <Table.Cell>
                        {product.quantity}
                        <Button icon circular onClick={() => this.incrementProductQuantity(String(product.product.id))}>
                            <Icon name="plus circle" color="green" size="large"></Icon>
                        </Button>
                        {minusIcon}
                    </Table.Cell>
                    <Table.Cell>
                        {product.product.price + " تومان"}
                    </Table.Cell>
                    <Table.Cell>
                        {product.product.discount + " %"}
                    </Table.Cell>
                    <Table.Cell>
                        <Button icon circular onClick={() => this.removeProduct(String(product.product.id))}>
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
                        <Dropdown search options={[{ text: 'علی احمدی', value: '1' }]} selection icon="search" placeholder="نام مشتری"></Dropdown>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button.Group>
                            <Button color="teal" active={this.state.isSaleInvoice} onClick={() => this.handleInvoiceTypeChange(true)}>فاکتور فروش</Button>
                            <Button.Or text="یا" />
                            <Button color="teal" active={!this.state.isSaleInvoice} onClick={() => this.handleInvoiceTypeChange(false)}>فاکتور خرید</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Header as='h2'>
                        اقلام
                    </Header>
                    <Table color="teal" textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>شناسه</Table.HeaderCell>
                                <Table.HeaderCell>نام کالا</Table.HeaderCell>
                                <Table.HeaderCell>تعداد</Table.HeaderCell>
                                <Table.HeaderCell>قیمت</Table.HeaderCell>
                                <Table.HeaderCell>تخفیف</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items}
                        </Table.Body>
                    </Table>
                </Grid.Row>


                <Divider>

                </Divider>

                <Grid.Row>
                    <Grid.Column>
                        مجموع 82000 تومان
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Button color="purple" fluid>صدور فاکتور</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        );
    }

}
