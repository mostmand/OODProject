import React, { Component, FormEvent } from "react";
import { IProduct } from "./IProduct";
import SearchProduct from "./SearchProduct";
import { Table, Image, Header, Grid, Button, Icon, Radio, CheckboxProps, Label, Divider, Input, Dropdown, DropdownItemProps } from "semantic-ui-react";
import { CartUtil } from "./utilities/CartUtil";
import { FetchUtil } from "./utilities/FetchUtil";
import { IGood } from "./Products";

interface IProductItem {
    product: IGood;
    quantity: number;
}

interface ISearchResult {
    name: string;
    id: string;
}

interface ICustomer {
    id: number,
    name: string;
    phoneNumber: string;
}

interface ISupplier {
    id: number,
    name: string;
    phoneNumber: string;
}

interface ILocalState {
    products: { [id: string]: IProductItem; };
    isSaleInvoice: boolean;
    searchKeyword: string;
    searchResult: ISearchResult[];
    selectedCustomerId: string;
}

interface IInvoice {
    items: IInvoiceItem[];
    tarafHesabId: number;
}

interface IInvoiceItem {
    goodId: number;
    quantity: number;
}

interface IProps {
    history: any;
}

export class Cart extends Component<IProps, ILocalState> {
    createPurchaseInvoice = async () => {
        var invoice: IInvoice = {
            items: [],
            tarafHesabId: parseInt(this.state.selectedCustomerId)
        };
        for (const product of Object.values(this.state.products)) {
            invoice.items.push({
                goodId: product.product.id,
                quantity: product.quantity
            })
        }
        var response = await FetchUtil.postToUrl('/api/Accounting/create-purchase-invoice', invoice);
        var invoiceId: number = await response.json();

        this.props.history.push('/purchase-invoice?id=' + invoiceId);
    }
    createSaleInvoice = async () => {
        var invoice: IInvoice = {
            items: [],
            tarafHesabId: parseInt(this.state.selectedCustomerId)
        };
        for (const product of Object.values(this.state.products)) {
            invoice.items.push({
                goodId: product.product.id,
                quantity: product.quantity
            })
        }
        var response = await FetchUtil.postToUrl('/api/Accounting/create-sale-invoice', invoice);
        var invoiceId: number = await response.json();

        this.props.history.push('/sale-invoice?id=' + invoiceId);
    }
    getProductInfo = async (productId: string) => {
        const response = await FetchUtil.fetchFromUrl('/api/Inventory/get-good?id=' + productId)
        const good = (await response.json()) as IGood;
        return good;
    }

    createInvoice = (event: any, data: any) => {
        if (this.state.selectedCustomerId === "0") {
            return;
        }
        if (this.state.isSaleInvoice) {
            this.createSaleInvoice();
        } else {
            this.createPurchaseInvoice();
        }
    };

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

        var newState = Object.assign(this.state) as ILocalState;
        newState.products = products;

        this.setState(newState);
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

    search = async () => {
        if (!this.state.isSaleInvoice) {
            var result = await FetchUtil.fetchFromUrl('/api/Club/get-supplier?keyword=' + this.state.searchKeyword);
            var data = await result.json() as ISupplier[];
            var newState = Object.assign(this.state) as ILocalState;
            var searchResult: ISearchResult[] = [];
            data.forEach(supplier => {
                searchResult.push({
                    id: String(supplier.id),
                    name: supplier.name + " شماره تلفن:‌ " + supplier.phoneNumber
                });
            });
            newState.searchResult = searchResult;
            this.setState(newState);
        } else {
            var result = await FetchUtil.fetchFromUrl('/api/Club/get-customer?keyword=' + this.state.searchKeyword);
            var data = await result.json() as ICustomer[];
            var newState = Object.assign(this.state) as ILocalState;
            var searchResult: ISearchResult[] = [];
            data.forEach(customer => {
                searchResult.push({
                    id: String(customer.id),
                    name: customer.name + " شماره تلفن:‌ " + customer.phoneNumber
                });
            });
            newState.searchResult = searchResult;
            this.setState(newState);
        }
    }

    constructor(props: any) {
        super(props);
        this.state = {
            products: {},
            isSaleInvoice: false,
            searchResult: [],
            searchKeyword: '',
            selectedCustomerId: "0"
        };

        this.getProductsInfo();
    }

    public render() {
        const products = this.state.products;
        const items: any[] = [];

        var sum = 0;

        for (const product of Object.values(products)) {
            const minusIcon = product.quantity > 1 ?
                <Button icon circular onClick={() => this.decrementProductQuantity(String(product.product.id))}>
                    <Icon name="minus circle" color="red" size="large"></Icon>
                </Button>
                : [];

            const thisProductPrice = Math.trunc(product.product.price * (100 - product.product.discount) / 100) * product.quantity;
            sum += thisProductPrice;
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
                        {thisProductPrice + " تومان"}
                    </Table.Cell>
                    <Table.Cell>
                        <Button icon circular onClick={() => this.removeProduct(String(product.product.id))}>
                            <Icon name="remove circle" color="red" size="large"></Icon>
                        </Button>
                    </Table.Cell>
                </Table.Row>
            );
        }

        var searchOptions: DropdownItemProps[] = [];
        this.state.searchResult.forEach(element => {
            searchOptions.push({
                text: element.name,
                value: element.id
            });
        });

        return (
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column width={11}>
                        <Dropdown search options={searchOptions} value={this.state.searchKeyword} scrolling selection icon="search" placeholder={!this.state.isSaleInvoice ? "نام تأمین‌کننده" : "نام مشتری"}
                            onSearchChange={
                                (event, data) => {
                                    var state: ILocalState = Object.assign(this.state);
                                    state.searchKeyword = data.value as string;
                                    this.setState(state);
                                    this.search();
                                }
                            }
                            onChange={
                                (event, data) => {
                                    var state: ILocalState = Object.assign(this.state);
                                    state.selectedCustomerId = data.value as string;
                                    this.setState(state);
                                }
                            }
                        ></Dropdown>
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
                                <Table.HeaderCell>قیمت واحد</Table.HeaderCell>
                                <Table.HeaderCell>تخفیف</Table.HeaderCell>
                                <Table.HeaderCell>قیمت کل</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
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

                                </Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                                <Table.Cell>
                                    {sum + " تومان"}
                                </Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Button color="purple" fluid onClick={this.createInvoice}>صدور فاکتور</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid >
        );
    }
}
