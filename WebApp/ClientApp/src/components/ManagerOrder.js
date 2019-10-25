import React, { Component } from 'react';

export class ManagerOrder extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.order,
            chek: false,
            dateInstalization:null,
            dateCompliteInstalization:null
        }
        this.onDelete = this.onDelete.bind(this)
        this.onAllow = this.onAllow.bind(this)
        this.onInstalization = this.onInstalization.bind(this)
        this.onDateInstalization = this.onDateInstalization.bind(this)
        this.onDateCompliteInstalization = this.onDateCompliteInstalization.bind(this)
        
    }
    toDate(buf){
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
        return date.getDate() + " " + month + " " + date.getFullYear();
    }

    onAllow(e){
        if (this.state.data.dateInstalling == null) {            
            this.setState({
                chek: this.state.chek ? false : true            
            })
        }
    }

    onDelete(e){
      
        this.props.onDelete(this.state.data)
    }


    onInstalization(e){

    }
    render(){
        var orderState, color = "";
        switch(this.state.data.state){
            case 0: orderState = "Ожидание обработки"; color="#c5c5c5"
            break;
            case 1: orderState = "Ожидание установки " + this.toDate(this.state.data.dateInstalling); color="#e1e437"
            break;
            case 2: orderState = "На данный момент происходит установка, день завершения: " + this.toDate(this.state.data.dateCompliteInstalling)+" (может изменятся)"; color="#e1e437"
            break;
            case 3: orderState = "Установка завершена, происходит проверка"; color="#6fa6d6"
            break;
            case 4: orderState = "Завершён! " + this.toDate(this.state.data.dateCompliteInstalling) ; color="#37e43c"
            break;
            case 5: orderState = "Заказ отклонен"; color="#e43f37"
            break;
            default: ;break
        }
        let install = this.state.chek ? this.renderInstalization(this) : "";
        return(
            <div className="div-order" style={{backgroundColor:color+'91',borderColor:color,}}>
                <p><b>Заказ от {this.toDate(this.state.data.dateOrder)}</b></p>
                <p>Адрес: {this.state.data.address}</p>
                <p>План: {this.state.data.plan.toString()}</p>
                <p>Состояние заказа: {orderState}</p>
                
                <input className="btn btn-danger" value="Отменить" type="button" onClick={this.onDelete}></input>
                <input className="btn btn-default" value="Принять" type="button" onClick={this.onAllow}></input>
                
                {install}
            </div>
        );
    }

    onDateInstalization(e){
        this.setState({
            dateInstalization: e.target.value
        })
    }
    onDateCompliteInstalization(e){
        this.setState({
            dateCompliteInstalization: e.target.value
        })
    }
    async loadWorkerList(){
        var response = await fetch('api/manager/workers',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            }
        })
        this.setState({loadWorkers: false})
        return response
    }
    renderInstalization(){        
        return(
            
            <form onSubmit={this.onInstalization}><hr/>
                <div>
                    <label>Выберете дату установки</label>
                    <input type="date" onChange={this.onDateInstalization}></input>  
                </div>
                <div>
                    <label>Выберете дату завершения установки</label>               
                    <input type="date" onChange={this.onDateCompliteInstalization}></input>     
                </div>
                <input className="btn btn-success" type="button" value="Отправить" onClick={this.onAllow}></input>
            </form>
        )
    }

}
