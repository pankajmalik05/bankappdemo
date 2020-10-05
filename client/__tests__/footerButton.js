/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/components/footerButton';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('footer button correctly', () => {
  renderer.create(<App />);
});
