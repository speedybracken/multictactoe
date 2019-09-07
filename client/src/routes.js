import React from 'react'
import { Route } from 'react-router-dom'

import Main from './pages/Main'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Room from './pages/Room'

const Routes = () => {
    return (
        <>
            <Route exact path='/' component={Main} />
            <Route path='/login' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/room/:id' component={Room} />
        </>
    )
}

export default Routes