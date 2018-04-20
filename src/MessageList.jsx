import React, { Component } from 'react';
import Message from './Message.jsx';
import Notificaton from './Notification.jsx';

class MessageList extends Component {
    render() {
        const messages = this.props.messages.map(function (message) {
            if (message.type === 'incomingNotification') {
                return <Notificaton
                key = {message.id}
                content = {message.content} />

            } else if (message.type === 'incomingMessage') {
                return <Message
                    key = {message.id}
                    username = {message.username}
                    content = {message.content} />
            }
        })
        return (
            <main className="messages">
                { messages }
            </main>
        );
    }
}
export default MessageList;
