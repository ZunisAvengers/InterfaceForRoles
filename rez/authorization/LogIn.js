import React, { Component } from 'react';


export class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            login: "",
            password: "",
            loginValid: false,
            passwordValid: false,
            userValid: false,
            Completed: false
        }
        this.onLogin = this.onLogin.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e){
        e.preventDefault()
        if (this.state.loginValid === true && this.state.passwordValid === true){
            const response = await fetch('api/identity/LogIn',{
                method:"POST",
                body: JSON.stringify({"login":this.state.login, "password":this.state.password})
            });
            const data = await response.json();
            //this.props.onLogIn(data);
            if (data.status == 404){
                this.setState({userValid:true})    
            }else{
                this.setState({Completed:true})
                this.props.onLogIn(data);
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
    static renderLogInForm(e){
        var loginAlert = e.state.loginValid === true ? "" : "Укажите ваш логин";
        var passwordAlert = e.state.passwordValid === true ? "" : "Укажите ваш пароль";
        var userAlert = e.state.userValid === true ? "" : "Неверное имя пользователя или пароль";
        return(            
            <div className="col-md-4">
                <form  onSubmit={e.handleSubmit}>
                    
                        <div className="form-group">
                            <label className="control-label">Укажите ваш Логин:</label>
                            <input type="text" className="form-control"  value={e.state.login} onChange={e.onLogin}/>
                            <span className="text-danger">{loginAlert}</span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Укажите ваш Пароль:</label>
                            <textarea type="text" className="form-control"  value={e.state.password} onChange={e.onPassword}></textarea>
                            <span className="text-danger">{passwordAlert}</span>
                        </div>
                        <span className="text-danger">{userAlert}</span>
                        <input type="submit" value="Заказать"/>
                    
                </form>
            </div>
        )
    }
    static renderCompleted(){
        return(
            <p><em>Форма успешно отправлена !</em></p>
        );
    }
    render(){
        let contents = this.state.Completed
        ? CreateOrder.renderCompleted()
        : CreateOrder.renderOrderForm(this) 
        return(
            <center>
                {contents}
            </center>
        );
    }
}