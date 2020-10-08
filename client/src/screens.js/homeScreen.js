import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import CustomFooter from '../components/customFooter';
import InfoBox from '../components/infoBox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {logout, updateUserInfo} from '../store/actions/authActions';
import {connect} from 'react-redux';
class HomeScreen extends Component {
  state = {
    loading: false,
  };

   styles = StyleSheet.create({
    container: {
      height: 50,
      width: '100%',
      justifyContent: 'center'
    },
    flex: {
      flex: 1
    },
    button: {
      alignSelf: 'flex-end',
      padding: 20,
    },
  });

  componentDidMount() {
    this._handleLoadInfo();
  }

  _handleLoadInfo = () => {
    this.setState({loading: true});
    updateUserInfo()
      .then((updated) => {
        this.setState({loading: false});
      })
      .catch((Err) => {
        this.setState({loading: false});
      });
  };

  render() {
    const {currentUser} = this.props;
    return (
      <View style={this.styles.flex}>
        <View style={this.styles.container}>
          <TouchableOpacity
            onPress={() => logout()}
            style={this.styles.button}>
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
          style={this.styles.flex}>
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
