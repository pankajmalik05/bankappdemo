/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/components/customHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('header correctly', () => {
  renderer.create(<App />);
});
