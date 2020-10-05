import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CustomHeader = (props) => {
  return (
    <View
      style={{
        position: 'absolute',
        ...props.style,
        top: StatusBar.currentHeight,
        zIndex: 999,
        height: 60,
        width: '90%',
        justifyContent: 'space-between',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View>
        {props.backBtn ? (
          <TouchableOpacity
            onPress={props.onPressBack ? props.onPressBack : () => false}
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 0,
              paddingRight: 20,
              backgroundColor: 'rgba(255,255,255,0)',
            }}>
            {/* <Text style={{color: 'white'}}>back</Text> */}
            <Icon color="white" size={25} name="arrow-left" />
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>

      <View>{props.rightButton ? props.rightButton(props) : false}</View>
    </View>
  );
};
export default CustomHeader;
