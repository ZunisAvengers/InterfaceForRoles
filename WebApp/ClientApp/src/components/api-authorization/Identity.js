export class Identity {
    _login = null;
    _role = null;
    _isAuthenticated = false;
    //claim = null;
        
    static LogIn(data){
        this._login = data.login
        this._role = data.role
        this._isAuthenticated = true
    }
    static Register(data){
        this._login = data.login
        this._role = data.role
        this._isAuthenticated = true
    }
    static LogOut(){
        this._login = null
        this._role = null
        this._isAuthenticated = false
    }
    static get instance() { return authService }
}
const authService = new Identity();

export default authService;