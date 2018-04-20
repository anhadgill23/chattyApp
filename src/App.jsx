import React, { Component } from 'react';
import NavBar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Bob' },
      messages: [],
      userCount: 0
    }
    this.addMessage = this.addMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    //setting up the webSocket
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log("Connected to server");
    };

    //receiving messages from the server
    this.socket.onmessage = (event) => {
      const { currentUser, messages, userCount } = this.state;
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "userCount":
          this.setState({ userCount: data.numOfUsers })
          break;
        case "incomingMessage":
        case "incomingNotification":
          this.setState({ messages: [].concat(messages, [data]) });
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    };
  }

  updateCurrentUser(username) {
    const { currentUser } = this.state;
    const notification = {
      type: 'postNotification',
      content: `${currentUser.name} has changed their name to ${username}.`
    }
    let notificationObject = JSON.stringify(notification);
    this.socket.send(notificationObject);

    this.setState({ currentUser: { name: username } });
  }

  addMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    }

    // Sending messages to the server
    let newMessageStringify = JSON.stringify(newMessage)
    if (newMessageStringify) {
      this.socket.send(newMessageStringify);
    } else {
      console.log("There is no data to be sent. Unknown event type " + content.type)
    }
  }

  render() {
    return (
      <div>
        <NavBar userCount = {this.state.userCount}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} updateCurrentUser={this.updateCurrentUser} addMessage={this.addMessage} />
      </div>
    )
  }
}
export default App;
