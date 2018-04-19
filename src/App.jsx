import React, { Component } from 'react';
import NavBar from './Navbar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');
    console.log('Connected to server.')
  }

  addMessage(content) {

    const { messages } = this.state;

    const newMessage = {
      id: content.length + 1,
      username: 'jam',
      content: content
    }

    // Sending messages to the server
      let newMessageStringify = JSON.stringify(newMessage)
      if (newMessageStringify){
          this.socket.send(newMessageStringify);
      } else {
          console.log('There is no data to be sent.')
      }

    // Receiving messages from the server
    this.socket.onmessage = (event) => {
      console.log('event.data: ', event.data)

      const message = JSON.parse(event.data);

      if (message) {
        messages.push(message);
        this.setState({ messages })
      } else {
        console.log('There is no data to be displayed.')
      }
    }

  }

  render() {

    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} />
      </div>
    )
  }
}
export default App;
