import React, { Component } from 'react'
import Monster from './image/monstar.png';
import './battle.css'

var menu_id = 0;

export default class Battle extends Component  {
    constructor (props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        this.props.history.push({
            pathname:'/Rpg',
            state: {xx:0,yy:0}
        });
    }

    render () {
        return(
            <div>
            </div>
        )
    }
}