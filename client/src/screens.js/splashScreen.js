import React, {Component} from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {} from '@react-navigation/stack';
class SplashScreen extends Component {
  state = {};
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
    }, 3000);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden />
        <Image
          resizeMode="stretch"
          style={{width: '100%', height: 450}}
          source={require('../assets/header.png')}
        />
        <View style={{flex: 1}}>
          <Image
            resizeMode="stretch"
            style={{
              width: 150,
              height: 150,
              alignSelf: 'center',
              zIndex: 999,
              transform: [{translateY: -70}],
            }}
            source={require('../assets/logo.png')}
          />
        </View>
        <Image
          resizeMode="stretch"
          style={{width: '100%', height: 150, transform: [{rotateX: '180deg'}]}}
          source={require('../assets/header.png')}
        />
      </View>
    );
  }
}

export default SplashScreen;
