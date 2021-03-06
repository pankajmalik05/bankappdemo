import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
const FooterButton = ({iconTitle, title}) => {
  const styles = StyleSheet.create({
    icons: {
          height: '100%',
          width: 65,
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 3,
          elevation: 5,
    },
  });
  return (
    <TouchableOpacity
      style={styles.icons}>
      <Icons size={30} name={iconTitle} />
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export default FooterButton;
