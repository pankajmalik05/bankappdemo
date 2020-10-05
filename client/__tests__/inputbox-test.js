/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/components/myInputText';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('myinputtext correctly', () => {
  renderer.create(<App />);
});
