export class Identity {
    _login = null;
    _role = null;
    _isAuthenticated = false;
    //claim = null;
        
    async logIn(data){
        const response = await fetch('api/identity',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"login":data.login, "password":data.password})
        })
        localStorage.setItem("token", response.jwt)
        console.log(response.json())
        this._isAuthenticated = true
        return response.status
        
    }
    async register(data){
        
        const response = await fetch('api/identity/Reg',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "login":data.login,
                "password":data.password,
                "firstName":data.firstName,
                "lastName":data.lastName,
                "phone":data.phone
            })
        })
        if (response.status != 415) this.logIn(data)
        return response.status
    }
    static LogOut(){
        this._isAuthenticated = false
    }
    static get instance() { return Identity }
}
const identity = new Identity();

export default identity;