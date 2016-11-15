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

export default class CustomView extends React.Component {
  render() {
    if (this.props.currentMessage.newStory) {
      return (
        <View style={{backgroundColor:'white'}}>
          <View style={{alignSelf:'center', margin:15}}>
            <View style={{transform:[{rotateZ:'-5deg'}]}}>

              <TouchableOpacity onPress={()=>alert(this.props.currentMessage.newStory.title)}>
              <Image resizeMode='contain' style={{width:200, height:200}}source={this.props.currentMessage.newStory.titleImage} />
              </TouchableOpacity>
            </View>
          </View>

        </View>

      )
    }

    return null
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white'
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  mapViewStyle: {},
};

CustomView.propTypes = {
  currentMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  mapViewStyle: View.propTypes.style,
};
