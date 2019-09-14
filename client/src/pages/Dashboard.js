import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'
import socketIOClient from "socket.io-client"
import Auth from '../modules/Auth'

import RoomCard from '~/components/RoomCard'

import Logo from '~/assets/logo_white.png'

import './Dashboard.scss'

const socket = socketIOClient(process.env.API_URL)

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            rooms: [],
            title: '',
            nickname: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount(){
        if (!Auth.userData) this.props.history.push('/login')

        const { nickname } = Auth.userData
        this.setState({ nickname })

        socket.on('tableOfRooms', rooms => {
            this.setState({ rooms })
        })
    }

    handleLogout(){
        Auth.logout()
        this.props.history.push('/login')
    }

    handleChange(key, value){
        this.setState({
            [key]: value
        })
    }

    handleSubmit(event){
        event.preventDefault()

        let rooms = this.state.rooms
        const title = this.state.title
        const id = ++rooms.length 
        
        rooms.unshift({ title })

        this.setState({ rooms, title: '' })
        socket.emit('newRoom', { title, id })
    }

    render(){
        return (
            <Fade>
                <div className="navbar-container">
                    <h1>Hello, <strong>{this.state.nickname}</strong></h1>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
                <div className="dashboard-container">
                    <img src={Logo} alt='' />
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            placeholder="Room title" 
                            value={this.state.title} 
                            onChange={event => this.handleChange('title', event.target.value)}
                            required
                        />
                        <button type="submit">Create Room</button>
                    </form>
                    <div className="rooms-container">
                        {
                            this.state.rooms
                            .map((room, index) => 
                                <Link 
                                    key={room.id}
                                    to={{
                                        pathname: '/room/' + index,
                                        state: { id: room.id, title: room.title }
                                    }}
                                >
                                    <RoomCard 
                                        title={room.title} 
                                        key={room.title} 
                                    />
                                </Link>
                            )
                        }
                    </div>
                </div>
            </Fade>
        )
    }
}