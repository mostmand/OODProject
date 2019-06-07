import React, { Component } from 'react'
import { Search, Grid, Header, Segment, SearchProps, SearchResultData } from 'semantic-ui-react'
import { IProduct } from './IProduct';

interface ILocalState {
    isLoading: boolean;
    results: IProduct[];
    value: string;
}

interface IProps {
    addProduct(productId: string): void;
}

const initialState: ILocalState = { isLoading: false, results: [], value: '' };

export default class SearchProduct extends Component<IProps, ILocalState> {
    constructor(props: IProps) {
        super(props);

        this.state = initialState;
    }

    handleResultSelect = (e: React.MouseEvent<HTMLElement, MouseEvent>, { result }: SearchResultData) => {
        const product = result as IProduct;
        this.props.addProduct(product.id);
    }

    handleSearchChange = async (e: React.MouseEvent<HTMLElement, MouseEvent>, { value }: SearchProps) => {
        if (value === undefined || value.length < 1) {
            this.setState(initialState);
            return;
        }

        this.setState({ isLoading: true, results: [], value: value })

        // const searchApi = '';
        // const response = await fetch(searchApi);
        // const results = await response.json() as IProduct[];

        const results: IProduct[] = [{
                id: '1',
                title: 'کالای تست',
                description: 'توضیحات',
                price: '۸۱ هزار تومان',
                image: 'Temp/152408.jpg'
            }
        ]

        this.setState({
            isLoading: false,
            results: results,
            value: value
        });
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Search 
            className="my-persian"
            fluid
                size="huge"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                {...this.props}
            />
        )
    }
}