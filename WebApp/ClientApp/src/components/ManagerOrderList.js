import React, {Component} from 'react'
import { ManagerOrder } from './ManagerOrder'

export class ManagerOrderList extends Component{
    constructor(props){
        super(props)
        this.state = {
            orders:[],
            loading:true,
            sortState:0,
            sortDate:null
        }
        this.onDelete = this.onDelete.bind(this)        
        this.onInstalization = this.onInstalization.bind(this)
    }

    async onDelete(e){
        await fetch('api/manager/CancelOrder',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body:JSON.stringify(e)
        })
        this.setState((state)=>{
           return{ orders: state.orders.filter(order => order.id !== e.id)}
        })
    }
    async onInstalization(e){
        console.log(e)
        await fetch('api/manager/SetDateInstallation',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            },
            body: JSON.stringify(e)
        })
    }
    componentWillMount(){
        this.popularOrders()
    }

    renderList(){
        return(
            <div>
                {this.state.orders.map(order =>
                    <ManagerOrder key={order.id} order={order} onDelete={this.onDelete}></ManagerOrder>
                    )}
            </div>
        )
    }
    render(){
        let contents = this.state.loading
        ? <p><em>Загрузка...</em></p>
        : this.renderList()
        
        return(
            <div>
                <h3>Все заказы</h3>
                <center>
                    {contents}
                </center>
            </div>
        );
    }
    async popularOrders(){
        const response = await fetch('api/manager/Orders',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            }
        });
        const data = await response.json();
        this.setState({ orders: data, loading: false });
    }
}