import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  StyleSheet,
  Alert,
} from 'react-native';
import CustomHeader from '../components/customHeader';
import MyButton from '../components/myButton';
import MyInputText from '../components/myInputText';
import {signup} from '../store/actions/authActions';

 class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      focusedInput: 'User ID',
      userId: '',
      password: '',
      processing: false,
      uidValidated: true,
      passValidated: true,
    };
    this.bgTransformY = new Animated.Value(0);
    this.loginCTransformY = new Animated.Value(0);
    this.BG_Y_TRANSFORMED = 0;
    this.width=0;
    this.lowerContainerHeight=0;
    this.LOGIN_Y_TRANSFORMED = 0;
    this.ANIMATION_SPEED = 200;
    this.backHandler = null;
    this.userIdRef = null;
    this.passwordRef = null;
  }

 styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  signUpText: {
    color: 'white',
    position: 'absolute',
    top: StatusBar.currentHeight * 1.5,
    alignSelf: 'center',
    zIndex: 9999,
    fontSize: 25,
  },
  textContainer: {
    height: 15
  },
  text: {
    alignSelf: 'center',
    color: 'gray'
  },
  imageContainer: {
    width:this.width,
    height: 200
  },
  image: {
    width:this.width,
    height: 150,
  },
  textOuterContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  textInnerContainer: {
    height: this.lowerContainerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

  validated = () => {
    let valid = true;
    const {password, userId} = this.state;

    if (userId === '') {
      valid = false;
      this.setState({uidValidated: false});
    } else {
      this.setState({uidValidated: true});
    }

    if (password === '') {
      valid = false;
      this.setState({passValidated: false});
    } else {
      this.setState({passValidated: true});
    }
    return valid;
  };

  _handleSignup = () => {
    this.setState({processing: true});
    const {userId, password} = this.state;
    if (this.validated()) {
      signup({userId, password})
        .then((user) => {
          this.setState({processing: false});

          this.props.navigation.navigate('LoginScreen');
        })
        .catch((err) => {
          this.setState({processing: false});
          Alert.alert(err);
        });
    } else {
      this.setState({processing: false});
    }
  };

  render() {
    this.width= Dimensions.get('window').width;
    this.height= Dimensions.get('window').height;
    const upperContainerHeight = this.height / 1.7;
    this.lowerContainerHeight = this.height - upperContainerHeight;
    this.BG_Y_TRANSFORMED = -upperContainerHeight / 2.5;
    const deltaTransformLowerContainer = upperContainerHeight - 120;
    this.LOGIN_Y_TRANSFORMED = deltaTransformLowerContainer;
    return (
      <View style={this.styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <CustomHeader
          backBtn
          onPressBack={() => this.props.navigation.goBack()}
          rightButton={(props) => false}
        />
        <Text
          style={this.styles.signUpText}>
          Signup
        </Text>
        <View style={this.styles.imageContainer}>
          <Image
            resizeMode="stretch"
            style={this.styles.image}
            source={require('../assets/header.png')}
          />
        </View>
        <View style={this.styles.textOuterContainer}>
          <View
            style={this.styles.textInnerContainer}>
            <MyInputText
              focusedInput={this.state.focusedInput}
              onChangeText={(text) => this.setState({userId: text})}
              {...{
                focusNext: () => this.setState({focusedInput: 'Password'}),
                validation: this.state.uidValidated,
              }}
              title="User ID"
            />
            <View style={this.styles.textContainer} />
            <MyInputText
              secure
              focusedInput={this.state.focusedInput}
              onChangeText={(text) => this.setState({password: text})}
              {...{
                focusNext: () => this.setState({focusedInput: ''}),
                validation: this.state.passValidated,
              }}
              title="Password"
            />
            <View style={this.styles.textContainer} />
            <MyButton
              loading={this.state.processing}
              onPress={() => this._handleSignup()}
              title="Sign Up"
            />
            <View style={this.styles.textContainer} />
            <Text style={this.styles.text}>
              Forget User ID | Forget Password
            </Text>
            <Text style={this.styles.text}>
              Enter User ID
            </Text>
          </View>
        </View>
      </View>
    );
  }
}


export default SignupScreen
