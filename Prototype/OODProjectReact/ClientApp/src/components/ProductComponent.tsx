import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

interface ILocalProps {
    name: string;
    price: string;
    imageUrl: string;
    productId: string;
}

export class GoodComponent extends Component<ILocalProps, {}> {
    constructor(props: ILocalProps) {
        super(props);
    }

    public render() {
        return (
            <div>
                <Card>
                    <Image alt="loading..." src={this.props.imageUrl}></Image>
                    <Card.Header>
                        <p>{this.props.name}</p>
                    </Card.Header>
                    <Card.Content>
                        <p>{this.props.price}</p>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}
