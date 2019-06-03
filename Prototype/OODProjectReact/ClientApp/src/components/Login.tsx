import React from "react";
import { FetchUtil } from "./utilities/FetchUtil";
import { CookieUtil } from "./utilities/CookieUtil";
import { Container, Header, Message, Form, Label, Button, Input, Segment, Grid } from "semantic-ui-react";

interface IProps {
    loggedIn: boolean;
}

interface ILocalState {
    loginFailed: boolean;
}

export default class LoginPage extends React.Component<IProps, ILocalState>{
    userName: React.RefObject<any>;
    password: React.RefObject<any>;
    signInButton: React.RefObject<any>;

    constructor(props: IProps) {
        super(props);
        this.userName = React.createRef();
        this.password = React.createRef();
        this.signInButton = React.createRef();
        this.state = {
            loginFailed: false
        }
    }

    submit = () => {
        if (this.userName.current === null || this.password.current === null) {
            throw 'Username or password is undefined';
        }
        const url = '/api/accounts/login/';
        const body = {
            'username': this.userName.current.value,
            'password': this.password.current.value
        };

        FetchUtil.postToUrl(url, body)
            .then(response => {
                CookieUtil.setCookie('logintoken', response.token, 10);
                window.location.replace('/');
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loginFailed: true
                });
            });
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
                                                <Input fluid type="text" id="username" ref={this.userName} onKeyUp={this.handleEnter} />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1} centered>
                                        <Grid.Column textAlign="right">
                                            <Form.Field>
                                                <Label basic color="teal" htmlFor="password">رمز عبور</Label>
                                                <Input fluid type="password" id="password" ref={this.password} onKeyUp={this.handleEnter} />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={1} centered>
                                        <Grid.Column>
                                            <Button fluid color="teal" className="no-margin-btn" ref={this.signInButton} onClick={this.submit}>ورود</Button>
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
            this.signInButton.current.click();
        }
    };
}