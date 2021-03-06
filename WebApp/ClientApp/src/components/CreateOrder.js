import React, { Component } from 'react';

export class CreateOrder extends Component{
    constructor(props){
        super(props)
        this.state = {
            Address: "",
            Plan: "",
            addressValid: false,
            planValid: false,
            Completed: false
        }
        this.onAddress = this.onAddress.bind(this)
        this.onPlan = this.onPlan.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault()
        if (this.state.addressValid === true && this.state.planValid === true){
            let data = JSON.stringify({"address":this.state.Address, "plan":this.state.Plan});
            this.props.onCreate(data);
            this.setState({Completed:true})
        }
    }
    validateAddress(address){
        return address.length > 10
    }
    validatePlan(plan){
        return plan.length > 10 && plan.length < 100
    }
    onAddress(e){
        var address = e.target.value
        var valid = this.validateAddress(address)
        this.setState({Address: address, addressValid: valid})
    }
    onPlan(e){
        var plan = e.target.value
        var valid = this.validatePlan(plan)
        this.setState({Plan: plan, planValid: valid})
    }
    renderOrderForm(){
        var addressAlert = this.state.addressValid === true ? "" : "Укажите ваш адрес";
        var planAlert = this.state.planValid === true ? "" : "Укажите вашу ситуацию";
        return(
                <div className="col-md-4">
                    <form  onSubmit={this.handleSubmit}>
                        
                            <div className="form-group">
                                <label className="control-label">Укажите ваш Адрес:</label>
                                <input type="text" className="form-control"  value={this.state.Address} onChange={this.onAddress}/>
                                <span className="text-danger">{addressAlert}</span>
                            </div>
                            <div className="form-group">
                                <label className="control-label">Укажите что нужно сделать:</label>
                                <textarea type="text" className="form-control"  value={this.state.Plan} onChange={this.onPlan}></textarea>
                                <span className="text-danger">{planAlert}</span>
                            </div>
                            <input type="submit" value="Заказать"/>
                        
                    </form>
                </div>
        )
    }
    render(){
        let contents = this.renderOrderForm() 
        return(
            <center>
                {contents}
            
            </center>
        );
    }
}