import React, {Component} from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
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
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          resizeMode="stretch"
          style={styles.header1}
          source={require('../assets/header.png')}
        />
        <View style={styles.container}>
          <Image
            resizeMode="stretch"
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
        </View>
        <Image
          resizeMode="stretch"
          style={styles.header2}
          source={require('../assets/header.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header1: {
    width: '100%',
    height: 450
  },
  header2: {
    width: '100%',
    height: 150,
    transform: [{rotateX: '180deg'}]
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    zIndex: 999,
    transform: [{translateY: -70}],
  },
});

export default SplashScreen;
