import React, { Component } from 'react'
import { Spin, Icon } from 'antd'

import './Main.scss'

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            anticon: (<Icon type="loading" style={{ fontSize: 30 }} spin />)
        }
    }

    componentDidMount(){
        this.props.history.push('/login')
    }

    render(){
        return (
            <div className="main-component">
                <Spin indicator={this.state.anticon} className="loading-icon" />
                <h1 className="loading-text">Connecting to server...</h1>
            </div>
        )
    }
}