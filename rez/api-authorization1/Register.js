import React, { Component } from 'react';
import authService from './Identity'

export class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName:"",
            lastName:"",
            login:"",
            password:"",
            confirmPassword:"",
            phone:"",
            firstNameValid:false,
            lastNameValid:false,
            loginValid:false,
            passwordValid:false,
            confirmPasswordValid:false,
            phoneValid:false
        }
        this.onLogin = this.onLogin.bind(this)
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.onConfirmPassword = this.onConfirmPassword.bind(this)
        this.onPhone = this.onPhone.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e){
        e.preventDefault()
        const response = await fetch('api/identity/Reg',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "login":this.state.login,
                "password":this.state.password,
                "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "phone":this.state.phone,
                })
        });
        const data = await response.json();
        console.log(data)
        //this.setState({Completed:true})
        //authService.onLogIn(data);
    }
    static passwordIsValid(password){
        return password > 5
    }
    static confirmPasswordIsValid(password, confirmPassword){
        return password === confirmPassword
    }
    onLogin(e){
        var login = e.target.value
        this.setState({login: login})
    }
    onFirstName(e){
        this.setState({firstName: e.target.value})
    }
    onLastName(e){
        this.setState({lastName: e.target.value})
    }
    onPassword(e){
        var password = e.target.value,
        valid = Register.passwordIsValid(password)
        this.setState({password: password, passwordValid: valid})
    }
    onConfirmPassword(e){
        var confirmPassword = e.target.value,
        valid = Register.confirmPasswordIsValid(this.setState.password, confirmPassword)
        this.setState({confirmPassword: confirmPassword, confirmPasswordValid: valid})
    }
    onPhone(e){
        this.setState({phone: e.target.value})
    }
    render(){
        var firstNameAlert = this.state.firstNameValid === true ? "" : "Укажите ваше Имя",
        lastNameAlert = this.state.lastNameValid === true ? "" : "Укажите вашу Фамилию",
        loginAlert = this.state.loginValid === true ? "" : "Укажите ваш Логин",
        passwordAlert = this.state.passwordValid === true ? "" : "Укажите ваш Пароль",
        confirmPasswordAlert = this.state.confirmPasswordValid === true ? "" : "Пароли не совпадают",
        phoneAlert = this.state.phoneValid === true ? "" : "Укажите ваш Номер телефона";

        return(
        <div className="row"> 
            <form  onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label">Укажите ваше Имя:</label>
                    <input type="text" className="form-control"  value={this.state.firstName} onChange={this.onFirstName}/>
                    <span className="text-danger">{firstNameAlert}</span>
                </div>
                <div className="form-group">
                    <label className="control-label">Укажите вашу Фамилию:</label>
                    <input type="text" className="form-control"  value={this.state.lastName} onChange={this.onLastName}/>
                    <span className="text-danger">{lastNameAlert}</span>
                </div>
                <div className="form-group">
                    <label className="control-label">Укажите ваш Логин:</label>
                    <input type="text" className="form-control"  value={this.state.login} onChange={this.onLogin}/>
                    <span className="text-danger">{loginAlert}</span>
                </div>
                <div className="form-group">
                    <label className="control-label">Укажите ваш Номер телефона:</label>
                    <input type="text" className="form-control"  value={this.state.phone} onChange={this.onPhone}/>
                    <span className="text-danger">{phoneAlert}</span>
                </div>
                <div className="form-group">
                    <label className="control-label">Укажите ваш Пароль:</label>
                    <input type="password" className="form-control"  value={this.state.password} onChange={this.onPassword}/>
                    <span className="text-danger">{passwordAlert}</span>
                </div>
                <div className="form-group">
                    <label className="control-label">Повторите ваш Пароль:</label>
                    <input type="password" className="form-control"  value={this.state.confirmPassword} onChange={this.onConfirmPassword}/>
                    <span className="text-danger">{confirmPasswordAlert}</span>
                </div>
                <input type="submit" value="Зарегистрироваться"/>
            </form>
        </div>
            )
    }
}