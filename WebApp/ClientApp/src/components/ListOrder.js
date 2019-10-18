import React, { Component } from 'react';
import { CreateOrder } from './CreateOrder';
 
class Order extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.order
        }
    }
    static toDate(buf){
        var month = "",date = new Date(buf)
        console.log(date)
        switch(date.getMonth()){
            case 0 : month = "Янв";break;
            case 1 : month = "Фев";break;
            case 2 : month = "Мар";break;
            case 3 : month = "Апр";break;
            case 4 : month = "Май";break;
            case 5 : month = "Июн";break;
            case 6 : month = "Июл";break;
            case 7 : month = "Авг";break;
            case 8 : month = "Сен";break;
            case 9 : month = "Окт";break;
            case 10 : month = "Ноя";break;
            case 11 : month = "Дек";break;
        }
        return date.getDate() + " " + month + " " + date.getFullYear()
    }
    render(){
        var orderState, color = ""
        switch(this.state.data.state){
            case 0: orderState = "Ваш заказ сейчас обрабатывается"; color="#c5c5c5"
            break;
            case 1: orderState = "Ваш заказ обработан. Ждите установки " + Order.toDate(this.state.data.dateInstalling); color="#e1e437"
            break;
            case 2: orderState = "На данный момент происходит установка, день завершения: " + Order.toDate(this.state.data.dateCompliteInstalling)+" (может изменятся)"; color="#e1e437"
            break;
            case 3: orderState = "Установка завершена, происходит проверка"; color="#6fa6d6"
            break;
            case 4: orderState = "Завершён!"; color="#37e43c"
            break;
            case 5: orderState = "Заказ отклонен"; color="#e43f37"
            break;
        }
        return(
            <div className="div-order" style={{backgroundColor:color+'91',borderColor:color,}}>
                <p><b>Заказ от {Order.toDate(this.state.data.dateOrder)}</b></p>
                <p>Адрес: {this.state.data.address}</p>
                <p>План: {this.state.data.plan.toString()}</p>
                <p>Состояние заказа: {orderState}</p>
            </div>
        );
    }
}


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
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:data
        });
        this.setState({loading:true})
        this.loadOrders()
        setTimeout(this.setState({showCreate:false}),5000)
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
            method:'GET'
        });
        const data = await response.json();
        console.log(data)
        this.setState({ ListOrder: data, loading: false });
    }
}