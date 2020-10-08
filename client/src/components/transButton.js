import React from 'react';
import {Text, StyleSheet,TouchableOpacity} from 'react-native';

const TransButton = (props) => {
  const styles = StyleSheet.create({
    container: {
      height: 40,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    text: {
      color: 'white'
    },
  });
  return (
    <TouchableOpacity
      onPress={props.onPress ? props.onPress : () => false}
      style={styles.container}>
      <Text style={styles.text}>Register</Text>
    </TouchableOpacity>
  );
};

export default TransButton;
