import React, { Component } from 'react';
import identity from './Identity'

export class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            login: "",
            password: "",
            loginValid: false,
            passwordValid: false,
            userValid: true,
            Completed: false
        }
        this.onLogin = this.onLogin.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e){
        e.preventDefault()
        if (this.state.loginValid === true && this.state.passwordValid === true){
            var data={
                login: this.state.login,
                password: this.state.password
            }
            var status = await identity.logIn(data);
            if (status === 404){
                this.setState({userValid:false})    
            }else{
                this.setState({Completed:true})
            }            
        }
    }
    validateLogin(login){
        return login.length > 5
    }
    validatePassword(password){
        return password.length > 5
    }
    onLogin(e){
        var login = e.target.value
        var valid = this.validateLogin(login)
        this.setState({login: login, loginValid: valid})
    }
    onPassword(e){
        var password = e.target.value
        var valid = this.validatePassword(password)
        this.setState({password: password, passwordValid: valid})
    }
    renderLogInForm(){
        var loginAlert = this.state.loginValid === true ? "" : "Укажите ваш логин";
        var passwordAlert = this.state.passwordValid === true ? "" : "Укажите ваш пароль";
        var userAlert = this.state.userValid === true ? "" : "Неверное имя пользователя или пароль";
        return(            
                <form onSubmit={this.handleSubmit}>                    
                        <div className="form-group">
                            <label className="control-label">Укажите ваш Логин:</label>
                            <input type="text" className="form-control"  value={this.state.login} onChange={this.onLogin}/>
                            <span className="text-danger">{loginAlert}</span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Укажите ваш Пароль:</label>
                            <input type="password" className="form-control"  value={this.state.password} onChange={this.onPassword}></input>
                            <span className="text-danger">{passwordAlert}</span>
                        </div>
                        <span className="text-danger">{userAlert}</span>
                        <input type="submit" value="Войти"/>                    
                </form>            
        )
    }
    renderCompleted(){
        return(
            <p><em>Форма успешно отправлена !</em></p>
        );
    }
    render(){
        let contents = this.state.Completed
        ? this.renderCompleted()
        : this.renderLogInForm(this) 
        return(
            <center>
            <div className="row">
                {contents}
            </div>
            </center>
        );
    }
}