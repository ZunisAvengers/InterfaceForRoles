import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from './Identity'

export class AuthorizeRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            authenticated: false
        };
    }

    componentDidMount() {
        this.populateAuthenticationState();
    }

    render() {
        const { ready, authenticated } = this.state;
        const redirectUrl = '/LogIn'
        if (!ready) {
            return <div></div>;
        } else {
            const { component: Component, ...rest } = this.props;
            return <Route {...rest}
                render={(props) => {
                    if (authenticated) {
                        return <Component {...props} />
                    } else {
                        return <Redirect to={redirectUrl} />
                    }
                }} />
        }
    }

    async populateAuthenticationState() {
        const authenticated = authService.getUser();
        this.setState({ ready: true, authenticated: authenticated.isAuthenticated });
    }

    async authenticationChanged() {
        this.setState({ ready: false, authenticated: false });
        this.populateAuthenticationState();
    }
}
