import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Identity from './Identity';

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
        var user = Identity.getUser()
        this.setState({
            isAuthenticated = user.isAuthenticated,
            login = user.login,
            role = user.role
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
                <NavLink tag={Link} className="text-dark" to="/LogOut">Logout</NavLink>
            </NavItem>
        </Fragment>
        );
    }

    anonymousView() {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/Register">Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/LogIn">Login</NavLink>
            </NavItem>
        </Fragment>
        );        
    }
}