import React, { Component } from "react";
import { Segment, Header, Form, Grid, Input, Button, Divider } from "semantic-ui-react";


interface ILocalState {
    username: string;
    password: string;
    email: string;
    nationalIdCode: string;
    mobileNumber: string;
    name: string;
    lastName: string;
}

const initialState: ILocalState = {
    username: '',
    password: '',
    email: '',
    name: '',
    nationalIdCode: '',
    lastName: '',
    mobileNumber: ''
}

export class AddCashier extends Component<{}, ILocalState> {
    constructor(props: any) {
        super(props);

        this.state = initialState;
    }

    public render() {
        return (
            <Segment color="teal">
                <Header>
                    افزودن صندوق‌دار
            </Header>
                <Form>
                    <Grid>
                        <Grid.Row columns={8}>
                            <Grid.Column textAlign="right" width={8}>
                                <Form.Field required>
                                    <label>نام کاربری</label>
                                    <Input type="text" className="rtl" value={this.state.username} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.username = data.value;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                            </Grid.Column>

                            <Grid.Column width={8}>
                                <Form.Field required>
                                    <label>رمز عبور</label>
                                    <Input type="password" value={this.state.password} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.password = data.value;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>

                        <Divider></Divider>

                        <Grid.Row>
                            <Grid.Column width={5}>
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

                            <Grid.Column width={5}>
                                <Form.Field>
                                    <label>نام خانوادگی</label>
                                    <Input type="text" value={this.state.lastName} onChange={(event, data) => {
                                        var state: ILocalState = Object.assign(this.state);
                                        state.lastName = data.value;
                                        this.setState(state);
                                    }} />
                                </Form.Field>
                            </Grid.Column>

                            <Grid.Column width={6}>
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

                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Form.Field>
                                    <label>کد ملی</label>
                                    <Input type="text" value={this.state.nationalIdCode}
                                        onChange={(event, data) => {
                                            var state: ILocalState = Object.assign(this.state);
                                            state.nationalIdCode = data.value;
                                            this.setState(state);
                                        }} />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Field>
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