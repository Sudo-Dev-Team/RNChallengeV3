/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { StyleSheet } from 'react-native';

import FastImage from 'react-native-fast-image';

export const MaskView = () => {
  // render
  return (
    <FastImage
      style={StyleSheet.absoluteFillObject}
      source={require('../files/image1.jpeg')}
    />
  );
};
