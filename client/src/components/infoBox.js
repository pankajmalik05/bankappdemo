import React from 'react';
import {View, Text} from 'react-native';

const InfoBox = ({title, value}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
      }}>
      <View style={{flex: 1}}>
        <Text>{title}:</Text>
      </View>
      <View style={{flex: 2.5}}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};
export default InfoBox;