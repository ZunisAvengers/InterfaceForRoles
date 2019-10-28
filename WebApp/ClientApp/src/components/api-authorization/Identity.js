export class Identity {
    _login = null;
    _role = null;
    _isAuthenticated = false;
    //claim = null;
    _callbacks = [];
    _nextSubscriptionId = 1;
        
    async logIn(data){
        await fetch('api/identity',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"login":data.login, "password":data.password})
        })
        .then(resp => resp.json())
        .then(info => {
            localStorage.setItem("token", info.jwt)
            this.updateState(info.Login, info.Role)
            this._isAuthenticated = true
        })
        return 200
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
        if (response.status !== 415) this.logIn(data)
        return response.status
    }
    async GetUser(){
        await fetch('api/identity/Profile',{
            method:"GET",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
        .then(resp => resp.json())
        .then(info => {
            this.updateState(info.Login, info.Role)
        }) 
        return false
    }
    LogOut(){
        localStorage.setItem("token", undefined)
        this._login = null;
        this._role = null;
        this._isAuthenticated = false
        this.notifySubscribers();
    }

    updateState(login, role) {
        this._login = login
        this._role = role
        this._isAuthenticated = true;
        this.notifySubscribers();
    }

    subscribe(callback) {
        this._callbacks.push({ callback, subscription: this._nextSubscriptionId++ });
        return this._nextSubscriptionId - 1;
    }

    unsubscribe(subscriptionId) {
        const subscriptionIndex = this._callbacks
            .map((element, index) => element.subscription === subscriptionId ? { found: true, index } : { found: false })
            .filter(element => element.found === true);
        if (subscriptionIndex.length !== 1) {
            throw new Error(`Found an invalid number of subscriptions ${subscriptionIndex.length}`);
        }

        this._callbacks = this._callbacks.splice(subscriptionIndex[0].index, 1);
    }

    notifySubscribers() {
        for (let i = 0; i < this._callbacks.length; i++) {
            const callback = this._callbacks[i].callback;
            callback();
        }
    }

    static get instance() { return Identity }
}
const identity = new Identity();

export default identity;