import React, { Component } from 'react';
import convert from './Convert'

export class ManagerOrder extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.order,
            checkState: false,
            dateInstalling:null,
            dateCompliteInstalling:null
        }
        this.onDelete = this.onDelete.bind(this)
        this.onAllow = this.onAllow.bind(this)
        this.onInstalling = this.onInstalling.bind(this)
        this.onDateInstalling = this.onDateInstalling.bind(this)
        this.onDateCompliteInstalling = this.onDateCompliteInstalling.bind(this)        
    }
    onAllow(e){      
        this.setState({
            checkState: this.state.checkState ? false : true            
        })
        
    }
    onDelete(e){      
        this.props.onDelete(this.state.data)
    }
    onInstalling(e){
        e.preventDefault()
        var data = this.state.data
        data.dateInstalling = this.state.dateInstalling
        data.dateCompliteInstalling = this.state.dateCompliteInstalling
        this.props.onInstalling(data)
    }
    render(){
        var conv = convert.toOrderState(this.state.data);
        return(
            <div className="div-order" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {convert.toDate(this.state.data.dateOrder)}</b></p>
                <p>Адрес: {this.state.data.address}</p>
                <p>План: {this.state.data.plan.toString()}</p>
                <p>Состояние заказа: {conv.orderState}</p>
                <p>Заказчик: {this.state.data.customerName}</p>
                <p>Телефон заказчика: {this.state.data.customerPhone}</p>
                {this.options()}
            </div>
        );
    }

    options(){
        switch (this.state.data.state) {
            case 0:
                return this.inProgressing();
            case 1:
            case 2:
                return this.editOrder();
            default:
                break;
        }
    }

    editOrder(){
        let install = this.state.checkState ? this.renderInstalling() : "";
        return(
        <div>
            <input className="btn btn-danger" value="Отменить" type="button" onClick={this.onDelete}></input>
            <input className="btn btn-info" value="Изменить Дату" type="button" onClick={this.onAllow}></input>
            {install}
        </div>)
    }

    inProgressing(){
        let install = this.state.checkState ? this.renderInstalling() : "";
        return(
        <div>
            <input className="btn btn-danger" value="Отменить" type="button" onClick={this.onDelete}></input>
            <input className="btn btn-info" value="Принять" type="button" onClick={this.onAllow}></input>
            {install}
        </div>)
    }
    onDateInstalling(e){
        this.setState({
            dateInstalling: e.target.value
        })
    }
    onDateCompliteInstalling(e){
        this.setState({
            dateCompliteInstalling: e.target.value
        })
    }
    // async loadWorkerList(){
    //     var response = await fetch('api/manager/workers',{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json;charset=utf-8',
    //             'Authorization': 'Bearer ' + localStorage.token
    //         }
    //     })
    //     this.setState({loadWorkers: false})
    //     return response
    // }
    renderInstalling(){
        // const dateCompliteInstalling = this.state.data.dateCompliteInstalling === null 
        // ? convert.toDateForInput()
        // : convert.toDateForInput(this.state.data.dateCompliteInstalling),
        
        // dateInstalling = this.state.data.dateInstalling === null 
        // ? convert.toDateForInput()
        // : convert.toDateForInput(this.state.data.dateInstalling);

        // console.log(dateInstalling)
        // console.log(dateCompliteInstalling)
        return(            
            <form onSubmit={this.onInstalling}>
                <hr/>
                <div>
                    <label>Выберете дату установки</label>
                    <input type="date" onChange={this.onDateInstalling} ></input>  
                </div>
                <div>
                    <label>Выберете дату завершения установки</label>               
                    <input type="date" onChange={this.onDateCompliteInstalling} ></input>     
                </div>
                <input className="btn btn-success" type="submit" value="Отправить"></input>
            </form>
        )
    }

}
