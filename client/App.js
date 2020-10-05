import React, {Component} from 'react';
import {View, Text} from 'react-native';
import LoginScreen from './src/screens.js/loginScreen';
import SignupScreen from './src/screens.js/signupScreen';
import CustomFooter from './src/components/customFooter';
import HomeScreen from './src/screens.js/homeScreen';
import AppContainer from './src/navigator';
import {connect} from 'react-redux';
class App extends Component {
  state = {};
  render() {
    // const currentUser = useSelector((state) => state.AuthReducer.currentUser);
    const {currentUser} = this.props;
    if (currentUser) {
      return <HomeScreen />;
    } else {
      return (
        <View style={{flex: 1}}>
          <AppContainer />
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.AuthReducer.currentUser,
});
export default connect(mapStateToProps, null)(App);
