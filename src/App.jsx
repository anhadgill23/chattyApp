import React, { Component } from 'react';
import NavBar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    }
    this.addMessage = this.addMessage.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    // taken from the exercise
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      const { currentUser, messages, userCount } = this.state;
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "userCount":
        //const total = JSON.parse(event.data.numOfUsers)
          console.log('data: ', data)
          this.setState({ userCount: data.numOfUsers })
          break;
        case "incomingMessage":
        case "incomingNotification":
          this.setState({ messages: [].concat(messages, [data]) });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };
  }

  updateCurrentUser(username) {
    const { currentUser, messages } = this.state;
    const notification = {
      type: 'postNotification',
      content: `${currentUser.name} has changed their name to ${username}.`
    }
    let notificationObject = JSON.stringify(notification);
    this.socket.send(notificationObject);

    this.setState({ currentUser: { name: username } });
  }

  addMessage(content) {

    const { messages } = this.state;

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
      console.log('There is no data to be sent.')
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
