import React, {Component} from 'react';
import {View} from 'react-native';
import HomeScreen from './src/screens.js/homeScreen';
import AppContainer from './src/navigator';
import {connect} from 'react-redux';
class App extends Component {
  state = {};
  render() {
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
