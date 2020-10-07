import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

const InfoBox = ({title, value}) => {
  return (
    <View
      style={styles.container}>
      <View style={{flex: 1}}>
        <Text>{title}:</Text>
      </View>
      <View style={{flex: 2.5}}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        height: '100%',
        width: 65,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 3,
        elevation: 5,
  },
});
export default InfoBox;
