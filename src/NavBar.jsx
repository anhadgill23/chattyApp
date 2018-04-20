import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <p className = "users-online">{this.props.userCount} users are online.</p>
            </nav>
        );
    }
}

export const BAR = 'hello';



