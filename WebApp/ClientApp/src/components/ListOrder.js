import React, { Component } from 'react';
import { CreateOrder } from './CreateOrder';
import { Order } from './Order';

export class ListOrder extends Component{
    constructor(props){
        super(props)
        this.state={
            ListOrder:[],
            loading:true,
            showCreate:false
        }
        this.ShowCreateOrder = this.ShowCreateOrder.bind(this)
        this.onCreate = this.onCreate.bind(this)
    }
    componentDidMount() {
        this.loadOrders();
    }
    static renderListOrder(e){
        return (
            <div>
                {e.ListOrder.map(order =>
                    <Order key={order.id} order={order}></Order>
                    )}
            </div>
        )
    }
    async onCreate(data){
        await fetch('api/order',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body:data
        });
        this.setState({loading:true})
        
        setTimeout(this.setState({showCreate:false}),5000)
        this.loadOrders()
    }
    ShowCreateOrder(e){
        if (this.state.showCreate == true) this.setState({showCreate: false})
        else this.setState({showCreate: true})
    }
    render(){
        let create = this.state.showCreate
        ? <CreateOrder style="float:center" onCreate={this.onCreate}></CreateOrder>
        : <p></p>
        let contents = this.state.loading
        ? <p><em>Загрузка...</em></p>
        : ListOrder.renderListOrder(this.state)
        
        return(
            <div>
                <h3>Ваши заказы</h3>
                <input type="button" onClick={this.ShowCreateOrder} value="Создать"/>
                <center>
                    {create}
                    {contents}
                </center>
            </div>
        );
    }
    async loadOrders() {
        const response = await fetch('api/order',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            }
        });
        const data = await response.json();
        this.setState({ ListOrder: data, loading: false });
    }
}