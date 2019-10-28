import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import identity from './Identity'

export class AuthorizeRotePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ready: false,
            authenticated: false
        };
    }

    componentDidMount() {
        this._subscription = identity.subscribe(() => this.authenticationChanged());
        this.populateAuthenticationState();
    }

    componentWillUnmount() {
        //identity.unsubscribe(this._subscription);
    }

    render() {
        const { ready, authenticated } = this.state;
        const redirectUrl = `/authentication/Login`
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
        const authenticated = await identity._isAuthenticated
        this.setState({ ready: true, authenticated });
    }

    async authenticationChanged() {
        this.setState({ ready: false, authenticated: false });
        await this.populateAuthenticationState();
    }
}
