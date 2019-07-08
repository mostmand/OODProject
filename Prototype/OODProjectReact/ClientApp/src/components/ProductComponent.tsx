import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface ILocalProps {
    name: string;
    price: number;
    description: string;
    qunatity: number;
    // imageUrl: string;
    productId: number;
}

export class GoodComponent extends Component<ILocalProps, {}> {
    constructor(props: ILocalProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Card as={Link} to={'/product?id=' + this.props.productId}>
                    {/* <Image alt="loading..." src={this.props.imageUrl}></Image> */}
                    <Card.Header>
                        <p>{this.props.name}</p>
                    </Card.Header>
                    <Card.Content>
                        <p>{this.props.price}</p>
                    </Card.Content>
                    <Card.Content>
                        <p>{this.props.description}</p>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
