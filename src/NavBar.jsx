import React, { Component } from 'react';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <h1>Hello React :)</h1>
            </nav>
        );
    }
}

export const BAR = 'hello';



