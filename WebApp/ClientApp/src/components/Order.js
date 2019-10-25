import React, { Component } from 'react';

export class Order extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.order
        }
    }
    static toDate(buf){
        var month = "",date = new Date(buf)
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
            default: ;break
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
            default: ;break
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
