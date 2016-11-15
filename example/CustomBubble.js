import React from 'react'
import {
  Linking,
  MapView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Image
} from 'react-native'

import { Bubble } from 'react-native-gifted-chat';

export default class CustomBubble extends React.Component {
  render() {
    const currentColor = (newStory) => {
      if (!newStory) {
        return '#f0f0f0'
      }
      return '#FFFFFF'
    }

    return (
      <Bubble
        {...this.props}
        wrapperStyle={{
          left: {
            backgroundColor: currentColor(this.props.currentMessage.newStory),
          }
        }}
      />
    )


    return null
  }
}
