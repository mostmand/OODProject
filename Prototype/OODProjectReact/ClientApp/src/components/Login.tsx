import React from "react";
import { FetchUtil } from "./utilities/FetchUtil";
import { CookieUtil } from "./utilities/CookieUtil";
import { Container, Header, Message, Form, Label, Button, Input, Segment } from "semantic-ui-react";

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
            <Segment>
                <Header>
                    ورود
                </Header>
                {loginState}

                <Form>
                    <Form.Field>
                        <Label htmlFor="username">نام کاربری</Label>
                        <Input type="text" id="username" ref={this.userName} onKeyUp={this.handleEnter} />
                    </Form.Field>
                    <Form.Field>
                        <Label htmlFor="password">رمز عبور</Label>
                        <Input type="password" id="password" className="form-control" ref={this.password} onKeyUp={this.handleEnter} />
                    </Form.Field>

                    <Button className="button btn my-button" ref={this.signInButton} onClick={this.submit}>ورود</Button>
                </Form>
            </Segment>
        );
    }

    handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.keyCode === 13) {
            this.signInButton.current.click();
        }
    };
}