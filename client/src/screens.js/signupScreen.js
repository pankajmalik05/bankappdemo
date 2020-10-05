import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  BackHandler,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CustomFooter from '../components/customFooter';
import CustomHeader from '../components/customHeader';
import MyButton from '../components/myButton';
import MyInputText from '../components/myInputText';
import TranseButton from '../components/transButton';
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
    this.LOGIN_Y_TRANSFORMED = 0;
    this.ANIMATION_SPEED = 200;
    this.backHandler = null;
    this.userIdRef = null;
    this.passwordRef = null;
  }

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
    console.log('TEST 0 Signing up');
    this.setState({processing: true});
    const {userId, password} = this.state;
    console.log(`${userId} ${password}`);
    if (this.validated()) {
      console.log('TEST 1 Validated');
      signup({userId, password})
        .then((user) => {
          console.log('TEST 2 Signed Up');
          this.setState({processing: false});

          this.props.navigation.navigate('LoginScreen');
        })
        .catch((err) => {
          this.setState({processing: false});
          Alert.alert(err);
        });
    } else {
      this.setState({processing: false});
      console.log('Invalid data');
    }
  };

  render() {
    const {width, height} = Dimensions.get('window');
    const {isLoginPageMode} = this.state;
    const upperContainerHeight = height / 1.7;
    const lowerContainerHeight = height - upperContainerHeight;
    this.BG_Y_TRANSFORMED = -upperContainerHeight / 2.5;
    const deltaTransformLowerContainer = upperContainerHeight - 120;
    this.LOGIN_Y_TRANSFORMED = deltaTransformLowerContainer;
    return (
      <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <CustomHeader
          backBtn
          onPressBack={() => this.props.navigation.goBack()}
          rightButton={(props) => false}
        />
        <Text
          style={{
            color: 'white',
            position: 'absolute',
            top: StatusBar.currentHeight * 1.5,
            alignSelf: 'center',
            zIndex: 9999,
            fontSize: 25,
          }}>
          Signup
        </Text>
        <View style={{width, height: 200}}>
          <Image
            resizeMode="stretch"
            style={{
              width,
              height: 150,
            }}
            source={require('../assets/header.png')}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: lowerContainerHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MyInputText
              focusedInput={this.state.focusedInput}
              onChangeText={(text) => this.setState({userId: text})}
              {...{
                focusNext: () => this.setState({focusedInput: 'Password'}),
                validation: this.state.uidValidated,
              }}
              title="User ID"
            />
            <View style={{height: 15}} />
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
            <View style={{height: 15}} />
            <MyButton
              loading={this.state.processing}
              onPress={() => this._handleSignup()}
              title="Sign Up"
            />
            <View style={{height: 15}} />
            <Text style={{alignSelf: 'center', color: 'gray'}}>
              Forget User ID | Forget Password
            </Text>
            <Text style={{alignSelf: 'center', color: 'gray'}}>
              Enter User ID
            </Text>
          </View>
        </View>
        {/* <CustomFooter /> */}
      </View>
    );
  }
}

export default SignupScreen;
