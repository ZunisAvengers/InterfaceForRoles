import React, {Component} from 'react'

export class ManagerList extends Component{
    constructor(props){
        super(props)
        this.state = {
            orders:[],
            loading:true,
            sortState:0,
            sortDate:null
        }
        this.onDelete = this.onDelete.bind(this)
        this.onAllow = this.onAllow.bind(this)
    }


}