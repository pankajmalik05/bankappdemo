import React, {useEffect, useRef} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';
import {LIGHT_YELLOW} from '../themes/colors';

const MyInputText = (props) => {
  const ref = useRef();
  const focus = () => {
    ref.current.focus();
  };

  useEffect(() => {
    // console.log(`Focus changed ${props.focusedInput} Title: ${props.title}`);
    if (props.focusedInput === props.title) {
      focus();
    }
  }, [props.focusedInput]);

  const {width} = Dimensions.get('window');

  return (
    <View
      style={{
        height: 80,
        width: width * 0.9,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        ref={ref}
        value={props.value}
        placeholder={props.title}
        onChangeText={(text) =>
          props.onChangeText ? props.onChangeText(text) : () => false
        }
        onSubmitEditing={() => props.focusNext()}
        secureTextEntry={props.secure ? true : false}
        style={{
          width: '95%',
          borderBottomColor: props.validation ? LIGHT_YELLOW : 'red',
          borderBottomWidth: 2,
          fontSize: 18,
          //   backgroundColor: 'red',
        }}
      />
    </View>
  );
};
export default MyInputText;
