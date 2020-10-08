import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const CustomHeader = (props) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: StatusBar.currentHeight,
      zIndex: 999,
      height: 60,
      width: '90%',
      justifyContent: 'space-between',
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 0,
      paddingRight: 20,
      backgroundColor: 'rgba(255,255,255,0)',
    },
  });
  return (
    <View
      style={{
        ...props.style,
        ...styles.container
      }}>
      <View>
        {props.backBtn ? (
          <TouchableOpacity
            onPress={props.onPressBack ? props.onPressBack : () => false}
            style={styles.backButton}>
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
