import React, { Component } from 'react'
import Profile from './Profile'

class Dashboard extends Component {
    render(){
        return (
            <div className="dashboard.container">
                <div className="row">
                        <Profile />
                </div>
            </div>
        )
    }
}

export default Dashboard