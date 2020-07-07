import React, { Component } from 'react'

export default class Nav extends Component {

    render() {
        return (
            <header>  
                <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light border-bottom">
                    <div className="navbar-brand">User Management</div>
                </nav>
            </header>
        )
    }
}