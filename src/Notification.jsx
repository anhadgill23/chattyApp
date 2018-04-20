import React, { Component } from 'react';

export default class Message extends Component {
    render() {
        return (
            <div className="message system">
                {this.props.content}
            </div>
        );
    }
}

