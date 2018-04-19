import React, { Component } from 'react';

export default class ChatBar extends Component {
    constructor (props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleKeyPress (event) {
        if (event.key === 'Enter') {
           this.props.addMessage(evenet.target.value);
        }
        // else do something else
    }

    handleBlur (event) {
        this.setState({username: event.target.value})
    }

    render() {
        return (
            <footer className="chatbar">
                <input onChange ={this.handleChangeName} className="chatbar-username" placeholder="Your Name (Optional)" />
                <input onKeyPress = {this.handleBlur} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}