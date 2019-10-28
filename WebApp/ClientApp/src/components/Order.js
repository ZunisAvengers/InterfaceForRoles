import React, { Component } from 'react';
import convert from './Convert'

export class Order extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.order
        }
    }
    render(){
        var conv = convert.toOrderState(this.state.data);
        return(
            <div className="div-order" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {convert.toDate(this.state.data.dateOrder)}</b></p>
                <p>Адрес: {this.state.data.address}</p>
                <p>План: {this.state.data.plan.toString()}</p>
                <p>Состояние заказа: {conv.orderState}</p>
            </div>
        );
    }
}
