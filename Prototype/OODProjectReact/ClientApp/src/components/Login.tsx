import React from "react";
import { FetchUtil } from "./utilities/FetchUtil";
import { CookieUtil } from "./utilities/CookieUtil";
import { Container, Header, Message, Form, Label, Button, Input, Segment, Grid, InputOnChangeData } from "semantic-ui-react";

interface IProps {
    loggedIn: boolean;
}

interface ILocalState {
    loginFailed: boolean;
    username: string;
    password: string;
}

export default class LoginPage extends React.Component<IProps, ILocalState>{
    passwordChanged = (event: any, data: InputOnChangeData) => {
        var state: ILocalState = Object.assign(this.state);
        state.password = data.value;
        this.setState(state);
    };
    usernameChanged = (event: any, data: InputOnChangeData) => {
        var state: ILocalState = Object.assign(this.state);
        state.username = data.value;
        this.setState(state);
    };
    constructor(props: IProps) {
        super(props);
        this.state = {
            loginFailed: false,
            username: '',
            password: ''
        }
    }

    submit = async () => {
        const url = '/api/login/';
        const body = {
            'username': this.state.username,
            'password': this.state.password
        };

        try {
            var response = await FetchUtil.postToUrl(url, body);
            var data = await response.json();
            if (data != null) {
                CookieUtil.setCookie('logintoken', data, 10);
                window.location.replace('/');
            }
            else {
                var state: ILocalState = Object.assign(this.state);
                state.loginFailed = true;
                this.setState(state);
            }
        }
        catch (err) {
            console.log(err);
            this.setState({
                loginFailed: true
            });
        }
    };

    render() {
        if (this.props.loggedIn)
            window.location.replace('/');
        let loginState = <p />;
        if (this.state.loginFailed)
            loginState = <Message error content="نام کاربری یا رمز عبور اشتباه است" />;
        return (
            <Grid textAlign="center">
                <Grid.Row columns={1} textAlign="right">
                    <Grid.Column width={6}>
                        <Segment color="teal">
                            <Header>
                                ورود
                            </Header>
                            {loginState}

                            <Form>
                                <Grid>
                                    <Grid.Row columns={1} centered>
                                        <Grid.Column textAlign="right">
                                            <Form.Field>
                                                <Label basic color="teal" htmlFor="username">نام کاربری</Label>
                                                <Input fluid type="text" id="username" onChange={this.usernameChanged} onKeyUp={this.handleEnter} />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1} centered>
                                        <Grid.Column textAlign="right">
                                            <Form.Field>
                                                <Label basic color="teal" htmlFor="password">رمز عبور</Label>
                                                <Input fluid type="password" id="password" onChange={this.passwordChanged} onKeyUp={this.handleEnter} />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1} centered>
                                        <Grid.Column>
                                            <Button fluid color="teal" className="no-margin-btn" onClick={this.submit}>ورود</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            this.submit();
        }
    };
}