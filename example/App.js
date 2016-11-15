import React, { Component }  from 'react';
import {
  Text,
  View,
  AppRegistry,
  Dimensions,
  LayoutAnimation,
  Keyboard,
  UIManager,
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


import ChatScreen  from './chat'


/**
  * This is where we map route names to route components. Any React
  * component can be a route, it only needs to have a static `route`
  * property defined on it, as in HomeScreen below
  */
const Router = createRouter(() => ({
  giftedChat: () => ChatScreen
}));

const NAVBAR_HEIGHT = 90
const MAGIC_NUMBER = 2

// we handle the keyboard avoids, and this was completely inspired by the solution
// found here: https://github.com/leecade/rn-notes/issues/13

export default class App extends Component {

  constructor (props) {
    super(props)
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.state = {
      visibleHeight: Dimensions.get('window').height -NAVBAR_HEIGHT,
      padding: 0,
    }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow (e) {
   // Animation types easeInEaseOut/linear/spring

    const config = LayoutAnimation.create(25, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity)
    LayoutAnimation.configureNext(config)
    let visibleHeight = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({
      visibleHeight: visibleHeight,

    })
  }

  _keyboardDidHide (e) {
    // Animation types easeInEaseOut/linear/spring
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Dimensions.get('window').height  - NAVBAR_HEIGHT,

    })
  }



  render() {
    return (
      <NavigationProvider router={Router}>
        <View style={{flex:1, height:this.state.visibleHeight}}>
          <StackNavigation initialRoute={Router.getRoute('giftedChat')} />
        </View>
      </NavigationProvider>
    );
  }
}
