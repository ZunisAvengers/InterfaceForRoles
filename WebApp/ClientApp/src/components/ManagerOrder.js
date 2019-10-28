import React, { Component } from 'react';
import convert from './Convert'

export class ManagerOrder extends Component{
    constructor(props){
        super(props)
        this.state={
            data:props.order,
            checkState: false,
            dateInstalization:null,
            dateCompliteInstalization:null
        }
        this.onDelete = this.onDelete.bind(this)
        this.onAllow = this.onAllow.bind(this)
        this.onInstalization = this.onInstalization.bind(this)
        this.onDateInstalization = this.onDateInstalization.bind(this)
        this.onDateCompliteInstalization = this.onDateCompliteInstalization.bind(this)        
    }
    onAllow(e){
        if (this.state.data.dateInstalling === null) {            
            this.setState({
                checkState: this.state.checkState ? false : true            
            })
        }
    }

    onDelete(e){
      
        this.props.onDelete(this.state.data)
    }


    onInstalization(e){
        const data = this.state.data
        data.dateInstalization = this.state.dateInstalization
        data.dateCompliteInstalization = this.state.dateCompliteInstalization
        this.props.onInstalization(data);
    }
    render(){
        var conv = convert.toOrderState(this.state.data);
        return(
            <div className="div-order" style={{backgroundColor:conv.color+'91',borderColor:conv.color}}>
                <p><b>Заказ от {convert.toDate(this.state.data.dateOrder)}</b></p>
                <p>Адрес: {this.state.data.address}</p>
                <p>План: {this.state.data.plan.toString()}</p>
                <p>Состояние заказа: {conv.orderState}</p>
                {this.isInProgressing(this.state.data.state)}
            </div>
        );
    }
    isInProgressing(state){
        if (state === 0 ){
            let install = this.state.checkState ? this.renderInstalization() : "";
            return(
            <div>
                <input className="btn btn-danger" value="Отменить" type="button" onClick={this.onDelete}></input>
                <input className="btn btn-default" value="Принять" type="button" onClick={this.onAllow}></input>
                {install}
            </div>)
        }
        else {return(<p></p>)}
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
