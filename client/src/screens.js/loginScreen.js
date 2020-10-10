import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Alert,
  BackHandler,
} from 'react-native';
import CustomFooter from '../components/customFooter';
import CustomHeader from '../components/customHeader';
import MyButton from '../components/myButton';
import MyInputText from '../components/myInputText';
import TranseButton from '../components/transButton';
import {login} from '../store/actions/authActions';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoginPageMode: false,
      focusedInput: 'User ID',
      processing: false,
      uidValidated: true,
      passValidated: true,
      userId: '',
      password: '',
    };
    this.bgTransformY = new Animated.Value(0);
    this.loginCTransformY = new Animated.Value(0);
    this.lowerContainerHeight=0;
    this.BG_Y_TRANSFORMED = 0;
    this.LOGIN_Y_TRANSFORMED = 0;
    this.ANIMATION_SPEED = 200;
    this.backHandler = null;
    this.userIdRef = null;
    this.passwordRef = null;
  }

  styles = StyleSheet.create({
    animatedText: {
      fontSize: 35,
      color: "white",
      position: "absolute",
      left:20,
      top: 100,
      zIndex:99999
    },
    animatedView: {
      height: this.lowerContainerHeight,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
  onBackButtonPressed = () => {
    if (this.state.isLoginPageMode) {
      this.toggleLoginViewTranformed();
    } else {
      BackHandler.exitApp();
    }
    return true;
  };

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

  _handleLogin = () => {
    this.setState({processing: true});
    const {userId, password} = this.state;
    if (this.validated()) {
      this.toggleLoginViewTranformed();
      login({userId, password})
        .then((user) => {

          this.setState({processing: false});

        })
        .catch((err) => {
          this.setState({processing: false});
          this.toggleLoginViewTranformed();
          Alert.alert(err);
        });
    } else {
      this.setState({processing: false});
    }
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressed,
    );
  }
  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }
  enterLoginViewTransformed = () => {
    Animated.parallel([
      Animated.timing(this.bgTransformY, {
        toValue: this.BG_Y_TRANSFORMED,
        duration: this.ANIMATION_SPEED,
        useNativeDriver: true,
      }),
      Animated.timing(this.loginCTransformY, {
        toValue: -this.LOGIN_Y_TRANSFORMED,
        duration: this.ANIMATION_SPEED,
        useNativeDriver: true,
      }),
    ]).start();
    this.setState({isLoginPageMode: true});
  };

  exitLoginViewTransformed = () => {
    Animated.parallel([
      Animated.timing(this.bgTransformY, {
        toValue: 0,
        duration: this.ANIMATION_SPEED,
        useNativeDriver: true,
      }),
      Animated.timing(this.loginCTransformY, {
        toValue: 0,
        duration: this.ANIMATION_SPEED,
        useNativeDriver: true,
      }),
    ]).start();
    this.setState({isLoginPageMode: false});
  };

  toggleLoginViewTranformed = () => {
    if (this.state.isLoginPageMode) {
      this.exitLoginViewTransformed();
    } else {
      this.enterLoginViewTransformed();
    }
  };

  render() {
    const {width,height} = Dimensions.get('window');
    const {isLoginPageMode} = this.state;
    const upperContainerHeight = height / 1.7;
    this.lowerContainerHeight = height - upperContainerHeight;
    this.BG_Y_TRANSFORMED = -upperContainerHeight / 2.5;
    const deltaTransformLowerContainer = upperContainerHeight - 140;
    this.LOGIN_Y_TRANSFORMED = deltaTransformLowerContainer;
    return (
      <View style={{width, height, backgroundColor: '#f0f0f0'}}>
        <StatusBar translucent backgroundColor="transparent" />
        <CustomHeader
          backBtn={isLoginPageMode}
          onPressBack={this.toggleLoginViewTranformed}
          rightButton={(props) => (
            <TranseButton
              onPress={() => this.props.navigation.push('SignUpScreen')}
            />
          )}
        />
        <View style={{width:width, height: upperContainerHeight}}>
          <Animated.Image
            resizeMode="stretch"
            style={{width: width,
             height: height / 1.7,
              transform: [{translateY: this.bgTransformY}]}}
            source={require('../assets/authbg.png')}
          />
          <Animated.Text style={{...this.styles.animatedText,
            transform: [{translateY: this.bgTransformY}]}}>
           RAKBANK</Animated.Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Animated.View
            style={{...this.styles.animatedView,
              transform: [{translateY: this.loginCTransformY}]}}>
            {isLoginPageMode ? (
              <>
                <MyInputText
                  focusedInput={this.state.focusedInput}
                  onChangeText={(text) => this.setState({userId: text})}
                  {...{
                    focusNext: () => this.setState({focusedInput: 'Password'}),
                    value: this.state.userId,
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
                    value: this.state.password,
                    validation: this.state.passValidated,
                  }}
                  title="Password"
                />
                <View style={{height: 15}} />
                <MyButton
                  loading={this.state.processing}
                  onPress={() => {
                    this._handleLogin();
                  }}
                  title="Submit"
                />
                <View style={{height: 15}} />
                <Text style={{alignSelf: 'center', color: 'gray'}}>
                  Forget User ID | Forget Password
                </Text>
                <Text style={{alignSelf: 'center', color: 'gray'}}>
                  Enter User ID
                </Text>
              </>
            ) : (
              <>
                <MyButton
                  loading={this.state.processing}
                  onPress={() => {
                    this.toggleLoginViewTranformed();
                  }}
                  title="Login with User ID"
                />
                <MyButton inverse title="Quick Balance" />
              </>
            )}
          </Animated.View>
        </View>
        <CustomFooter />
      </View>
    );
  }
}

export default LoginScreen;