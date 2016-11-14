import React, { Component }  from 'react';
import { TouchableOpacity, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat';

const button = (text) => (
  <TouchableOpacity>
    <View><Text style={{fontSize:35}}> {text} </Text></View>
  </TouchableOpacity>
)

const BOTTOM_OFFSET = 0

export default class ChatScreen extends Component {

  static route = {
    navigationBar: {
      title: 'Chat Screen Title',
      renderRight: () => button('right'),
      renderLeft: () => button('left')

    }
  }

  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: `bottom offset: ${BOTTOM_OFFSET}`,
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <GiftedChat
        // bottomOffset={BOTTOM_OFFSET}
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
