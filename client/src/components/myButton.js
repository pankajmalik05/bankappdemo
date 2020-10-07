import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator,StyleSheet} from 'react-native';
import {LIGHT_BLACK} from '../themes/colors';
const MyButton = (props) => {
  const inverse = props.inverse ? true : false;
  return (
    <TouchableOpacity
      onPress={props.onPress ? () => props.onPress() : () => false}
      style={{
        ...props.style,
        ...styles.container
      }}>
      {props.loading ? (
        <ActivityIndicator color={inverse ? LIGHT_BLACK : 'white'} />
      ) : (
        <Text
          style={styles.text}>
          {props.title ? props.title : ''}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: inverse ? '#f0f0f0' : LIGHT_BLACK,
    width: '90%',
    height: 55,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: inverse ? LIGHT_BLACK : 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
export default MyButton;
