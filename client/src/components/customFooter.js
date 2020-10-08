import React from 'react';
import {View,StyleSheet} from 'react-native';
import FooterButton from './footerButton';

const CustomFooter = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <FooterButton {...{title: 'Products', iconTitle: 'product-hunt'}} />
      </View>
      <View style={styles.icons}>
        <FooterButton {...{title: 'Live Chat', iconTitle: 'comment-dots'}} />
      </View>
      <View style={styles.icons}>
        <FooterButton {...{title: 'Tokens', iconTitle: 'key'}} />
      </View>
      <View style={styles.icons}>
        <FooterButton {...{title: 'Locate us', iconTitle: 'map-marker-alt'}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
        width: '100%',
        height: 65,
        backgroundColor: 'white',
        flexDirection: 'row',
  },
  icons: {
    flex: 1, 
    alignItems: 'center'
  },
});

export default CustomFooter;
