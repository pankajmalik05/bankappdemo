import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import CustomFooter from '../components/customFooter';
import CustomHeader from '../components/customHeader';
import InfoBox from '../components/infoBox';
import TransButton from '../components/transButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {logout, updateUserInfo} from '../store/actions/authActions';
import {connect} from 'react-redux';
class HomeScreen extends Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this._handleLoadInfo();
  }

  _handleLoadInfo = () => {
    this.setState({loading: true});
    updateUserInfo()
      .then((updated) => {
        console.log('TEST 5info taken and updated');
        this.setState({loading: false});
      })
      .catch((Err) => {
        console.log('Error in updating user info');
        console.log(Err);
        this.setState({loading: false});
        //   reject('Device info not updated');
      });
  };

  render() {
    const {currentUser} = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={{height: 50, width: '100%', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => logout()}
            style={{
              alignSelf: 'flex-end',
              padding: 20,
            }}>
            <Icon size={25} name="sign-out-alt" />
          </TouchableOpacity>
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this._handleLoadInfo}
            />
          }
          style={{flex: 1}}>
          <InfoBox {...{title: 'User ID', value: currentUser.userId}} />
          <InfoBox {...{title: 'OS Name', value: currentUser?.info?.osName}} />
          <InfoBox
            {...{title: 'Device Name', value: currentUser?.info?.deviceName}}
          />
          <InfoBox
            {...{title: 'Mac Address', value: currentUser?.info?.macAddress}}
          />
          <InfoBox {...{title: 'IMEI', value: currentUser?.info?.imei}} />
          <InfoBox
            {...{
              title: 'GPS Location',
              value: `${currentUser?.info?.location?.long}, ${currentUser?.info?.location?.latt}`,
            }}
          />
          <InfoBox
            {...{title: 'IP Address', value: currentUser?.info?.publicIP}}
          />
        </ScrollView>
        <CustomFooter />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.AuthReducer.currentUser,
});
export default connect(mapStateToProps, null)(HomeScreen);
