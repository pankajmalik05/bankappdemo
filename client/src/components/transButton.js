import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const TransButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress ? props.onPress : () => false}
      style={{
        height: 40,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
      }}>
      <Text style={{color: 'white'}}>Register</Text>
    </TouchableOpacity>
  );
};
export default TransButton;
