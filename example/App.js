import React, { Component }  from 'react';
import {
  Text,
  View,
  AppRegistry,
  Dimensions,
  LayoutAnimation,
  Keyboard
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';


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

class App extends Component {

  constructor (props) {
    super(props)
    this._keyboardDidShow = this._keyboardDidShow.bind(this)
    this._keyboardDidHide = this._keyboardDidHide.bind(this)
    this.state = {
      visibleHeight: Dimensions.get('window').height - NAVBAR_HEIGHT,
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

    let visibleHeight = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({
      visibleHeight: visibleHeight,
      padding: e.endCoordinates.height
    })
  }

  _keyboardDidHide (e) {
    // Animation types easeInEaseOut/linear/spring

    this.setState({
      visibleHeight: Dimensions.get('window').height - NAVBAR_HEIGHT,
      padding: 0
    })
  }



  render() {
    return (
      <NavigationProvider router={Router}>
        <View style={{flex:1, height:this.state.visibleHeight, paddingTop:this.state.padding}}>
          <StackNavigation initialRoute={Router.getRoute('giftedChat')} />
        </View>
      </NavigationProvider>
    );
  }
}

AppRegistry.registerComponent('ExNavigationGiftedChat', () => App);
