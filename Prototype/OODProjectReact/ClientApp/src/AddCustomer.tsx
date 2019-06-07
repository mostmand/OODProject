import React, { Component } from "react";
import { Segment, Header, Form, Grid, Input, Button, Divider, Radio, CheckboxProps } from "semantic-ui-react";


interface ILocalState {
    email: string;
    nationalIdCode: string;
    mobileNumber: string;
    name: string;
    lastName: string;
    isLegalPerson: boolean;
}

const initialState: ILocalState = {
    email: '',
    name: '',
    nationalIdCode: '',
    lastName: '',
    mobileNumber: '',
    isLegalPerson: false
}

export class AddCustomer extends Component<{}, ILocalState> {
    constructor(props: any) {
        super(props);

        this.state = initialState;
    }

    public render() {
        return (
            <Segment color="teal">
                <Header>
                    افزودن مشتری
                </Header>
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Form.Field>
                                <Radio label="شخص حقوقی" toggle type="radio" checked={this.state.isLegalPerson} onChange={(event, data: CheckboxProps) => {
                                    var state: ILocalState = Object.assign(this.state);
                                    state.isLegalPerson = data.checked!;
                                    this.setState(state);
                                }}>
                                </Radio>
                            </Form.Field>

                        </Grid.Row>
                        <Grid.Row columns={this.state.isLegalPerson ? 2 : 3}>
                            <Grid.Column width={this.state.isLegalPerson ? 8 : 5}>
                                <Form.Field>
                                    <label>نام</label>
                                    <Input
                                        type="text" value={this.state.name} onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.name = data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column>

                            {!this.state.isLegalPerson ? <Grid.Column width={5}>
                                <Form.Field>
                                    <label>نام خانوادگی</label>
                                    <Input type="text" value={this.state.lastName} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.lastName = data.value;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                                </Grid.Column> : [] }

                            <Grid.Column width={this.state.isLegalPerson ? 8 : 6}>
                                <Form.Field>
                                    <label>ایمیل</label>
                                    <Input type="email" value={this.state.email}
                                        onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.email = data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={this.state.isLegalPerson ? 1 : 2}>
                            {!this.state.isLegalPerson ? <Grid.Column>
                                <Form.Field>
                                    <label>کد ملی</label>
                                    <Input type="text" value={this.state.nationalIdCode}
                                        onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.nationalIdCode = data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column> : []}
                            <Grid.Column>
                                <Form.Field required>
                                    <label>شماره تلفن همراه</label>
                                    <Input type="text" value={this.state.mobileNumber}
                                        placeholder="9131234567"
                                        onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.mobileNumber = data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column className="ltr">
                                <Button color="green" size="large" fluid>
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