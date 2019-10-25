import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import identity from './Identity';

export class AuthorizeMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            login: null,
            role: null,
            isAuthenticated: false
        }
        this.onLogout = this.onLogout.bind(this)
    }
    componentWillMount(){
        this._subscription = identity.subscribe(() => this.populateState());
        this.populateState();
    }
    async populateState() {
        const [isAuthenticated, login, role] = await Promise.all([identity._isAuthenticated, identity._login, identity._role])
        this.setState({
            isAuthenticated,
            login,
            role,
        });
    }
    render(){
        if (!this.state.isAuthenticated){
            return this.anonymousView();
        } else {
            return this.authenticatedView(this.state.login, this.state.role);
        }
    }
    componentWillUnmount() {
        identity.unsubscribe(this._subscription);
    }
    authenticatedView(userName, userRole) {
        let items
        switch (this.state.role) {
            case "Manager":
                items = this.managerView()
                break;
            default:;break;
        }
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="">Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="" onClick={this.onLogout}>Logout</NavLink>
            </NavItem>
            {items}
        </Fragment>
        );
    }

    managerView(){
        return(
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/List" >Управление заказами</NavLink>
            </NavItem>
        )
    }

    anonymousView() {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/Register">Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/authentication/Login">Login</NavLink>
            </NavItem>
        </Fragment>
        );        
    }
    onLogout(e){
        identity.LogOut()
    }
}