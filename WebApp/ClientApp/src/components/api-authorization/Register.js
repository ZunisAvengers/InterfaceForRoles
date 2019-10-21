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
        this.onLogin = this.onLogin.bind(this),
        this.onFirstName = this.onFirstName.bind(this)
        this.onLastName = this.onLastName.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.onConfirmPassword = this.onConfirmPassword.bind(this)
        this.onPhone = this.onPhone.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e){
        const response = await fetch('api/identity/Reg',{
            method:"POST",
            body: JSON.stringify({
                "login":this.state.login,
                "password":this.state.password,
                "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "phone":this.state.phone,
                })
        });
        const data = await response.json();
        this.setState({Completed:true})
        authService.onLogIn(data);
    }
    render(){

        return(
            <h2>Регистрация</h2>
            
        );
    }
    static renderRegistrationForm(e){
        // firstNameAlert = e.state.firstNameValid === true ? "" : "Укажите ваше Имя";
        // lastNameAlert = e.state.lastNameValid === true ? "" : "Укажите вашу Фамилию";
        // loginAlert = e.state.loginValid === true ? "" : "Укажите ваш Логин";
        // passwordAlert = e.state.passwordValid === true ? "" : "Укажите ваш Пароль";
        // confirmPasswordAlert = e.state.confirmPasswordValid === true ? "" : "Пароли не совпадают";
        // phoneAlert = e.state.phoneValid === true ? "" : "Укажите ваш Номер телефона";

        return(<form  onSubmit={e.handleSubmit}>
            <div className="form-group">
                <label className="control-label">Укажите ваше Имя:</label>
                <input type="text" className="form-control"  value={e.state.firstName} onChange={e.onFirstName}/>
                <span className="text-danger">{firstNameAlert}</span>
            </div>
            <div className="form-group">
                <label className="control-label">Укажите вашу Фамилию:</label>
                <input type="text" className="form-control"  value={e.state.lastName} onChange={e.onLastName}/>
                <span className="text-danger">{lastNameAlert}</span>
            </div>
            <div className="form-group">
                <label className="control-label">Укажите ваш Логин:</label>
                <input type="text" className="form-control"  value={e.state.login} onChange={e.onLogin}/>
                <span className="text-danger">{loginAlert}</span>
            </div>
            <div className="form-group">
                <label className="control-label">Укажите ваш Номер телефона:</label>
                <input type="text" className="form-control"  value={e.state.phone} onChange={e.onPhone}/>
                <span className="text-danger">{passwordAlert}</span>
            </div>
            <div className="form-group">
                <label className="control-label">Укажите ваш Пароль:</label>
                <input type="password" className="form-control"  value={e.state.password} onChange={e.onPassword}/>
                <span className="text-danger">{passwordAlert}</span>
            </div>
            <div className="form-group">
                <label className="control-label">Повторите ваш Пароль:</label>
                <input type="password" className="form-control"  value={e.state.confirmPassword} onChange={e.onConfirmPassword}/>
                <span className="text-danger">{confirmPasswordAlert}</span>
            </div>
            <input type="submit" value="Зарегистрироваться"/>
        </form>)
    }
}