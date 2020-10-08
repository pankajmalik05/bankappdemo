import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';
import {LIGHT_YELLOW} from '../themes/colors';


const MyInputText = (props) => {
  const ref = useRef();
  const focus = () => {
    ref.current.focus();
  };

  const width = Dimensions.get('window').width;
  const validation=props.validation;
  
  const styles = StyleSheet.create({
    container: {
      height: 80,
      width: width * 0.9,
      borderRadius: 10,
      alignSelf: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      width: '95%',
      borderBottomColor: validation ? LIGHT_YELLOW : 'red',
      borderBottomWidth: 2,
      fontSize: 18,
    },
  });

  useEffect(() => {
    if (props.focusedInput === props.title) {
      focus();
    }
  }, [props.focusedInput]);

 

  return (
    <View
      style={styles.container}>
      <TextInput
        ref={ref}
        value={props.value}
        placeholder={props.title}
        onChangeText={(text) =>
          props.onChangeText ? props.onChangeText(text) : () => false
        }
        onSubmitEditing={() => props.focusNext()}
        secureTextEntry={props.secure ? true : false}
        style={styles.text}
      />
    </View>
  );
};

export default MyInputText
