import React, { Component } from "react";
import { Segment, Form, Label, Input, TextArea, Grid, Button, Divider, Header } from "semantic-ui-react";
import { CategoryInput } from "./CategoryInput";
import { ITag } from "./ITag";
import { FetchUtil } from "./utilities/FetchUtil";
import { number } from "prop-types";
import queryString from 'query-string'

interface ILocalState {
    id: number;
    name: string;
    sku: string;
    price: number;
    discount: number;
    quantity: number;
    description: string;
    categoryIds: string[];
}

const testCategories: ITag[] = [
    {
        tagId: '1',
        name: 'دیجیتال'
    },
    {
        tagId: '2',
        name: 'موبایل'
    },
    {
        tagId: '3',
        name: 'گوشی هوشمند',
    },
    {
        tagId: '4',
        name: 'گوشی غیر هوشمند',
    },
    {
        tagId: '5',
        name: 'تبلت'
    },
    {
        tagId: '6',
        name: 'اپل'
    },
    {
        tagId: '7',
        name: 'سامسونگ'
    },
    {
        name: 'لوازم خانگی',
        tagId: '8'
    },
    {
        tagId: '9',
        name: 'تلویزیون'
    },
    {
        tagId: '10',
        name: 'ال‌ای‌دی',
    },
    {
        tagId: '11',
        name: 'ال‌سی‌دی'
    },
    {
        tagId: '12',
        name: 'یخچال'
    },
    {
        tagId: '13',
        name: 'الجی'
    },
    {
        tagId: '14',
        name: 'سامسونگ'
    }
];

const initialState: ILocalState = {
    id: 0,
    name: '',
    price: 0,
    discount: 0,
    categoryIds: [],
    description: '',
    quantity: 0,
    sku: ''
};

interface IGood {
    Id: number;
    Sku: string;
    Name: string;
    Price: number;
    Quantity: number;
    Discount: number;
    Explanation: string;
    CategoryIds: number[];
}

interface IProps {
    history: any;
}

export class EditProduct extends Component<IProps, ILocalState> {
    editProduct = async (event: any, data: any) => {
        var good: IGood = {
            Id: this.state.id,
            Sku: this.state.sku,
            Name: this.state.name,
            Price: this.state.price,
            Quantity: this.state.quantity,
            Explanation: this.state.description,
            Discount: this.state.discount,
            CategoryIds: this.state.categoryIds.map(Number)
        };
        var response = await FetchUtil.postToUrl('/api/Warehouse/edit-good', good);
        this.props.history.push("/products");
    };

    constructor(props: any) {
        super(props);


        const value = queryString.parse(props.location.search);
        const id = value.id;

        if (!id) {
            throw new Error("Id cannot be undefined");
        }

        initialState.id = parseInt(id as string);
        this.state = initialState;

        this.fetchProductInfo();
    }

    fetchProductInfo = async () => {
        const id = this.state.id;

        var response = await FetchUtil.fetchFromUrl("/api/Warehouse/get-good?id=" + id);
        var data = await response.json();

        var newState: ILocalState = {
            id: this.state.id,
            name: data.name,
            sku: data.sku,
            categoryIds: data.categoryIds,
            description: data.explanation,
            discount: data.discount,
            price: data.price,
            quantity: data.quantity
        };

        this.setState(newState);

    }

    public render() {
        return (
            <Segment color="teal">
                <Header>
                    افزودن کالا
                </Header>
                <Form>
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column textAlign="right" width={12}>
                                <Form.Field required>
                                    <label>نام کالا</label>
                                    <Input type="text" className="rtl" value={this.state.name} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.name = data.value;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                <Form.Field required>
                                    <label>شناسه‌ی SKU</label>
                                    <Input type="text" value={this.state.sku} disabled />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>قیمت</label>
                                    <Input label={{ basic: true, content: 'تومان' }}
                                        labelPosition="right"
                                        type="number" min={0} step={1} value={this.state.price} onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.price = +data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column>

                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>تعداد</label>
                                    <Input type="number" min={0} step={1} value={this.state.quantity} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.quantity = +data.value;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                            </Grid.Column>

                            <Grid.Column width={6}>
                                <Form.Field>
                                    <label>تخفیف</label>
                                    <Input type="number" min={0} max={100} step={1} value={this.state.discount}
                                        label={{ basic: true, content: 'درصد' }}
                                        labelPosition="right" onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.discount = +data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Form.Field>
                                    <label>توضیحات</label>
                                    <TextArea value={this.state.description} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.description = data.value as string;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>گروه‌ها</label>
                                    <CategoryInput onChange={(data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.categoryIds = data;
                                        this.setState(state);
                                    }} allCategories={testCategories} initialSelectedCategories={this.state.categoryIds} />
                                </Form.Field>

                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column className="ltr">
                                <Button color="green" size="large" fluid onClick={this.editProduct}>
                                    ذخیره
                            </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Segment>
        );
    }
}