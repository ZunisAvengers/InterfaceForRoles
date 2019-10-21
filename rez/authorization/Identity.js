export class Identity {
    login = null;
    role = null;
    isAuthenticated = false;
    //claim = null;
        
    LogIn(data){
        this.login = data.login
        this.role = data.role
        this.isAuthenticated = true
    }
    Register(data){
        this.login = data.login
        this.role = data.role
        this.isAuthenticated = true
    }
    getUser(){
        return{
            login,
            role,
            isAuthenticated
        }
    }
    LogOut(){
        this.login = null
        this.role = null
        this.isAuthenticated = false
    }
}