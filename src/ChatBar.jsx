import React, { Component } from 'react';

export default class ChatBar extends Component {
    constructor (props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
    }

    handleKeyPress (event) {
        if (event.key === 'Enter') {
           this.props.addMessage(event.target.value);
        }
        // else do something else
    }

    handleUsernameChange (event) {
        let currentUserName = event.target.value;
        if (event.key === 'Enter') {
            this.props.updateCurrentUser(currentUserName)
         }
    }

    render() {
        return (
            <footer className="chatbar">
                <input onKeyPress ={this.handleUsernameChange} className="chatbar-username" placeholder="Your Name (Optional)" />
                <input onKeyPress = {this.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}