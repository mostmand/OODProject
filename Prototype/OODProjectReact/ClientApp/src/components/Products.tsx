import React, { Component, RefObject, createRef, ReactNode, ChangeEvent } from "react";
import { CartUtil } from "./utilities/CartUtil";
import SearchProduct from "./SearchProduct";
import { Container, Grid, Label, Icon, Segment, Header, Input, InputOnChangeData } from "semantic-ui-react";
import { CategoriesAccordion } from "./CategoriesAccordion";
import { ICategory } from "./ICategory";
import { ITag } from "./ITag";
import { GoodComponent } from "./ProductComponent";
import { FetchUtil } from "./utilities/FetchUtil";
import { GoodList } from "./GoodList";

interface ILocalState {
    tags: ITag[];
    products: IGood[];
    searchKeyword: string;
}

export interface IGood {
    id: number;
    sku: string;
    name: string;
    price: number;
    quantity: number;
    discount: number;
    explanation: string;
    categoryIds: number[];
}

export class Products extends Component<{}, ILocalState>{
    search = async () => {
        const url = '/api/Inventory/get-all-goods?from=0&size=100&keyword=' + this.state.searchKeyword;
        var response = await FetchUtil.postToUrl(url, []);
        var data = await response.json();

        var newState = Object.assign(this.state) as ILocalState;
        newState.products = data.map((element: any) => element as IGood);
        this.setState(newState);
    }

    addTag = (tag: ITag) => {
        const tags = this.state.tags;
        if (!tags.map(x => x.tagId).includes(tag.tagId)) {
            const newTags = Object.assign(tags) as ITag[];
            newTags.push({
                name: tag.name,
                tagId: tag.tagId
            });

            var newState = Object.assign(this.state) as ILocalState;

            newState.tags = newTags;

            this.setState(newState);
        }
    };

    removeTag = (tagId: string) => {
        const tags = this.state.tags;
        if (tags.map(x => x.tagId).includes(tagId)) {
            var newTags = Object.assign(tags) as ITag[];
            newTags = newTags.filter(x => x.tagId !== tagId);

            this.setState({ tags: newTags });
        }
    };
    handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            this.search();
        }
    };
    changeSearchKeyword = (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        var newState = Object.assign(this.state) as ILocalState;
        newState.searchKeyword = data.value!;
        this.setState(newState);
    }

    constructor(props: {}) {
        super(props);
        this.state = {
            tags: [],
            products: [],
            searchKeyword: ''
        }

        this.search();
    }

    render() {
        const categories: ICategory[] = [
            {
                categoryId: '1',
                name: 'دیجیتال',
                subCategories: [
                    {
                        categoryId: '2',
                        name: 'موبایل',
                        subCategories: [
                            {
                                categoryId: '3',
                                name: 'گوشی هوشمند',
                                subCategories: []
                            },
                            {
                                categoryId: '4',
                                name: 'گوشی غیر هوشمند',
                                subCategories: []
                            }
                        ]
                    },
                    {
                        categoryId: '5',
                        name: 'تبلت',
                        subCategories: [
                            {
                                categoryId: '6',
                                name: 'اپل',
                                subCategories: []
                            },
                            {
                                categoryId: '7',
                                name: 'سامسونگ',
                                subCategories: []
                            }
                        ]
                    }
                ]
            },
            {
                categoryId: '8',
                name: 'لوازم خانگی',
                subCategories: [
                    {
                        categoryId: '9',
                        name: 'تلویزیون',
                        subCategories: [
                            {
                                categoryId: '10',
                                name: 'ال‌ای‌دی',
                                subCategories: []
                            },
                            {
                                categoryId: '11',
                                name: 'ال‌سی‌دی',
                                subCategories: []
                            }
                        ]
                    },
                    {
                        categoryId: '12',
                        name: 'یخچال',
                        subCategories: [
                            {
                                categoryId: '13',
                                name: 'الجی',
                                subCategories: []
                            },
                            {
                                categoryId: '14',
                                name: 'سامسونگ',
                                subCategories: []
                            }
                        ]
                    }
                ]
            }
        ];

        const tags: ReactNode[] = [];

        this.state.tags.forEach(tag => {
            tags.push(
                <Label color="red" tag key={tag.tagId}>
                    <Icon name='delete' onClick={() => this.removeTag(tag.tagId)} />
                    {tag.name}
                </Label>
            );
        });

        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column verticalAlign="middle" textAlign="center">
                        {<Input search icon="search" placeholder="جستجو" onKeyDown={this.handleKeyDown} onChange={this.changeSearchKeyword}></Input>}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Label.Group>
                            {tags}
                        </Label.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <CategoriesAccordion onAddClick={this.addTag} categories={categories}></CategoriesAccordion>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment>
                            <Header size="large">
                                کالاهای یافت‌شده
                            </Header>
                            {<GoodList goods={Object.assign(this.state.products)}></GoodList>}
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}