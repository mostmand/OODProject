import React, { Component } from "react";
import { Grid, Card } from "semantic-ui-react";

interface IProps {
    userId: string;
}

interface ILocalState {
    name: string;
}

export class UserInfo extends Component<IProps, ILocalState>{
    constructor(props: IProps) {
        super(props);

        this.state = {
            name: "کاربر تست" //TODO Replace hardcode with api call
        }
    }

    render() {
        return (
            <Card>
                <Card
                    // image='/images/avatar/large/elliot.jpg'
                    header={this.state.name}
                // meta='Friend'
                // description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                // extra={extra}
                />
            </Card>
        );
    }
}