import React, { Component } from 'react';

export class WordkerOrders extends Component{
    constructor(props){
        super(props)
        this.state = {
            orders:[],
            loading:true
        }
        
    }
    render(){
        let content = this.state.loading
        ?<div></div>
        :<div></div>
        return(
            {content}
        )
    }
    renderContent(data){

    }
    async loadOrders(){
        const respounce = await fetch('api/worker/Orders',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + localStorage.token
            }
            
        })
    }
}