/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/components/infoBox';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('infobox correctly', () => {
  renderer.create(<App />);
});
