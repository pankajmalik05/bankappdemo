import React, {Component} from 'react';
import {View, Text} from 'react-native';
import FooterButton from './footerButton';

const CustomFooter = (props) => {
  return (
    <View
      style={{
        width: '100%',
        height: 65,
        backgroundColor: 'white',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FooterButton {...{title: 'Products', iconTitle: 'product-hunt'}} />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FooterButton {...{title: 'Live Chat', iconTitle: 'comment-dots'}} />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FooterButton {...{title: 'Tokens', iconTitle: 'key'}} />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <FooterButton {...{title: 'Locate us', iconTitle: 'map-marker-alt'}} />
      </View>
    </View>
  );
};
export default CustomFooter;
