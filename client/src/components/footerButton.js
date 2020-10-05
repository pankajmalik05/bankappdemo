import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
const FooterButton = ({iconTitle, title}) => {
  return (
    <TouchableOpacity
      style={{
        height: '100%',
        width: 65,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 3,
        elevation: 5,
      }}>
      <Icons size={30} name={iconTitle} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterButton;
