import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './Identity';

export class AuthorizeMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            login: null,
            role: null,
            isAuthenticated: false
        }
    }
    componentWillMount(){
        //var user = authService.getUser()
        this.setState({
            isAuthenticated: authService.isAuthenticated,
            login: authService.login,
            role: authService.role
        });
    }
    render(){
        if (!this.state.isAuthenticated){
            return this.anonymousView();
        } else {
            return this.authenticatedView(this.state.login, this.state.role);
        }
    }

    authenticatedView(userName, userRole) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/user-profile">Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to='/LogOut'>Logout</NavLink>
            </NavItem>
        </Fragment>
        );
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
}